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
  Booked_By_User_ID VARCHAR(255),
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
    Booking_ID INT PRIMARY KEY,
    sid1 VARCHAR(255) DEFAULT NULL,
    status1 ENUM('approved', 'pending') DEFAULT 'pending',
    sid2 VARCHAR(255) DEFAULT NULL,
    status2 ENUM('approved', 'pending') DEFAULT 'pending',
    sid3 VARCHAR(255) DEFAULT NULL,
    status3 ENUM('approved', 'pending') DEFAULT 'pending'
);

CREATE TABLE Confirmed_Booking (
  Booking_ID INT PRIMARY KEY,
  Booked_By_User_ID VARCHAR(255),
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
  Booked_By_User_ID VARCHAR(255),
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

-- --------------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS applyBooking;

DELIMITER // 

CREATE PROCEDURE applyBooking(IN userId VARCHAR(255), IN roomId VARCHAR(255), IN startDate DATE, IN endDate DATE, IN guest1_name VARCHAR(255), IN guest1_contact INT, IN guest2_name VARCHAR(255), IN guest2_contact INT, OUT message VARCHAR(255))
BEGIN
  DECLARE bookingId INT;
  DECLARE totalBilling DECIMAL(10, 2);
  DECLARE roomPricePerDay INT;
  DECLARE sid1 VARCHAR(255);
  DECLARE sid2 VARCHAR(255);
  DECLARE sid3 VARCHAR(255);
  DECLARE existsBooking INT;
  DECLARE existsUser INT;

  SELECT Price_per_day INTO roomPricePerDay FROM Room_Info WHERE RoomID = roomId LIMIT 1;

  SET totalBilling := DATEDIFF(endDate, startDate) * roomPricePerDay;

  SELECT COUNT(*) INTO existsBooking FROM (
    SELECT 1 FROM Confirmed_Booking WHERE Room_ID = roomId AND ((Check_In_Date BETWEEN startDate AND endDate) OR (Check_Out_Date BETWEEN startDate AND endDate))
    UNION ALL
    SELECT 1 FROM Pending_Booking WHERE Room_ID = roomId AND ((Check_In_Date BETWEEN startDate AND endDate) OR (Check_Out_Date BETWEEN startDate AND endDate))
  ) AS bookings LIMIT 1;

  IF existsBooking = 0 THEN
    SELECT COALESCE(MAX(Booking_ID), 0) + 1 INTO bookingId FROM (
      SELECT Booking_ID FROM Pending_Booking 
      UNION ALL 
      SELECT Booking_ID FROM Confirmed_Booking 
      UNION ALL 
      SELECT Booking_ID FROM Booking_History
    ) AS Booking_IDs LIMIT 1;

    SELECT COUNT(*) INTO existsUser FROM user_Supervisor WHERE id = userId LIMIT 1;

    IF existsUser = 0 THEN
      INSERT INTO Confirmed_Booking (Booking_ID, Booked_By_User_ID, Room_ID, Check_In_Date, Check_Out_Date, guest1_name, guest1_contact, guest2_name, guest2_contact, Total_Billing) VALUES (bookingId, userId, roomId, startDate, endDate, guest1_name, guest1_contact, guest2_name, guest2_contact, totalBilling);
      SET message := 'Booking confirmed';
    ELSE
      INSERT INTO Pending_Booking (Booking_ID, Booked_By_User_ID, Room_ID, Check_In_Date, Check_Out_Date, guest1_name, guest1_contact, guest2_name, guest2_contact, Total_Billing) VALUES (bookingId, userId, roomId, startDate, endDate, guest1_name, guest1_contact, guest2_name, guest2_contact, totalBilling);
      
      SELECT sid1, sid2, sid3 INTO sid1, sid2, sid3 FROM user_Supervisor WHERE id = userId LIMIT 1;
      INSERT INTO Approval_Status (Booking_ID, sid1, status1, sid2, status2, sid3, status3) VALUES (bookingId, sid1, 'pending', sid2, 'pending', sid3, 'pending');
      SET message := 'Booking applied, awaiting approval';
    END IF;
  ELSE
    SET message := 'Booking failed, room is already booked in the given dates';
  END IF;
END; //
DELIMITER ;

-- --------------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS reviewBooking;

DELIMITER //

CREATE PROCEDURE reviewBooking(IN bookingId VARCHAR(255), IN sid VARCHAR(255), IN reviewStatus ENUM('approved', 'rejected'), IN message VARCHAR(255), OUT executionMessage VARCHAR(255))
BEGIN
  DECLARE uid VARCHAR(255);
  SELECT Booked_By_User_ID INTO uid FROM Pending_Booking WHERE Booking_ID = bookingId LIMIT 1;

  IF reviewStatus = 'approved' THEN
    IF EXISTS (SELECT 1 FROM user_Supervisor WHERE id = uid AND sid1 = sid) THEN
      UPDATE Approval_Status SET status1 = 'approved' WHERE Booking_ID = bookingId;
      IF (SELECT sid2 FROM user_Supervisor WHERE id = uid) IS NULL THEN
        INSERT INTO Confirmed_Booking SELECT * FROM Pending_Booking WHERE Booking_ID = bookingId;
        DELETE FROM Approval_Status WHERE Booking_ID = bookingId;
        DELETE FROM Pending_Booking WHERE Booking_ID = bookingId;
        SET executionMessage = 'Booking approved and moved to Confirmed_Booking';
      END IF;
    ELSEIF EXISTS (SELECT 1 FROM user_Supervisor WHERE id = uid AND sid2 = sid) THEN
      UPDATE Approval_Status SET status2 = 'approved' WHERE Booking_ID = bookingId;
      IF (SELECT sid3 FROM user_Supervisor WHERE id = uid) IS NULL THEN
        INSERT INTO Confirmed_Booking SELECT * FROM Pending_Booking WHERE Booking_ID = bookingId;
        DELETE FROM Approval_Status WHERE Booking_ID = bookingId;
        DELETE FROM Pending_Booking WHERE Booking_ID = bookingId;
        SET executionMessage = 'Booking approved and moved to Confirmed_Booking';
      END IF;
    ELSEIF EXISTS (SELECT 1 FROM user_Supervisor WHERE id = uid AND sid3 = sid) THEN
      UPDATE Approval_Status SET status3 = 'approved' WHERE Booking_ID = bookingId;
      INSERT INTO Confirmed_Booking SELECT * FROM Pending_Booking WHERE Booking_ID = bookingId;
      DELETE FROM Approval_Status WHERE Booking_ID = bookingId;
      DELETE FROM Pending_Booking WHERE Booking_ID = bookingId;
      SET executionMessage = 'Booking approved and moved to Confirmed_Booking';
    END IF;
  ELSEIF reviewStatus = 'rejected' THEN
    INSERT INTO Booking_History SELECT *, 'rejected', sid, message FROM Pending_Booking WHERE Booking_ID = bookingId;
    DELETE FROM Approval_Status WHERE Booking_ID = bookingId;
    DELETE FROM Pending_Booking WHERE Booking_ID = bookingId;
    SET executionMessage = 'Booking rejected and moved to Booking_History';
  END IF;
END; //

DELIMITER ;
-- --------------------------------------------------------------------------------------------------------------
CREATE OR REPLACE VIEW Pending_Approvals_BySupervisor AS
SELECT 
    CASE
        WHEN status1 = 'pending' THEN sid1
        WHEN status1 = 'approved' AND status2 = 'pending' THEN sid2
        WHEN status1 = 'approved' AND status2 = 'approved' AND status3 = 'pending' THEN sid3
    END AS sid,
    Booking_ID
FROM 
    Approval_Status
WHERE 
    (status1 = 'pending') OR 
    (status1 = 'approved' AND status2 = 'pending') OR 
    (status1 = 'approved' AND status2 = 'approved' AND status3 = 'pending');

-- --------------------------------------------------------------------------------------------------------------


-- Sample data for Students table
INSERT INTO Students VALUES
('s1', 'John Doe', 1234567890, 'john_doe@example.com', 'CSE', 3),
('s2', 'Jane Doe', 9876543210, 'jane_doe@example.com', 'ECE', 2);

-- Sample data for Gymkhana table
INSERT INTO Gymkhana VALUES 
('g1', 'President', 'president@example.com'),
('g2', 'Secretary', 'secretary@example.com');

-- Sample data for Faculty_and_Staff table
INSERT INTO Faculty_and_Staff VALUES 
('f1', 'Prof. Brown', 2345678901, 'prof.brown@example.com'),
('f2', 'Dr. Smith', 8765432109, 'dr.smith@example.com');

-- Sample data for user_Supervisor table
INSERT INTO user_Supervisor VALUES 
('g1', 'f1', NULL, NULL),
('s1', 'f2', NULL, NULL),
('s2', 'f1', 'f2', NULL);

-- Sample data for Room_Info table
INSERT INTO Room_Info VALUES 
('r1', 'First Floor', 101, 'AC', 'Single', 100),
('r2', 'Second Floor', 202, 'Non-AC', 'Double', 200);

-- Sample data for Pending_Booking table
INSERT INTO Pending_Booking VALUES 
(3, 's2', 'r1', '2024-04-16', '2024-04-19', 'Guest One', 3456789012, 'Guest Two', 7654321098, 1000.00),
(4, 'g1', 'r2', '2024-04-15', '2024-04-18', 'Guest One', 3456789012, 'Guest Two', 7654321098, 1000.00);

-- Sample data for Approval_Status table
INSERT INTO Approval_Status VALUES
(4, 'f1', 'pending', NULL, NULL, NULL, NULL),
(3, 'f1', 'pending', 'f2', 'pending', NULL, NULL);

-- Sample data for Confirmed_Booking table
INSERT INTO Confirmed_Booking VALUES 
(2, 'g1', 'r2', '2024-05-01', '2024-05-03', 'Guest Three', 4567890123, 'Guest Four', 6543210987, 2000.00);
  
-- Sample data for Booking_History table
INSERT INTO Booking_History VALUES 
(1, 'g2', 'r1', '2024-03-01', '2024-03-10', 'Guest One', 3456789012, 'Guest Two', 7654321098, 1000.00, 'Used', NULL, NULL);






































-- --------------------------------------------------------------------------------------------------------------
-- --------------------------------------------------------------------------------------------------------------

-- raw

-- CREATE OR REPLACE PROCEDURE reviewBooking(IN bookingId VARCHAR(255), IN sid VARCHAR(255), IN reviewStatus ENUM('approved', 'rejected'), IN message VARCHAR(255))
-- BEGIN
--   IF reviewStatus = 'approved' THEN
--     IF EXISTS (SELECT 1 FROM user_Supervisor WHERE id = bookingId AND sid1 = sid) THEN
--       UPDATE Approval_Status SET status1 = 'approved' WHERE uid = bookingId;
--       IF (SELECT sid2 FROM user_Supervisor WHERE id = bookingId) IS NULL THEN
--         INSERT INTO Confirmed_Booking SELECT * FROM Pending_Booking WHERE Booking_ID = bookingId;
--         DELETE FROM Approval_Status WHERE uid = bookingId;
--         DELETE FROM Pending_Booking WHERE Booking_ID = bookingId;
--       END IF;
--     ELSEIF EXISTS (SELECT 1 FROM user_Supervisor WHERE id = bookingId AND sid2 = sid) THEN
--       UPDATE Approval_Status SET status2 = 'approved' WHERE uid = bookingId;
--       IF (SELECT sid3 FROM user_Supervisor WHERE id = bookingId) IS NULL THEN
--         INSERT INTO Confirmed_Booking SELECT * FROM Pending_Booking WHERE Booking_ID = bookingId;
--         DELETE FROM Approval_Status WHERE uid = bookingId;
--         DELETE FROM Pending_Booking WHERE Booking_ID = bookingId;
--       END IF;
--     ELSEIF EXISTS (SELECT 1 FROM user_Supervisor WHERE id = bookingId AND sid3 = sid) THEN
--       UPDATE Approval_Status SET status3 = 'approved' WHERE uid = bookingId;
--       INSERT INTO Confirmed_Booking SELECT * FROM Pending_Booking WHERE Booking_ID = bookingId;
--       DELETE FROM Approval_Status WHERE uid = bookingId;
--       DELETE FROM Pending_Booking WHERE Booking_ID = bookingId;
--     END IF;
--   ELSEIF reviewStatus = 'rejected' THEN
--     INSERT INTO Booking_History SELECT *, 'rejected', sid, message FROM Pending_Booking WHERE Booking_ID = bookingId;
--     DELETE FROM Approval_Status WHERE uid = bookingId;
--     DELETE FROM Pending_Booking WHERE Booking_ID = bookingId;
--   END IF;
-- END;




-- CREATE PROCEDURE applyBooking(IN userId VARCHAR(255), IN roomId VARCHAR(255), IN startDate DATE, IN endDate DATE, IN guest1_name VARCHAR(255), IN guest1_contact INT, IN guest2_name VARCHAR(255), IN guest2_contact INT, OUT message VARCHAR(255))
-- BEGIN
--   DECLARE bookingId INT;
--   DECLARE totalBilling DECIMAL(10, 2);
--   DECLARE roomPricePerDay INT;
--   DECLARE sid1 VARCHAR(255);
--   DECLARE sid2 VARCHAR(255);
--   DECLARE sid3 VARCHAR(255);

--   SELECT Price_per_day INTO roomPricePerDay FROM Room_Info WHERE RoomID = roomId;

--   SET totalBilling = DATEDIFF(endDate, startDate) * roomPricePer_day;

--   IF NOT EXISTS (
--     SELECT 1 FROM Confirmed_Booking WHERE Room_ID = roomId AND ((Check_In_Date BETWEEN startDate AND endDate) OR (Check_Out_Date BETWEEN startDate AND endDate))
--     UNION ALL
--     SELECT 1 FROM Applied_Booking WHERE Room_ID = roomId AND ((Check_In_Date BETWEEN startDate AND endDate) OR (Check_Out_Date BETWEEN startDate AND endDate))
--   ) THEN
--     SELECT COALESCE(MAX(Booking_ID), 0) + 1 INTO bookingId FROM (SELECT Booking_ID FROM Applied_Booking UNION ALL SELECT Booking_ID FROM Confirmed_Booking UNION ALL SELECT Booking_ID FROM Booking_History) AS Booking_IDs;

--     IF NOT EXISTS (SELECT 1 FROM User_Supervisor WHERE User_ID = userId) THEN
--       INSERT INTO Confirmed_Booking (Booking_ID, Room_ID, Check_In_Date, Check_Out_Date, guest1_name, guest1_contact, guest2_name, guest2_contact, Total_Billing) VALUES (bookingId, roomId, startDate, endDate, guest1_name, guest1_contact, guest2_name, guest2_contact, totalBilling);
--       SET message = 'Booking confirmed';
--     ELSE
--       INSERT INTO Applied_Booking (Booking_ID, Room_ID, Check_In_Date, Check_Out_Date, guest1_name, guest1_contact, guest2_name, guest2_contact, Total_Billing) VALUES (bookingId, roomId, startDate, endDate, guest1_name, guest1_contact, guest2_name, guest2_contact, totalBilling);
      
--       SELECT sid1, sid2, sid3 INTO sid1, sid2, sid3 FROM User_Supervisor WHERE id = userId;
--       INSERT INTO Approval_Status (Booking_ID, sid1, status1, sid2, status2, sid3, status3) VALUES (bookingId, sid1, 'pending', sid2, 'pending', sid3, 'pending');
--       SET message = 'Booking applied, awaiting approval';
--     END IF;
--   ELSE
--     SET message = 'Booking failed, room is already booked in the given dates';
--   END IF;
-- END;
