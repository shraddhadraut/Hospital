const express = require("express");

const UserCtrl = require("../controllers/user.controller");
const router = express.Router();

router.get("/:id", UserCtrl.getUser);

router.post("/", UserCtrl.createUser);

router.put("/:id", UserCtrl.updateUser);

router.delete("/:id", UserCtrl.deleteUser);

router.get("/", UserCtrl.getUsers);

module.exports = router;
