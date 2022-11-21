const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var app = express();

var corOptions = {
  origin: "http://localhost:4200",
};

app.use(cors(corOptions));

app.set("view engine", "ejs");

// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routers

const router = require("./routes/personRouter.js");
app.use("/api/persons", router);
// Static images folder

app.use("/Images", express.static("./Images"));

// testing api

app.get("/", (req, res) => {
  res.json({ message: "hello from api" });
});

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "contact",
// });

// con.connect((err) => {
//   if (!err) {
//     console.log("Connected Successfully");
//   } else {
//     console.log("Connection Failed");
//   }

//     con.query("CREATE DATABASE contact", (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("Database is Created successfully");
//       }
//     });

//     var sql =
//       "CREATE TABLE persondetail (id INT AUTO_INCREMENT PRIMARY KEY , firstname VARCHAR (255), lastname VARCHAR(255), email VARCHAR(255), phone VARCHAR(255), subect VARCHAR(255), message VARCHAR(255))";
//     con.query(sql, (err, result) => {
//       if (err) {
//         console.log("Table not created");
//       } else {
//         console.log("Table created successfully");
//       }
//     });
// });

// port

const PORT = process.env.PORT || 3000;

// server

app.listen(PORT, () => {
  console.log(`Server is connected at port ${PORT}`);
});
