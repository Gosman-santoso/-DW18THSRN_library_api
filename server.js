express = require("express");

const cors = require("cors");

require("dotenv").config();

const app = express();

const router = require("./src/routes/router");

app.use(express.json());
app.use(cors());

app.use("/public/img", express.static("public/img"));
app.use("/public/files", express.static("public/files"));
app.use("/public/thumbnails", express.static("public/thumbnails"));

app.use("/api/v1/", router);

const port = 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));