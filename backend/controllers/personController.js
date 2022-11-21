const db = require("../models");
const multer = require("multer");
const path = require("path");

// create main Model
const Person = db.persons;

// main work
// 1. create person
const addPerson = async (req, res) => {
  let info = {
    image: req.file.path,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    subject: req.body.subject,
    message: req.body.message,
  };

  const person = await Person.create(info);
  res.status(200).send(person);
  console.log(person);
};

// 2. get all persons
const getAllPersons = async (req, res) => {
  let persons = await Person.findAll({});
  //   {
  //   attributes: ["firstname", "lastname"],
  // }
  res.status(200).send(persons);
};

// 3. get single person

const getOnePerson = async (req, res) => {
  let id = req.params.id;

  let person = await Person.findOne({ where: { id: id } });
  res.status(200).send(person);
};

// 4. update Person

const updatePerson = async (req, res) => {
  let id = req.params.id;
  console.log(id);
  const person = await Person.update(req.body, { where: { id: id } });

  res.status(200).send(person);
};

// 5. Delete Person

const deletePerson = async (req, res) => {
  let id = req.params.id;
  await Person.destroy({ where: { id: id } });

  res.status(200).send({ data: "Person is deleted" });
};

// Upload Image Controller

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, "upload_at_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files format to upload");
  },
}).single("image");

module.exports = {
  addPerson,
  getAllPersons,
  getOnePerson,
  updatePerson,
  deletePerson,
  upload,
};
