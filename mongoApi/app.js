require('dotenv').config();
const Express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");
var cors = require('cors');


var app = Express();

async function startServer() {
    try {
        await Mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            authSource: 'admin'
        }, function (error) {
            if (error) {
                console.log(error);
            } else {
                console.log('Connected to DB');
            }
        });

        app.use(cors());
        app.use(BodyParser.json());
        app.use(BodyParser.urlencoded({ extended: false }));
        app.use(function (req, res, next) {

            res.setHeader('x-Trigger', 'CORS');
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', '*');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', false);

            // Pass to next layer of middleware
            next();
        });

        const TaskModel = Mongoose.model("task", {
            name: String,
            days: Number
        });


        app.post("/task", async (request, response) => {
            try {
                if (request.body.length < 3) {
                    return;
                }
                var task = new TaskModel(request.body);
                var result = await task.save();
                response.status(204).send(result);
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
                var result = await TaskModel.deleteOne({_id:request.params.id}).exec();
                console.log("DELETE " + request.params.id + " from DB:");
                console.log(result);
                response.send(result);
            } catch (error) {
                response.status(500).send(error);
            }
        });



        app.get("/", async (request, response) => {
            response.send("node js mongo db API 2");
        });

        app.listen(8181, () => {
            console.log("Listening at :8181...");
        });
    }catch (e) {
        console.error(`Error in server : ${e.toString()}`);
        console.log(e)
    }
}

startServer().then();

module.exports = app;

