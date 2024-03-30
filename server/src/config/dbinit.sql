CREATE TABLE Students (
  id VARCHAR(255) PRIMARY KEY,
  Name VARCHAR(255),
  Contact_Number INT,
  Email VARCHAR(255),
  Dept VARCHAR(255),
  Year INT
);

CREATE TABLE Gymkhana (
  id VARCHAR(255) PRIMARY KEY,
  Position VARCHAR(255),
  Email VARCHAR(255)
);

CREATE TABLE Faculty_and_Staff (
  id VARCHAR(255) PRIMARY KEY,
  Name VARCHAR(255),
  Contact_Number INT,
  Email VARCHAR(255)
);

CREATE TABLE user_Supervisor (
  id VARCHAR(255) PRIMARY KEY,
  sid1 VARCHAR(255) DEFAULT NULL,
  sid2 VARCHAR(255) DEFAULT NULL,
  sid3 VARCHAR(255) DEFAULT NULL
);

CREATE TABLE Room_Info (
  RoomID VARCHAR(255) PRIMARY KEY,
  Location VARCHAR(255),
  Room_Number INT,
  AC_Non_AC ENUM('AC','Non-AC'),
  Single_Double ENUM('Single','Double'),
  Price_per_day INT
);

CREATE TABLE Pending_Booking (
  Booking_ID INT PRIMARY KEY,
  Room_ID VARCHAR(255),
  Check_In_Date DATE,
  Check_Out_Date DATE,
  guest1_name VARCHAR(255),
  guest1_contact INT,
  guest2_name VARCHAR(255),
  guest2_contact INT,
  Total_Billing DECIMAL(10, 2),
  FOREIGN KEY (Room_ID) REFERENCES Room_Info(RoomID)
);

CREATE TABLE Approval_Status (
    Booking_ID VARCHAR(255),
    sid1 VARCHAR(255) DEFAULT NULL,
    status1 ENUM('approved', 'pending') DEFAULT 'pending',
    sid2 VARCHAR(255) DEFAULT NULL,
    status2 ENUM('approved', 'pending') DEFAULT 'pending',
    sid3 VARCHAR(255) DEFAULT NULL,
    status3 ENUM('approved', 'pending') DEFAULT 'pending'
);

CREATE TABLE Confirmed_Booking (
  Booking_ID INT PRIMARY KEY,
  Room_ID VARCHAR(255),
  Check_In_Date DATE,
  Check_Out_Date DATE,
  guest1_name VARCHAR(255),
  guest1_contact INT,
  guest2_name VARCHAR(255),
  guest2_contact INT,
  Total_Billing DECIMAL(10, 2),
  FOREIGN KEY (Room_ID) REFERENCES Room_Info(RoomID)
);

CREATE TABLE Booking_History (
  Booking_ID INT PRIMARY KEY,
  Room_ID VARCHAR(255),
  Check_In_Date DATE,
  Check_Out_Date DATE,
  guest1_name VARCHAR(255),
  guest1_contact INT,
  guest2_name VARCHAR(255),
  guest2_contact INT,
  Total_Billing DECIMAL(10, 2),
  Booking_Status ENUM('Used','cancelled','rejected'),
  Rejected_By_Sid VARCHAR(255) DEFAULT NULL,
  Rejection_Message VARCHAR(255) DEFAULT NULL,
  FOREIGN KEY (Room_ID) REFERENCES Room_Info(RoomID)
);

CREATE OR REPLACE PROCEDURE reviewBooking(IN bookingId VARCHAR(255), IN sid VARCHAR(255), IN reviewStatus ENUM('approved', 'rejected'), IN message VARCHAR(255))
BEGIN
  IF reviewStatus = 'approved' THEN
    IF EXISTS (SELECT 1 FROM user_Supervisor WHERE id = bookingId AND sid1 = sid) THEN
      UPDATE Approval_Status SET status1 = 'approved' WHERE uid = bookingId;
      IF (SELECT sid2 FROM user_Supervisor WHERE id = bookingId) IS NULL THEN
        INSERT INTO Confirmed_Booking SELECT * FROM Pending_Booking WHERE Booking_ID = bookingId;
        DELETE FROM Approval_Status WHERE uid = bookingId;
        DELETE FROM Pending_Booking WHERE Booking_ID = bookingId;
      END IF;
    ELSEIF EXISTS (SELECT 1 FROM user_Supervisor WHERE id = bookingId AND sid2 = sid) THEN
      UPDATE Approval_Status SET status2 = 'approved' WHERE uid = bookingId;
      IF (SELECT sid3 FROM user_Supervisor WHERE id = bookingId) IS NULL THEN
        INSERT INTO Confirmed_Booking SELECT * FROM Pending_Booking WHERE Booking_ID = bookingId;
        DELETE FROM Approval_Status WHERE uid = bookingId;
        DELETE FROM Pending_Booking WHERE Booking_ID = bookingId;
      END IF;
    ELSEIF EXISTS (SELECT 1 FROM user_Supervisor WHERE id = bookingId AND sid3 = sid) THEN
      UPDATE Approval_Status SET status3 = 'approved' WHERE uid = bookingId;
      INSERT INTO Confirmed_Booking SELECT * FROM Pending_Booking WHERE Booking_ID = bookingId;
      DELETE FROM Approval_Status WHERE uid = bookingId;
      DELETE FROM Pending_Booking WHERE Booking_ID = bookingId;
    END IF;
  ELSEIF reviewStatus = 'rejected' THEN
    INSERT INTO Booking_History SELECT *, 'rejected', sid, message FROM Pending_Booking WHERE Booking_ID = bookingId;
    DELETE FROM Approval_Status WHERE uid = bookingId;
    DELETE FROM Pending_Booking WHERE Booking_ID = bookingId;
  END IF;
END;

CREATE PROCEDURE applyBooking(IN userId VARCHAR(255), IN roomId VARCHAR(255), IN startDate DATE, IN endDate DATE, IN guest1_name VARCHAR(255), IN guest1_contact INT, IN guest2_name VARCHAR(255), IN guest2_contact INT, OUT message VARCHAR(255))
BEGIN
  DECLARE bookingId INT;
  DECLARE totalBilling DECIMAL(10, 2);
  DECLARE roomPricePerDay INT;
  DECLARE sid1 VARCHAR(255);
  DECLARE sid2 VARCHAR(255);
  DECLARE sid3 VARCHAR(255);

  SELECT Price_per_day INTO roomPricePerDay FROM Room_Info WHERE RoomID = roomId;

  SET totalBilling = DATEDIFF(endDate, startDate) * roomPricePer_day;

  IF NOT EXISTS (
    SELECT 1 FROM Confirmed_Booking WHERE Room_ID = roomId AND ((Check_In_Date BETWEEN startDate AND endDate) OR (Check_Out_Date BETWEEN startDate AND endDate))
    UNION ALL
    SELECT 1 FROM Applied_Booking WHERE Room_ID = roomId AND ((Check_In_Date BETWEEN startDate AND endDate) OR (Check_Out_Date BETWEEN startDate AND endDate))
  ) THEN
    SELECT COALESCE(MAX(Booking_ID), 0) + 1 INTO bookingId FROM (SELECT Booking_ID FROM Applied_Booking UNION ALL SELECT Booking_ID FROM Confirmed_Booking UNION ALL SELECT Booking_ID FROM Booking_History) AS Booking_IDs;

    IF NOT EXISTS (SELECT 1 FROM User_Supervisor WHERE User_ID = userId) THEN
      INSERT INTO Confirmed_Booking (Booking_ID, Room_ID, Check_In_Date, Check_Out_Date, guest1_name, guest1_contact, guest2_name, guest2_contact, Total_Billing) VALUES (bookingId, roomId, startDate, endDate, guest1_name, guest1_contact, guest2_name, guest2_contact, totalBilling);
      SET message = 'Booking confirmed';
    ELSE
      INSERT INTO Applied_Booking (Booking_ID, Room_ID, Check_In_Date, Check_Out_Date, guest1_name, guest1_contact, guest2_name, guest2_contact, Total_Billing) VALUES (bookingId, roomId, startDate, endDate, guest1_name, guest1_contact, guest2_name, guest2_contact, totalBilling);
      
      SELECT sid1, sid2, sid3 INTO sid1, sid2, sid3 FROM User_Supervisor WHERE id = userId;
      INSERT INTO Approval_Status (Booking_ID, sid1, status1, sid2, status2, sid3, status3) VALUES (bookingId, sid1, 'pending', sid2, 'pending', sid3, 'pending');
      SET message = 'Booking applied, awaiting approval';
    END IF;
  ELSE
    SET message = 'Booking failed, room is already booked in the given dates';
  END IF;
END;


INSERT INTO Students(id, Name, Contact_Number, Email, Dept, Year)
VALUES 
    ('S01', 'John Doe', 12345678, 'john.doe@example.com', 'CSE', 2),
    ('S02', 'Jane Doe', 87654321, 'jane.doe@example.com', 'ECE', 3);

INSERT INTO Gymkhana(id, Position, Email)
VALUES 
    ('G01', 'Chairperson', 'chairperson@example.com'),
    ('G02', 'Secretary', 'secretary@example.com');

INSERT INTO Faculty_and_Staff(id, Name, Contact_Number, Email)
VALUES 
    ('F01', 'Faculty 1', 23456789, 'faculty1@example.com'),
    ('F02', 'Staff 1', 98765432, 'staff1@example.com');

INSERT INTO user_Supervisor(id, sid1, sid2, sid3)
VALUES 
    ('S01', 'F02', 'F01', NULL),
    ('G02', 'F01', NULL, NULL);



INSERT INTO Room_Info(RoomID, Location, Room_Number, AC_Non_AC, Single_Double, Price_per_day)
VALUES 
    ('R01', 'Building A', 101, 'AC', 'Single', 50),
    ('R02', 'Building B', 202, 'Non-AC', 'Double', 75);

INSERT INTO Pending_Booking(Booking_ID, Room_ID, Check_In_Date, Check_Out_Date, guest1_name, guest1_contact, guest2_name, guest2_contact, Total_Billing)
VALUES 
    ('B01', 'R01', '2022-10-01', '2022-10-05', 'Guest 1', 34567890, 'Guest 2', 09876543, 250.0),
    ('B02', 'R02', '2022-11-01', '2022-11-05', 'Guest 3', 45678901, 'Guest 4', 10987654, 375.0);

INSERT INTO Approval_Status(uid, sid1, status1, sid2, status2, sid3, status3)
VALUES 
    ('U01', 'S01', 'approved', 'F01', 'pending', 'G01', 'pending'),
    ('U02', 'S02', 'approved', 'F02', 'pending', 'G02', 'pending');

INSERT INTO Confirmed_Booking(Booking_ID, Room_ID, Check_In_Date, Check_Out_Date, guest1_name, guest1_contact, guest2_name, guest2_contact, Total_Billing)
VALUES 
    ('CB01', 'R01', '2022-10-01', '2022-10-05', 'Confirmed Guest 1', 56789012, 'Confirmed Guest 2', 21098765, 250.0);

INSERT INTO Booking_History(Booking_ID, Room_ID, Check_In_Date, Check_Out_Date, guest1_name, guest1_contact, guest2_name, guest2_contact, Total_Billing, Booking_Status)
VALUES 
    ('BH01', 'R02', '2022-09-01', '2022-09-05', 'Historical Guest 1', 67890123, 'Historical Guest 2', 32109876, 375.0, 'Used');

