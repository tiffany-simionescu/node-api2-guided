const express = require('express');
const hubRouter = require('./routers/hub');
const welcomeRouter = require('./routers/welcome');
const server = express();

server.use(express.json());

server.use("/api/hubs", hubRouter);
server.use("/", welcomeRouter);

// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
