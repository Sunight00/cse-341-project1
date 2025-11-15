const express = require('express');
const router = express.Router();
const validator = require("../middleware/validate");
const usersController = require("../controllers/usersController");

router.get("/", usersController.getAll);
router.get("/:id", usersController.getSingle);
router.post("/", validator.contactRules(),validator.checkContactData, usersController.createUser);
router.put("/:id", validator.contactRules(),validator.checkContactData, usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

module.exports = router;