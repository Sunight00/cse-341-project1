const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const usersController = {};

usersController.getAll = async (req, res) => {
    try {
        const users = await mongodb
            .getDatabase()
            .db("project1")
            .collection("users")
            .find()
            .toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ message: error });
    }
};


usersController.getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);

        const user = await mongodb
            .getDatabase()
            .db("project1")
            .collection("users")
            .findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
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