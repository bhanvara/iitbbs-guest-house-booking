import express from 'express';
import { pool } from '../config/dbconfig'

const router = express.Router();

router.get('/status/:bid', async (req: any, res: any) => {
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

router.get('/getDetails/:bid', async (req: any, res: any) => {
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

router.post('/apply', async (req: any, res: any) => {
    let { uid, roomId, startDate, endDate, guest1_name, guest1_contact, guest2_name, guest2_contact } = req.body;
    console.log("apply api called");
    console.log(req.body);
    console.log("Hello");
    if(guest2_name=='')
        guest2_name=null;
    if(guest2_contact=='')
        guest2_contact=null;
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

router.get('/availableRooms', async (req: any, res: any) => {

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


router.get('/roomDetails', async (req: any, res: any) => {
    const { roomID } = req.query;

    let query = `SELECT * FROM Room_Info WHERE RoomID = ?`;

    try {
        const [rows] = await pool.execute(query, [roomID]);
        res.send(rows);
        console.log(rows);
        console.log("Success");
    } catch (error) {

        console.error(error);
        res.status(500).send('Server error');
    }
});
  

export default router;