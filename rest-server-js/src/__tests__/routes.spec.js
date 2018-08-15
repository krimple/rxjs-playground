const routes = require('../routes');
const express = require('express');
const request = require('supertest');
const bodyParser = require('body-parser');

describe('test REST endpoints', () => {
 let app;

 beforeEach(() => {
  app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }))
  const appRoutes = routes();
  app.use(appRoutes);
 });

 it('should fetch all chotchkies', (done) => {
   request(app)
   .get('/chotchkies')
   .set('Accept', /json/)
   .expect('Content-Type', /json/)
   .expect(200, (err, response) => {
     expect(response.body.length).toBe(2);
     done();
   });
 });

 it('should fetch one chotchkie', (done) => {
  request(app)
  .get('/chotchkies/2')
  .set('Accept', /json/)
  .expect('Content-Type', /json/)
  .expect(200, (err, response) => {
    expect(response.body.id).toBe(2);
    expect(response.body.name).toBeDefined();
    expect(response.body.description).toBeDefined();
    expect(response.body.quantityOnHand).toBeDefined();
    expect(response.body.price).toBeDefined();
    done();
  });
 })

});
