let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let faker = require('faker');

chai.use(chaiHttp);
let sampleTask = [];

describe('routes testing', () => {
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
                    res.should.have.status(500);
                    done();
                });
        });
    });
    /**
     * TEST GET ROUTES
     */
    describe('/Get Task routes', () => {
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
        it('should get all tasks', (done) => {
            chai.request(server)
                .get('/task')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    sampleTask = res.body;
                    done();
                });
        });
    });
    describe('Delete tasks request',()=> {
       it('should delete a task',(done)=> {
           chai.request(server)
               .delete('/task/' + sampleTask[0]._id)
               .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   done();
               });
       });
    });
});

