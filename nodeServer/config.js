
return module.exports = config = {
    mongo: {
        uri: process.env.MONGO_URL ||
        'mongodb://127.0.0.1/app',
        options: [useNewUrlParser: true]
    },
    port: process.env.port ||
    '8080'
};
