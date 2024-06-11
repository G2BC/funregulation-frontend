import connection from "@/lib/db";
import * as dotenv from "dotenv";

const conn = connection;
dotenv.config();

export default async function handler(req, res) {
  const devFlag = process.env.DEV_FLAG;
  const { grn } = req.query;
  try {
    console.log('recebeu requisicao');
    let data = {
      id: "",
      interactions: 0,
      nodes: 0,
      selfregulations: 0,
      positiveregulations: 0,
      negativeregulations: 0,
      unknownregulations: 0,
    };
    if (devFlag) {
      if (grn == "GCA_000225605.1") {
        data = {
            id: "GCA_000225605.1",
            interactions: 14847,
            nodes: 6345,
            selfregulations: 0,
            positiveregulations: 0,
            negativeregulations: 0,
            unknownregulations: 14847,
          }
      } else if (grn == "GCA_001275765.2") {
        data = {
        id: "GCA_001275765.2",
        interactions: 21402,
        nodes: 5212,
        selfregulations: 28,
        positiveregulations: 9181,
        negativeregulations: 8373,
        unknownregulations: 3848,
        }
      }
      return res.status(200).json(data);
    } else {
      //   implementar requisicao ao back-end
    }
  } catch (error) {
    console.log(error);
  }
}
