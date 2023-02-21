var jwt = require('jsonwebtoken');

const secret = "MDFKLMlkmdlkasmfKUDJASNGKJM.dffg12"

const token = jwt.sign({
    data: {
        appId: "d3cef788-a7dd-4122-b9fa-f99c213cf7d2",
        company: "turknet",
        scenarioId: "4755919f-edc7-40ca-a3ce-34d7d32bcf5b"
    }
}, secret + "fdsıgmdfl")

console.log(token);


const readData = jwt.decode(token, secret);
console.log(readData);
try {
    const verify = jwt.verify(token, secret + "fdsıgmdfl");
    console.log(verify)
} catch (error) {
    console.log(error)
}