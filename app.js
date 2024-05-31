const express = require("express");
const app = express();

app.get("/", function (req, res) {
    res.send("primeira rota");
});

app.listen(8080, () => {
    console.log("serve running : http://localhost:8080/");
});

//video 1 min 18:16
