import http from "https";

const clientId = "8a5DiZ0iHzLekaapN1bwnLenf3d";
const clientSecret = "Yiz69K8fFbRDFQG6zK1hU5x8hhUOiscPgSDdQrPyIA+BO9Ev1vpiifI1k9hAONW6RxOfy4WWN511HoaIgdb4KA==";

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
