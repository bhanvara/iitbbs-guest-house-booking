import express from 'express';
import {pool} from '../config/dbconfig'
import { FieldPacket, QueryResult } from 'mysql2';

const router = express.Router();

// get the details of a user with the given email
router.get('/info/:email', async (req, res) => {
    const email = req.params.email;
    const tables = ['Students', 'Gymkhana', 'Faculty_and_Staff'];

    for (let i = 0; i < tables.length; i++) {
        let query = `SELECT * FROM ${tables[i]} WHERE Email = '${email}' LIMIT 1`;

        try {
            const [details, fields]: [any, FieldPacket[]] = await pool.execute(query);
            if (details.length > 0) {
                res.send({ type: tables[i], details });
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


// get the user ID with the given email
router.get('/getUserId/:email', async (req, res) => {
    const email = req.params.email;
    const tables = ['Students', 'Gymkhana', 'Faculty_and_Staff'];

    for (let i = 0; i < tables.length; i++) {
        let query = `SELECT ID FROM ${tables[i]} WHERE Email = '${email}' LIMIT 1`;

        try {
            const [details, fields]: [any, FieldPacket[]] = await pool.execute(query);
            if (details.length > 0) {
                const id = details[0].ID;
                res.send({ id });
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

// get all the supervisors for a user with the given ID
router.get('/getSupervisors/:uid', async (req, res) => { 
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

// get all the pending bookings for a user with the given ID
router.get('/pending/:uid', async (req, res) => {
    const uid = req.params.uid;
    let query = `SELECT * FROM Pending_Booking WHERE Booked_By_User_ID = '${uid}'`;

    try {
        const [rows]: any[] = await pool.execute(query);
        if (rows.length > 0 || rows.affectedRows > 0) {
            let bookingDetails: { [key: string]: any } = {};
            let rowCount: number = 1;
            
            for (let row of rows) {
                let approvalQuery = `SELECT * FROM Approval_Status WHERE booking_id = '${row.Booking_ID}' LIMIT 1`;
                const [approvalRows]: any[] = await pool.execute(approvalQuery);

                let roomQuery = `SELECT * FROM Room_Info WHERE RoomID = '${row.Room_ID}' LIMIT 1`;
                const [roomRows]: any[] = await pool.execute(roomQuery);

                bookingDetails[rowCount] = { bookingDetails: row, roomDetails: roomRows, approvalStatus: approvalRows };
                rowCount++;
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

// get all the confirmed bookings for a user with the given ID
router.get('/confirmed/:uid', async (req, res) => {
    const uid = req.params.uid;
    let query = `SELECT * FROM Confirmed_Booking WHERE Booked_By_User_ID = '${uid}'`;

    try {
        const [rows]: any[] = await pool.execute(query);
        if (rows.length > 0 || rows.affectedRows > 0) {
            let bookingDetails: { [key: string]: any } = {};
            let rowCount: number = 1;
            
            for (let row of rows) {
                let roomQuery = `SELECT * FROM Room_Info WHERE RoomID = '${row.Room_ID}' LIMIT 1`;
                const [roomRows]: any[] = await pool.execute(roomQuery);

                bookingDetails[rowCount] = { bookingDetails: row, roomDetails: roomRows };
                rowCount++;
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

// get the booking history for a user with the given ID
router.get('/history/:uid', async (req, res) => {
    const uid = req.params.uid;
    let query = `SELECT * FROM Booking_History WHERE Booked_By_User_ID = '${uid}' LIMIT 5`;

    try {
        const [rows]: any[] = await pool.execute(query);
        if (rows.length > 0 || rows.affectedRows > 0) {
            let bookingDetails: { [key: string]: any } = {};
            let rowCount: number = 1;
            
            for (let row of rows) {
                let roomQuery = `SELECT * FROM Room_Info WHERE RoomID = '${row.Room_ID}' LIMIT 1`;
                const [roomRows]: any[] = await pool.execute(roomQuery);

                bookingDetails[rowCount] = { bookingDetails: row, roomDetails: roomRows };
                rowCount++;
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

async function isSupervisor(uid: string): Promise<boolean | undefined> {
    let query = `SELECT * FROM user_Supervisor WHERE sid1 = '${uid}' OR sid2 = '${uid}' OR sid3 = '${uid}'`;

    try {
        const [rows]: any[] = await pool.execute(query);
        if (rows.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error('Error executing query:', err);
        return false;
    }

    return undefined;
}

// check if the user with the given ID is a supervisor
router.get('/isSupervisor/:uid', async (req, res) => {
    const uid = req.params.uid;
    const isSup = await isSupervisor(uid);
    res.send({ isSupervisor: isSup });
});

// Only for supervisors

// get all the pending approvals that the supervisor is yet to approve
router.get('/pendingApprovals/:sid', async (req, res) => {
    const sid = req.params.sid;
    const query = `SELECT Booking_ID FROM Pending_Approvals_BySupervisor WHERE sid = '${sid}'`;

    try {
        const [rows]: any[] = await pool.execute(query);
        if (rows.length > 0 || rows.affectedRows > 0) {
            const bookingIds = rows.map((row: Record<string, any>) => row.Booking_ID);
            res.send({ Pending_Bookings: bookingIds });
        } else {
            res.status(404).send('No pending approvals found for the provided ID');
        }
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal server error');
    }
});

// review a pending booking
router.post('/reviewBooking', async (req, res) => {
    const { bookingId, sid, reviewStatus, message } = req.body;

    try {
        // Call the stored procedure with an OUT parameter
        await pool.query('CALL reviewBooking(?, ?, ?, ?, @executionMessage)', [bookingId, sid, reviewStatus, message]);

        // Get the value of the OUT parameter
        const result: any[] = await pool.query('SELECT @executionMessage AS message');
        const executionMessage = result[0].message;

        res.send({ message: 'Booking reviewed successfully', executionMessage });
    } catch (err) {
        console.error('Error executing stored procedure:', err);
        res.status(500).send('Internal server error');
    }
});

// {
//     "bookingId": 4,
//     "sid": "f1",
//     "reviewStatus": "approved",
//     "message": ""
// }

export default router;
