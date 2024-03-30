import express from 'express';
import { pool } from '../config/dbconfig'

const router = express.Router();

async function checkRoomAvailability(startDate: string, endDate: string, roomID: string) {

    let query = `SELECT * FROM Confirmed_Booking WHERE Room_ID = ? AND ((Start_Date <= ? AND End_Date >= ?) OR (Start_Date <= ? AND End_Date >= ?))`; // check if the room is already booked for the given dates in the confirmed booking table

    try {
        const [rows] = await pool.execute(query, [roomID, startDate, startDate, endDate, endDate]);
        if ((rows as any).length > 0) {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }

    query = `SELECT * FROM Applied_Booking WHERE Room_ID = ? AND ((Start_Date <= ? AND End_Date >= ?) OR (Start_Date <= ? AND End_Date >= ?))`; // check if the room is already booked for the given dates in the approved booking table

    try {
        const [rows] = await pool.execute(query, [roomID, startDate, startDate, endDate, endDate]);
        if ((rows as any).length > 0) {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }

    return true;
}

router.get('/status/:bid', async (req, res) => {
    const bookingId = req.params.bid;
    let tables = ['Applied_Booking', 'Confirmed_Booking', 'Booking_History'];
    let status = null;
    let pendingSupervisor = null;

    for (let table of tables) {
        let query = `SELECT * FROM ${table} WHERE Booking_ID = ?`;
        try {
            const [rows] = await pool.execute(query, [bookingId]);
            if ((rows as any).length > 0) {
                status = table;
                if (status === 'Applied_Booking') {
                    let approvalQuery = `SELECT sid1, sid2, sid3 FROM ApprovalStatus WHERE booking_id = ?`;
                    const [approvalRows] = await pool.execute(approvalQuery, [bookingId]);
                    if ((approvalRows as any).length > 0) {
                        pendingSupervisor = (approvalRows as any)[0].sid3 || (approvalRows as any)[0].sid2 || (approvalRows as any)[0].sid1;
                    }
                }
                break;
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
            return;
        }
    }

    if (status) {
        res.send({ status, pendingSupervisor });
    } else {
        res.status(404).send('No booking found for the provided id');
    }
});

// CREATE TABLE Pending_Booking (
//     Booking_ID VARCHAR(255) PRIMARY KEY,
//     Room_ID VARCHAR(255),
//     Check_In_Date DATE,
//     Check_Out_Date DATE,
//     guest1_name VARCHAR(255),
//     guest1_contact INT,
//     guest2_name VARCHAR(255),
//     guest2_contact INT,
//     Total_Billing DECIMAL(10, 2),
//     FOREIGN KEY (Room_ID) REFERENCES Room_Info(RoomID)
//   );

//   CREATE TABLE Approval_Status (
//       uid VARCHAR(255),
//       sid1 VARCHAR(255) DEFAULT NULL,
//       status1 ENUM('approved', 'pending') DEFAULT 'pending',
//       sid2 VARCHAR(255) DEFAULT NULL,
//       status2 ENUM('approved', 'pending') DEFAULT 'pending',
//       sid3 VARCHAR(255) DEFAULT NULL,
//       status3 ENUM('approved', 'pending') DEFAULT 'pending'
//   );

//   CREATE TABLE Confirmed_Booking (
//     Booking_ID VARCHAR(255) PRIMARY KEY,
//     Room_ID VARCHAR(255),
//     Check_In_Date DATE,
//     Check_Out_Date DATE,
//     guest1_name VARCHAR(255),
//     guest1_contact INT,
//     guest2_name VARCHAR(255),
//     guest2_contact INT,
//     Total_Billing DECIMAL(10, 2),
//     FOREIGN KEY (Room_ID) REFERENCES Room_Info(RoomID)
//   );

//   CREATE TABLE Booking_History (
//     Booking_ID VARCHAR(255) PRIMARY KEY,
//     Room_ID VARCHAR(255),
//     Check_In_Date DATE,
//     Check_Out_Date DATE,
//     guest1_name VARCHAR(255),
//     guest1_contact INT,
//     guest2_name VARCHAR(255),
//     guest2_contact INT,
//     Total_Billing DECIMAL(10, 2),
//     Booking_Status ENUM('Used','cancelled','rejected'),
//     Rejected_By_Sid VARCHAR(255) DEFAULT NULL,
//     Rejection_Message VARCHAR(255) DEFAULT NULL,
//     FOREIGN KEY (Room_ID) REFERENCES Room_Info(RoomID)
//   );


// router.post('/apply', async (req, res) => {
//     // apply for a booking
//     // fist check if the room is available for the given dates
//     // for the booking id generate the booking number sequentially by checking the last booking id in the applied booking table and incrementing it by 1 if the applied booking table is empty then check the last booking id in the confirmed booking table and increment it by 1 if that is also empty then check the last booking id in the booking history table and increment it by 1
//     // if there doesn't exist a supervisor for the user with the given ID the booking will go to the confirmed booking table
//     // the existence of supervisor can be checked by querying the user supervisor table
//     // if there exists a supervisor the booking will go to the applied booking table and a new entry will be made in the approval status table with the booking id and the supervisor ids, the supervisor ids will be fetched from the user supervisor table

//     const { uid, roomID, startDate, endDate, guest1Name, guest1Contact, guest2Name, guest2Contact, totalBilling } = req.body;

//     if (!uid || !roomID || !startDate || !endDate || !guest1Name || !guest1Contact || !totalBilling) {
//         res.status(400).send('Invalid request');
//         return;
//     }
// });


router.post('/apply', async (req, res) => {
    const { uid, roomId, startDate, endDate, guest1_name, guest1_contact, guest2_name, guest2_contact } = req.body;

    try {
        const [rows] = await pool.query('CALL applyBooking(?, ?, ?, ?, ?, ?, ?, ?, @message)', [uid, roomId, startDate, endDate, guest1_name, guest1_contact, guest2_name, guest2_contact]);
        const [[result]]: any[][] = await pool.query('SELECT @message');
        res.status(200).send(result['@message']);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

router.get('/availableRooms', async (req, res) => {
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
        res.status(400).send('Invalid request');
        return;
    }

    let query = `SELECT RoomID FROM Room_Info WHERE RoomID NOT IN (SELECT Room_ID FROM Confirmed_Booking WHERE ((Start_Date <= ? AND End_Date >= ?) OR (Start_Date <= ? AND End_Date >= ?)) UNION SELECT Room_ID FROM Applied_Booking WHERE ((Start_Date <= ? AND End_Date >= ?) OR (Start_Date <= ? AND End_Date >= ?)))`;

    try {
        const [rows] = await pool.execute(query, [startDate, startDate, endDate, endDate, startDate, startDate, endDate, endDate]);
        res.send(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

export default router;