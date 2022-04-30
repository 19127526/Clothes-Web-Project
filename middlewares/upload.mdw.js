import request from "request";
import fs from "fs";
import getToken from "../utils/sirvcdn.js";

async function uploadImage(fileName) {
    const token = await getToken();

    fs.readFile(fileName, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const options = {
            method: "POST",
            url: "https://api.sirv.com/v2/files/upload",
            qs: { filename: '/Images/' + fileName },
            headers: {
                "content-type": "image/jpeg",
                authorization: "Bearer " + token,
            },
            body: data,
        };

        request(options, (error, response, body) => {
            if (error) throw new Error(error);
            console.log(body);
        });
    });
}

export default uploadImage;