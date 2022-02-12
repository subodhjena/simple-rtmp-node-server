/*
 * File: index.js
 * Project: rtmp-node-server
 * File Created: Saturday, 12th February 2022 1:47:29 pm
 * Author: subodhjena (jenasubodh@gmail.com)
 * -----
 * Last Modified: Saturday, 12th February 2022 2:20:10 pm
 * Modified By: Subodh Jena (jenasubodh@gmail.com>)
 * -----
 * Copyright 2019 - 2022 PixelWave, PixelWave
 */
const { createServer } = require("@mediafish/rtmp-server");

// Start an RTMP server
createServer({ port: 19350, maxConnectionNum: 2, maxStreamNum: 2 })
  .once("/live/main-camera", handleConnection)
  .once("/live/sub-camera", handleConnection)
  .on("error", (err) => {
    console.error(err.stack);
  });

function handleConnection(connection) {
  console.log(`Incoming connection: path="${connection.path}"`);
  return connection
    .once("stream-1", handleStream)
    .once("stream-2", handleStream)
    .on("error", (err) => {
      console.error(err.stack);
    });
}

function handleStream(stream) {
  console.log(`Published stream: name="${stream.name}"`);
  return stream.on("data", handleMessage).on("error", (err) => {
    console.error(err.stack);
  });
}

function handleMessage({ timestamp, type, data }) {
  console.log(`RTMP message: type=${type}, timestamp=${timestamp}`);
  switch (type) {
    case "video":
      // data is FLV video tag (AVC)
      console.log(data);
      break;
    case "audio":
      // data is FLV audio tag (AAC)
      console.log(data);
      break;
    case "data":
      // data is an array
      for (const item of data) {
        console.log(`${JSON.stringify(item, null, 4)}`);
      }
      break;
  }
}
