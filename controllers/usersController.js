const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const usersController = {};

usersController.getAll = async (req, res) => {
    //#swagger.tags = ['Users']
    const result = await mongodb.getDatabase().db("project1").collection("users").find()//.toArray();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    })
};

usersController.getSingle = async (req, res) => {
    //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db("project1").collection("users").find({_id: userId})//.toArray();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    })
};

usersController.createUser = async (req, res) => {
    //#swagger.tags = ['Users']
    const user ={
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favouriteColor: req.body.favouriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getDatabase().db("project1").collection("users").insertOne(user);
    if (result.acknowledged) {
        res.status(204).send();
    }else{
        res.status(500).json(result.error || "Some error occurred while creating the user.");
    }
    
}


usersController.updateUser = async (req, res) => {
    //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id);
    const user ={
        fisrtName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favouriteColor: req.body.favouriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getDatabase().db("project1").collection("users").replaceOne({_id: userId}, user);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    }else{
        res.status(500).json(result.error || "Some error occurred while creating the user.");
    }
    
}

usersController.deleteUser = async (req, res) => {
    //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id);
    /*const user ={
        fisrtName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favouriteColor: req.body.favouriteColor,
        birthday: req.body.birthday
    };*/
    const result = await mongodb.getDatabase().db("project1").collection("users").deleteOne({_id: userId});
    if (result.deletedCount > 0) {
        res.status(204).send();
    }else{
        res.status(500).json(result.error || "Some error occurred while creating the user.");
    }
    
}
















module.exports = usersController;