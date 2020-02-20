const Express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");

var app = Express();

Mongoose.connect("mongodb://192.168.99.100:27017/dockerDB");

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

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
      console.log("POST task to DB:");
      console.log(request.body);
      var result = await task.save();
      response.send();
  } catch (error) {
      response.status(500).send(error);
  }
});

app.get("/tasks", async (request, response) => {
    try {

        var result = await TaskModel.find().exec();
        console.log("GET all from DB:");
        console.log(result);
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

<<<<<<< Updated upstream
=======
app.post("/deletetask", async (request, response) => {
    try {
      if (request.body._id.length < 5) {
          return;
      }
        var result = await TaskModel.find({_id:request.body._id}).deleteOne().exec();
        console.log("DELETE " + request.body._id + " from DB:");
        console.log(result);
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});
>>>>>>> Stashed changes


app.get("/", async (request, response) => {
  response.send("node js mongo db API 2");
});

app.listen(8080, () => {
    console.log("Listening at :8080...");
});
