const bodyParser = require('body-parser');
const TaskModel = require('../models').Task;
module.exports = function (app) {
    app.post("/task", async (request, response) => {
        try {
            if (request.body.length < 3) {
                return response.status(400).end();
            }
            var task = new TaskModel(request.body);
            console.log("POST task to DB:");
            console.log(request.body);
            var result = await task.save();
            response.status(201).send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    app.get("/task", async (request, response) => {
        try {

            var result = await TaskModel.find().exec();
            console.log("GET all from DB:");
            console.log(result);
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    app.delete("/task/:id", async (request, response) => {
        try {
            if (request.params.id.length < 5) {
                return;
            }
            var result = await TaskModel.deleteOne({_id: request.params.id}).exec();
            console.log("DELETE " + request.params.id + " from DB:");
            console.log(result);
            response.status(200).send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });
    app.get("/", async (request, response) => {
        response.status(200).send("node js mongo db API 2");
    });
}
