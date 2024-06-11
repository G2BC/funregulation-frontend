import connection from "@/lib/db"
import * as dotenv from 'dotenv';
import data from '../../lib/exemploTaskStatus.json';
import GCA_0012757652 from '../../lib/GCA_0012757652.json';
import GCA_0002256051 from '../../lib/GCA_0002256051.json';

const conn = connection;
dotenv.config();

export default async function handler(req, res) {
  const {request_number} = req.query;
  const devFlag = process.env.DEV_FLAG;
  let returnData = data;
  try {
    if (devFlag) {
      returnData[10].status = false;
      const grns = ['GCA_001275765.2', 'GCA_000225605.1']
      console.log(request_number);
      console.log('is request builded: ', request_number == 'GCA_001275765.2');
      if (grns.includes(request_number)) {
        console.log('grn construida');
        returnData[10].status = true;
      }
      console.log('task status: ', returnData[10].status);
      return res.status(200).json(returnData);
    } else {

    }
    
  } catch ( error ) {
    console.log(error);
  }
    
}
