import dotenv from "dotenv";
dotenv.config();
import http from "https";

const clientId = process.env.SIRV_ID;
const clientSecret = process.env.SIRV_SECRET;

const options = {
  method: "POST",
  hostname: "api.sirv.com",
  path: "/v2/token",
  headers: {
    "content-type": "application/json",
  },
};

export default function getToken() {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      const chunks = [];

      res.on("data", (chunk) => {
        chunks.push(chunk);
      });

      res.on("end", () => {
        const body = Buffer.concat(chunks);
        const apiResponse = JSON.parse(body.toString());
        resolve(apiResponse.token);
      });
    });
    req.write(JSON.stringify({
      clientId,
      clientSecret
    }));
    req.end();
  });
}
