let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
const faker = require("faker");

chai.use(chaiHttp);

/*
  * Test the /POST route
  */
describe('/POST Task', () => {
    it('it should POST a task ', (done) => {
        chai.request(server)
            .post('/task')
            .send({
                name: faker.name.jobTitle(),
                days: faker.random.number(1, 27)
            })
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                done();
            });
    });
    it('it should not POST a task ', (done) => {
        chai.request(server)
            .post('/task')
            .send({
                name: faker.name.jobTitle(),
                days: faker.name.jobTitle()
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});

describe('/get Task routes', () => {
    it('should get a string with all /', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                console.log(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});
