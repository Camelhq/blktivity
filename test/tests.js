
import chai from 'chai'
const expect = chai.expect
import nock from 'nock'
// import mockgoose from mockgoose
import chaiHttp from 'chai-http'
chai.use(chaiHttp)
import app from '../server/server.js'


describe('\'/api/signup\' Route', () => {
  it('this is a test for the signup page with empty payload', (done) => {
    chai.request(app)
      .post("/signup")
      .type("form")
      .send({})
      .end(function(err, res){
        expect(res).to.have.status(404)
        done()
      })
  })

  it('respond with enter in your email', (done) => {
    chai.request(app)
      .post("/signup")
      .type("form")
      .send({
        email: "test@test.com"
      })
      .end(function(err, res){
        expect(res).to.have.status(404)
        done()
      })
  })

  it('this is a test to a password', (done) => {
    chai.request(app)
      .post("/signup")
      .type("form")
      .send({
        password: "test@test.com"
      })
      .end(function(err, res){
        expect(res).to.have.status(404)
        done()
      })
  })

  it('add to the database', (done) => {
    chai.request(app)
      .post("/signup")
      .type("form")
      .send({
        email: "test@test.com",
        password: "test@test.com"
      })
      .end(function(err, res){
        expect(res).to.have.status(404)
        done()
      })

      //add user to database
    // const user = User.findOne({email: "test@test.com"})
    // expect(user).to.include({email: "test@test.com"})

    //delete that user from the database
  })
  it('have to fix ===>  this is a test for duplicated emails')
  // it('this is a test for duplicated emails', () => {
  //   chai.request(app)
  //     .post("/signup")
  //     .type("form")
  //     .send({
  //       email: "test@test.com",
  //       password: "test@test.com"
  //     })
  //
  //   //this the api again
  //     chai.request(app)
  //       .post("/signup")
  //       .type("form")
  //       .send({
  //         email: "test@test.com",
  //         password: "test@test.com"
  //       })
  //       .end()
  //
  // })
})
