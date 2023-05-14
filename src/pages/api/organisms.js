import axios from "axios";

export default async function handler(req, res) {
    try {
        axios
        .get("http://localhost:8000/api/v1/Organisms")
        .then((response) => {
          console.log(response.data);
          return res.status(200).json(response.data)
        })
        .catch((error) => {
          console.error(error);
        });
    } catch ( error ) {
      console.log(error);
    }
    
  }
