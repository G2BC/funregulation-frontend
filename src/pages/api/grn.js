import connection from "@/lib/db"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const conn = connection;

export default async function handler(req, res) {
  try {
    const query = 'SELECT DISTINCT ON (tf_name) tf_name FROM network.relations;'
    const result = await conn.query(query);
    const { rows } = result;
    const initialData = JSON.stringify(rows);
    const finalData = JSON.parse(initialData);
    finalData.forEach((dados) => {
      let data = {id: dados['tf_name']}
      dados['data'] = data;
      delete dados['tf_name'];
    });
    return res.status(200).json(finalData)
  } catch ( error ) {
    console.log(error);
  }
  
}
