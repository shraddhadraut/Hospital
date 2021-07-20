const _ = require("lodash");
const User = require("../models/user.model");
const { encrypt } = require("../helpers/encryption");

class UserCtrl {
  static pickUser(user) {
    return _.pick(user, [
      "name",
      "_id",
      "mobile",
      "email",
      "role",
      "status",
      "userId",
    ]);
  }

  static createUser(req, res) {
    const u = req.body;
    if (u.password) {
      u.password = encrypt(u.password);
    }

    const userObj = new User(u);

    userObj
      .save()
      .then((result) => {
        res
          .status(200)
          .send({ message: "User created", data: UserCtrl.pickUser(result) });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "Could not created a user", error: err });
      });
  }
  // end of createUser

  // updateUser
  static updateUser(req, res) {
    const { id } = req.params;
    const u = req.body;
    if (u.password) {
      u.password = encrypt(u.password);
    }

    User.findByIdAndUpdate(id, u, { new: true }, (err, result) => {
      if (err)
        res
          .status(404)
          .send({ message: "Could not updated the user", error: err });
      else
        res.status(200).send({
          message: "User updated successsfully",
          data: UserCtrl.pickUser(result),
        });
    });
  }
  // end of updateUser

  // deleteUser
  static deleteUser(req, res) {
    const { id } = req.params;

    User.findByIdAndUpdate(id, { status: 2 }, { new: true }, (err, result) => {
      if (err)
        res
          .status(404)
          .send({ message: "Could not deleted the user", error: err });
      else
        res.status(200).send({
          message: "User deleted successsfully",
          data: UserCtrl.pickUser(result),
        });
    });
  }
  // end of deleteUser

  // getUser
  static getUser(req, res) {
    const { id } = req.params;

    User.findOne({
      _id: id,
      $or: [{ status: 1 }, { status: 0 }],
    })
      .select("name mobile email userId age status role createdAt")

      .exec()
      .then((result) => {
        res.status(200).send({ message: "User ", data: result });
      })

      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not load the user", error: err });
      });
  }
  // end of getUser

  // getUsers
  static getUsers(req, res) {
    User.find({
      $or: [{ status: 0 }, { status: 1 }],
    })
      .select("name mobile email userId age status role createdAt")

      .exec()
      .then((result) => {
        res.status(200).send({ message: "User List", data: result });
      })

      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not load the users", error: err });
      });
  }
  // end of getUsers
}

module.exports = UserCtrl;
