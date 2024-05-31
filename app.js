const express = require("express");
const app = express();

app.get("/", function (req, res) {
    res.send("Hello World");
});

app.listen(8080, () => {
    console.log("serve running : http://localhost:8080/");
});
