import { createClient } from "@supabase/supabase-js";
import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl as string, supabaseKey as string);

// Check connection
// async function checkConnection() {
//     let { data, error } = await supabase.from('students').select('*');
//     console.log(data);
//     if (error) {
//         console.error('Connection failed: ', error);
//     } else {
//         console.log('Connection successful');
//     }
// }

// checkConnection();

async function runQuery() {
    const sql = postgres('postgres://postgres.iecipxncnpapflawrrog:' + process.env.PostgresPassword + '@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres');

    try {
        const students = await sql`SELECT * FROM students`;
        console.log(students);
    } catch (error) {
        console.error('Failed to run query: ', error);
    }

    // Remember to end the connection when you're done
    await sql.end();
}

runQuery();
