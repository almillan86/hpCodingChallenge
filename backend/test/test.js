let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');

//Assertion style
chai.should();

chai.use(chaiHttp);

describe ('Test API', () =>
{
    describe ('POST /request with a real singer', () => {
        it('It should POST an artist name and receive a list with at least one album', (done) =>
        {
            const postData = {
                artistName: 'David Bowie'
            };

            chai.request(server)
                .post('/request')
                .send(postData)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.should.be.a('object');
                    response.body.should.have.property('resultCount').above(0);
                    response.body.should.have.property('results').length.above(0);
                    done();
                });
        });
    });

    describe ('POST /request with a fake singer', () => {
        it('It should POST an artist name and receive a list empty of albums', (done) =>
        {
            const postData = {
                artistName: 'Non valid singer name'
            };

            chai.request(server)
                .post('/request')
                .send(postData)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.should.be.a('object');
                    response.body.should.have.property('resultCount').eq(0);
                    done();
                });
        });
    });

    describe ('POST /request with a non valid post format', () => {
        it('It should POST a non valid data and receive an error', (done) =>
        {
            const postData = {
                /* Request has a wrong format */
            };

            chai.request(server)
                .post('/request')
                .send(postData)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq('Non valid request');
                });
                done();
        });
    });
});