const bodyParser = require('body-parser');
const User = require('../models').User;

const SecurityUtil = require('../utils').SecuritryUtils;

module.exports = function (app) {
    app.post("/signup", bodyParser.json(), async (req, res) => {
        if (req.body.login && req.body.password) {
            try {
                const user = new User({
                    login: req.body.login,
                    password: SecurityUtil.hashPassword(req.body.password)
                })
                await user.save();

                res.status(201).json(user)
            } catch (e) {
                res.status(500).end();
            }

        } else {
            res.status(400).end();
        }
    });

    app.get("/login/:login/:password", async (req, res) => {


        if (req.params.login && req.params.password) {
            try {
                const user = await User.findOne({login: req.params.login, password: SecurityUtil.hashPassword(req.params.password)})
                if (user){
                    res.status(200).json(user);
                } else {
                    res.status(409).end();
                }
            } catch (e) {
                res.status(500).end();
            }

        } else {
            res.status(400).end();
        }

    });

}
