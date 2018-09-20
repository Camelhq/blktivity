
import { chai, assert } from 'chai'
import nock from 'nock'

import app from '../server/server.js'


describe('testing Url', () => {
  it('this is a test for the signup page', () => {
    chai.request(app)
      .get("/")
      // .end(function(err, res){
      //   expect(res).to.have.status(200)
      //   done()
      // })
  })
  it('this is a test to a test', () => {
    console.log("this is a test")
  })
})
