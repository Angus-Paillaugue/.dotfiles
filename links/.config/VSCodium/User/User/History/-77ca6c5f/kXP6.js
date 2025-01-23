import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import fs from "fs"

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// Website routes
app.get("/", (req, res) => {
    const apps = JSON.parse(fs.readFileSync("./apps.json"));
    res.render('index', {apps:apps});
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on http://localhost:${process.env.PORT || 3000}`);
});
