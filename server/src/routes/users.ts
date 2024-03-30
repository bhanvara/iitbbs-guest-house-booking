import express from 'express';
import {pool} from '../config/dbconfig'
import { FieldPacket, QueryResult } from 'mysql2';

const router = express.Router();

router.get('/info/:email', async (req, res) => {
    const email = req.params.email;
    const tables = ['Students', 'Gymkhana', 'Faculty_and_Staff'];

    for (let i = 0; i < tables.length; i++) {
        let query = `SELECT * FROM ${tables[i]} WHERE Email = '${email}'`;

        try {
            const [rows, fields]: [any, FieldPacket[]] = await pool.execute(query);
            if (rows.length > 0) {
                res.send({ type: tables[i], rows });
                return;
            }
        } catch (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Server error');
            return;
        }
    }

    res.status(404).send('No user found with provided email');
});

router.get('/supervisors/:uid', async (req, res) => {
    const id = req.params.uid;
    let query = `SELECT * FROM user_Supervisor WHERE ID = '${id}'`;

    try {
        const [rows]: any[] = await pool.execute(query);
        if (rows.length > 0 || rows.affectedRows > 0) {
            res.send(rows);
        } else {
            res.status(404).send('No user found with provided ID');
        }
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal server error');
    }
});

router.get('/pending/:uid', async (req, res) => {
// get all the pending bookings for a user with the given ID, pending booking is a booking that is not yet confirmed and is present in the Applied_Booking table
// also for each booking find the supervisors approval status who is yet to approve from the ApprovalStatus table
// the booking details should be of the form {bid1: {details}, bid2: {details}, bid3: {details}} where bid1, bid2, bid3 are the booking IDs present in the Applied_Booking table
// this details object should contain all the columns present in the Applied_Booking table and the approval status of each supervisor if he has approved or not note: it might happen that that only one or two supervisors are present in the ApprovalStatus table for a booking in that case the sid3 or sid2 will be null in the ApprovalStatus table which means that we need to consider only sid1 and sid2 for that booking so the status should be of the form {sid1: 'approved', sid2: 'pending'} if sid3 is null, that means that you have to find the null value in the ApprovalStatus table and consider only sid1 and sid2 for that booking

    const uid = req.params.uid;
    let query = `SELECT * FROM Applied_Booking WHERE UID = '${uid}'`;

    try {
        const [rows]: any[] = await pool.execute(query);
        if (rows.length > 0 || rows.affectedRows > 0) {
            let bookingDetails: { [key: string]: any } = {};
            for (let row of rows) {
                let approvalQuery = `SELECT sid1, sid2, sid3 FROM ApprovalStatus WHERE booking_id = '${row.Booking_ID}'`;
                const [approvalRows]: any[] = await pool.execute(approvalQuery);
                let status: { [key: string]: string } = {};
                if (approvalRows.length > 0) {
                    if (approvalRows[0].sid1) {
                        status[approvalRows[0].sid1] = approvalRows.status1;
                    }
                    if (approvalRows[0].sid2) {
                        status[approvalRows[0].sid2] = approvalRows.status2;
                    }
                    if (approvalRows[0].sid3) {
                        status[approvalRows[0].sid3] = approvalRows.status3;
                    }
                }
                bookingDetails[row.Booking_ID] = { ...row, status };
            }
            res.send(bookingDetails);
        } else {
            res.status(404).send('No booking found for the provided ID');
        }
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal server error');
    }
});


router.get('/confirmed/:uid', async (req, res) => {
    const uid = req.params.uid;
    let query = `SELECT * FROM Confirmed_Booking WHERE UID = '${uid}'`;

    try {
        const [rows]: any[] = await pool.execute(query);
        if (rows.length > 0 || rows.affectedRows > 0) {
            res.send(rows);
        } else {
            res.status(404).send('No booking found for the provided ID');
        }
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal server error');
    }
});

router.get('/history/:uid', async (req, res) => {
    const uid = req.params.uid;
    let query = `SELECT * FROM Booking_History WHERE UID = '${uid}'`;

    try {
        const [rows]: any[] = await pool.execute(query);
        if (rows.length > 0 || rows.affectedRows > 0) {
            res.send(rows);
        } else {
            res.status(404).send('No booking found for the provided ID');
        }
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal server error');
    }
});

router.post('/reviewBooking', async (req, res) => {
    const { bookingId, sid, reviewStatus, message } = req.body;

    try {
        await pool.query('CALL reviewBooking(?, ?, ?, ?)', [bookingId, sid, reviewStatus, message]);
        res.send('Booking reviewed successfully');
    } catch (err) {
        console.error('Error executing stored procedure:', err);
        res.status(500).send('Internal server error');
    }
});

// router.post('/approve/:bid', async (req, res) => {
//     const { bid } = req.params; // booking id
//     const { sid, reviewStatus, message } = req.body; // supervisor id, review status, and message

//     // Loop over each supervisor
//     for (let i = 1; i <= 3; i++) {
//         // Check if the supervisor id matches the current supervisor
//         const supervisor: any[] = await pool.query(`SELECT sid${i} FROM user_Supervisor WHERE id = ?`, [bid]);
//         if (supervisor[0][`sid${i}`] === sid) {
//             // Update the corresponding status
//             await pool.query(`UPDATE Approval_Status SET status${i} = ? WHERE uid = ?`, [reviewStatus, bid]);

//             // Check if the next supervisor is null
//             const nextSupervisor: any[] = await pool.query(`SELECT sid${i + 1} FROM user_Supervisor WHERE id = ?`, [bid]);
//             if (nextSupervisor[0][`sid${i + 1}`] === null) {
//                 // Move the booking from the pending to the confirmed bookings
//                 await pool.query(`INSERT INTO Confirmed_Booking SELECT * FROM Pending_Booking WHERE Booking_ID = ?`, [bid]);
//                 await pool.query(`DELETE FROM Approval_Status WHERE uid = ?`, [bid]);
//                 await pool.query(`DELETE FROM Pending_Booking WHERE Booking_ID = ?`, [bid]);
//             }

//             // If the review status is 'rejected', move the booking to the booking history
//             if (reviewStatus === 'rejected') {
//                 await pool.query(`INSERT INTO Booking_History SELECT *, 'rejected', ?, ? FROM Pending_Booking WHERE Booking_ID = ?`, [sid, message, bid]);
//                 await pool.query(`DELETE FROM Approval_Status WHERE uid = ?`, [bid]);
//                 await pool.query(`DELETE FROM Pending_Booking WHERE Booking_ID = ?`, [bid]);
//             }

//             break;
//         }
//     }

//     res.send('Booking reviewed');
// });




export default router;
