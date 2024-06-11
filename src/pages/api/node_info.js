import connection from "@/lib/db";
import * as dotenv from "dotenv";
import ccm_00007 from "../../lib/exemploInfoProtein.json";

const conn = connection;
dotenv.config();

export default async function handler(req, res) {
  const devFlag = process.env.DEV_FLAG;
  const { node_id } = req.query;
  try {
    let data = {
      id: "",
      product: "",
      interpro: "",
      pfam: "",
      go: "",
      gene3d: "",
      reactome: "",
      panther: "",
      uniprot: "",
      ec_number: "",
      cazy: "",
    };
    if (devFlag) {
      if (node_id == "CCM_00007") {
        data = ccm_00007;
      }
      return res.status(200).json(data);
    } else {
      //   implementar requisicao ao back-end
    }
  } catch (error) {
    console.log(error);
  }
}
