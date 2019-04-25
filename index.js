const envReader= require('dotenv')
envReader.config();
const server = require("./server")

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log('server is working on 4000')
})