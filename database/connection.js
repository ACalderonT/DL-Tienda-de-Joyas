import pkg from 'pg';
import 'dotenv/config';

const { Pool } = pkg;

export const pool = new Pool ({
    allowExitOnIdle: true
});

try{
    await pool.query("Select now()");
    console.log(`Database connected`);
}catch(error){
    console.log(error)
}