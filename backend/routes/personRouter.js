const personController = require("../controllers/personController.js");

const router = require("express").Router();

router.post("/addPerson", personController.upload, personController.addPerson);
router.get("/allPersons", personController.getAllPersons);

router.get("/:id", personController.getOnePerson);
router.put("/:id", personController.updatePerson);
router.delete("/:id", personController.deletePerson);

module.exports = router;
