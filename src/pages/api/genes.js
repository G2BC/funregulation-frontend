import connection from "@/lib/db"

const conn = connection;

export default async function handler(req, res) {
    try {
      const query = 'SELECT DISTINCT (organism) FROM public.gene;'
      const result = await conn.query(query);
      const { rows } = result;
      const initialData = JSON.stringify(rows);
      const finalData = JSON.parse(initialData);
      return res.status(200).json(finalData)
    } catch ( error ) {
      console.log(error);
    }
    
  }
