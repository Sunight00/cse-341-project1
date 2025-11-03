const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const usersController = {};

usersController.getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db("project1").collection("users").find()//.toArray();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    })
};

usersController.getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db("project1").collection("users").find({_id: userId})//.toArray();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    })
};

module.exports = usersController;