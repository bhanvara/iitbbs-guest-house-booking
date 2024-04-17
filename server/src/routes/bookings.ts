import express from 'express';
import { pool } from '../config/dbconfig'

const router = express.Router();

router.get('/status/:bid', async (req, res) => {
    const bookingId = req.params.bid;
    let tables = ['Pending_Booking', 'Confirmed_Booking', 'Booking_History'];
    let status = null;
    let Approval_Status = null;

    for (let table of tables) {
        let query = `SELECT * FROM ${table} WHERE Booking_ID = ?`;
        try {
            const [rows] = await pool.execute(query, [bookingId]);
            if ((rows as any).length > 0) {
                status = table;
                if (status === 'Pending_Booking') {
                    // also return the row from the approval status table for this booking id
                    query = `SELECT * FROM Approval_Status WHERE Booking_ID = ?`;
                    const [rows] = await pool.execute(query, [bookingId]);
                    if ((rows as any).length > 0) {
                        Approval_Status = rows;
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
        res.send({ status, Approval_Status });
    } else {
        res.status(404).send('No booking found for the provided id');
    }
});

router.get('/getDetails/:bid', async (req, res) => {
    const bookingId = req.params.bid;
    let tables = ['Pending_Booking', 'Confirmed_Booking', 'Booking_History'];
    let status = null;
    let details = null;

    for (let table of tables) {
        let query = `SELECT * FROM ${table} WHERE Booking_ID = ?`;
        try {
            const [rows] = await pool.execute(query, [bookingId]);
            if ((rows as any).length > 0) {
                status = table;
                details = rows;
                break;
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
            return;
        }
    }

    if (status) {
        res.send({ status, details });
    } else {
        res.status(404).send('No booking found for the provided id');
    }
});

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

// {
//     "uid": "f1",
//     "roomId": "r2",
//     "startDate": "2024-05-13",
//     "endDate": "2024-05-16",
//     "guest1_name": "Shlok",
//     "guest1_contact": 7007913716,
//     "guest2_name": "Sagnik",
//     "guest2_contact": 945047294
// }

router.get('/availableRooms', async (req, res) => {

    const { startDate, endDate } = req.query; // Accessing query parameters

    console.log('CALLED API');
    console.log(startDate);
    console.log(endDate);

    let query = `SELECT RoomID FROM Room_Info WHERE RoomID NOT IN (SELECT Room_ID FROM Confirmed_Booking WHERE ((Check_In_Date <= ? AND Check_Out_Date >= ?) OR (Check_In_Date <= ? AND Check_Out_Date >= ?)) UNION SELECT Room_ID FROM Pending_Booking WHERE ((Check_In_Date <= ? AND Check_Out_Date >= ?) OR (Check_In_Date <= ? AND Check_Out_Date >= ?)))`;

    try {
        const [rows] = await pool.execute(query, [startDate, startDate, endDate, endDate, startDate, startDate, endDate, endDate]);
        res.send(rows);
        console.log("Yes");
    } catch (error) {
        console.error("Error");
        // console.error(error);
        res.status(500).send('Server error');
    }
});


router.get('/roomDetails', async (req, res) => {
    const { roomID } = req.query;

    console.log('API CALLED');

    let query = `SELECT * FROM Room_Info WHERE RoomID = ?`;

    try {
        const [rows] = await pool.execute(query, [roomID]);
        res.send(rows);
        console.log(rows);
        console.log("Success");
    } catch (error) {

        console.error(error);
        let dummyValues = { 
            "RoomID": roomID,
            "hostel": 'MHR',
            'description': 'Single bed room with attached bathroom',
            'type1': 'Single',
            'type2': 'AC',
            'price': 1000,
            'key': '1',
        }
        console.log(dummyValues);
        res.send(dummyValues);

        // console.error(error);
        // res.status(500).send('Server error');
    }
});

// API endpoint to fetch pending bookings (NO USERNAME FOR NOW)
router.get('/pending', async (req, res) => {
    try {
        // Fetch pending bookings from the database
        // const [pendingBookings] = await pool.query('SELECT * FROM Pending_Booking');
        let pendingBookings = [
            {bookingID: '1356789',hostel: 'MHR',type1: 'Single',type2: 'AC',price:600,key:1,checkin: '24/04/24',checkout: '28/04/24',status: 'Pending',stage: 1,guest1Name: 'Abc',guest1Contact: '9800998',guest1Email: 'abc@gmail.com',guest2Name: 'def',guest2Contact: '7826783',guest2Email: 'def@gmail.com'},
            {bookingID: '12456789',hostel: 'GHR',type1: 'Single',type2: 'AC',price:600,key:1,checkin: '24/04/24',checkout: '28/04/24',status: 'Pending',stage: 2,guest1Name: 'Abc',guest1Contact: '9800998',guest1Email: 'abc@gmail.com',guest2Name: 'def',guest2Contact: '7826783',guest2Email: 'def@gmail.com'},
            {bookingID: '12567890',hostel: 'RHR',type1: 'Single',type2: 'AC',price:600,key:1,checkin: '24/04/24',checkout: '28/04/24',status: 'Pending',stage: 3,guest1Name: 'Abc',guest1Contact: '9800998',guest1Email: 'abc@gmail.com',guest2Name: 'def',guest2Contact: '7826783',guest2Email: 'def@gmail.com'},
            ];

        // Send the pending bookings in the response
        res.json({ pendingBookings });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// API endpoint to fetch approved bookings (NO USERNAME FOR NOW)
router.get('/approved', async (req, res) => {
    try {
        // Fetch approved bookings from the database
        // const [approvedBookings] = await pool.query('SELECT * FROM Confirmed_Booking');
        let approvedBookings = [
            {bookingID: '1356789',hostel: 'MHR',type1: 'Single',type2: 'AC',price:600,key:1,checkin: '24/04/24',checkout: '28/04/24',status: 'Approved',stage: 3,guest1Name: 'Abc',guest1Contact: '9800998',guest1Email: 'abc@gmail.com',guest2Name: 'def',guest2Contact: '7826783',guest2Email: 'def@gmail.com'},
            {bookingID: '12456789',hostel: 'GHR',type1: 'Single',type2: 'AC',price:600,key:1,checkin: '24/04/24',checkout: '28/04/24',status: 'Approved',stage: 3,guest1Name: 'Abc',guest1Contact: '9800998',guest1Email: 'abc@gmail.com',guest2Name: 'def',guest2Contact: '7826783',guest2Email: 'def@gmail.com'},
            {bookingID: '12567890',hostel: 'RHR',type1: 'Single',type2: 'AC',price:600,key:1,checkin: '24/04/24',checkout: '28/04/24',status: 'Approved',stage: 3,guest1Name: 'Abc',guest1Contact: '9800998',guest1Email: 'abc@gmail.com',guest2Name: 'def',guest2Contact: '7826783',guest2Email: 'def@gmail.com'},
            ];

        // Send the approved bookings in the response
        res.json({ approvedBookings });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// API endpoint to fetch rejected bookings (NO USERNAME FOR NOW)
router.get('/rejected', async (req, res) => {
    try {
        // Fetch rejected bookings from the database
        // const [rejectedBookings] = await pool.query('SELECT * FROM Rejected_Booking');
        let rejectedBookings = [
            {bookingID: '1356789',hostel: 'MHR',type1: 'Single',type2: 'AC',price:600,key:1,checkin: '24/04/24',checkout: '28/04/24',status: 'Rejected',stage: 1,guest1Name: 'Abc',guest1Contact: '9800998',guest1Email: 'abc@gmail.com',guest2Name: 'def',guest2Contact: '7826783',guest2Email: 'def@gmail.com'},
            {bookingID: '12456789',hostel: 'GHR',type1: 'Single',type2: 'AC',price:600,key:2,checkin: '24/04/24',checkout: '28/04/24',status: 'Rejected',stage:2,guest1Name: 'Abc',guest1Contact: '9800998',guest1Email: 'abc@gmail.com',guest2Name: 'def',guest2Contact: '7826783',guest2Email: 'def@gmail.com'},
            {bookingID: '12567890',hostel: 'RHR',type1: 'Single',type2: 'AC',price:600,key:3,checkin: '24/04/24',checkout: '28/04/24',status: 'Rejected',stage:3,guest1Name: 'Abc',guest1Contact: '9800998',guest1Email: 'abc@gmail.com',guest2Name: 'def',guest2Contact: '7826783',guest2Email: 'def@gmail.com'},
            ];

        // Send the rejected bookings in the response
        res.json({ rejectedBookings });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// {
//     "startDate": "2024-05-13",
//     "endDate": "2024-05-16"
// }
  

export default router;