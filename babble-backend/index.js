const express = require("express");

const app = express();

// Simple hello world server request
app.get("/hello", (request, response) => {
    response.setHeader("Content-Type", "text/plain");
    response.send("Hello world!");
});

app.listen(3000);

console.log("listening on http://localhost:3000/");
console.log("Press Ctrl-C to quit");