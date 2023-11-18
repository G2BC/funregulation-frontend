import connection from "@/lib/db"
import * as dotenv from 'dotenv';
import data from '../../lib/listOrganisms.json';

const conn = connection;
dotenv.config();

export default async function handler(req, res) {
  const devFlag = process.env.DEV_FLAG;
  try {
    if (devFlag) {
      return res.status(200).json(data);
    } else {
      const query = 'SELECT DISTINCT (organism) FROM public.gene;'
      const result = await conn.query(query);
      const { rows } = result;
      const initialData = JSON.stringify(rows);
      const finalData = JSON.parse(initialData);
      return res.status(200).json(finalData);
    }
    
  } catch ( error ) {
    console.log(error);
  }
    
}
