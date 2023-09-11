import { Pool} from "pg";
import * as dotenv from 'dotenv';

dotenv.config();

let connection;

if(!connection) {
    connection = new Pool({
        user:process.env.PGSQL_USER,
        password: process.env.PGSQL_PASSWORD,
        host: process.env.PGSQL_HOST,
        port: process.env.PGSQL_PORT,
        database: process.env.PGSQL_DATABASE,
    });
}

export default connection;