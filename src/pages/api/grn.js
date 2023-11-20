import connection from "@/lib/db"
import axios from "axios";
import * as dotenv from 'dotenv';

import GCA_0012757652 from '../../lib/GCA_0012757652.json';
import GCA_0002256051 from '../../lib/GCA_0002256051.json';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const conn = connection;
dotenv.config();

export const config = {
  api: {
    responseLimit: false,
  },
}

export default async function handler(req, res) {
  const {organism} = req.query;
  const devFlag = process.env.DEV_FLAG;
  try {
    if(devFlag) {
      let data;
      if(organism == 'GCA_001275765.2') {
        data = GCA_0012757652;
      } else if(organism == 'GCA_000225605.1') {
        data = GCA_0002256051;
      }
      return res.status(200).json(data)
    } else {
      //const query = 'SELECT DISTINCT ON (tf_name) tf_name FROM network.relations;'
    //const query = `SELECT DISTINCT * from public.model_regulatory model right join public.gene gen on model.tf_locus_tag = gen.locus_tag AND gen.organism = '${organism}' WHERE model.tf_locus_tag IS NOT NULL;`
    //const result = await conn.query(query);
    //const { rows } = result;
    //const initialData = JSON.stringify(rows);
    //const finalData = JSON.parse(initialData);

    // axios
    //     .get("http://localhost:5500/src/lib/data.json")
    //     .then((response) => {
    //       //console.log(response.data);
    //       return res.status(200).json(response.data)
    //     })
    return res.status(200).json(data);
    // finalData.forEach((dados) => {
    //   let data = {id: dados['tf_name']}
    //   dados['data'] = data;
    //   delete dados['tf_name'];
    // });
    //return res.status(200).json(finalData)
    }
    
  } catch ( error ) {
    console.log(error);
  }
  
}
