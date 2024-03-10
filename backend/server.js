const http = require('http');
require('./Config/DbConnect')
const app = require('./App/app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});