import connection from "@/lib/db"
import axios from "axios";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const conn = connection;

export const config = {
  api: {
    responseLimit: false,
  },
}

export default async function handler(req, res) {
  try {
    const {organism} = req.query;
    //const query = 'SELECT DISTINCT ON (tf_name) tf_name FROM network.relations;'
    //const query = `SELECT DISTINCT * from public.model_regulatory model right join public.gene gen on model.tf_locus_tag = gen.locus_tag AND gen.organism = '${organism}' WHERE model.tf_locus_tag IS NOT NULL;`
    //const result = await conn.query(query);
    //const { rows } = result;
    //const initialData = JSON.stringify(rows);
    //const finalData = JSON.parse(initialData);

    axios
        .get("http://localhost:5500/src/lib/data.json")
        .then((response) => {
          //console.log(response.data);
          return res.status(200).json(response.data)
        })
        
    // finalData.forEach((dados) => {
    //   let data = {id: dados['tf_name']}
    //   dados['data'] = data;
    //   delete dados['tf_name'];
    // });
    //return res.status(200).json(finalData)
  } catch ( error ) {
    console.log(error);
  }
  
}
