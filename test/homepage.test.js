process.env.PORT = 3001;

var request = require('supertest')
	, app = require('../app')
	, expect = require('chai').expect
	, session = require('supertest-session')

var knex = require ("../db/knex");

beforeEach(function () {
  testSession = session(app);
})

describe('homepage', function(){
	it("welcomes the user to momentum", function(done){
		testSession.get('/')
		.expect(200)
		.expect(/Momentum Investments/)
		.expect(/Sign-Up/, done)
	})
})


describe('sign-up form', function(){

	it("sends error if they do not have matching passwords", function(done){
		testSession.post('/client/dash')
		.send({title: 'Momentum Investments', name: 'test2', company: 'test inc', email: "a2@a.com", phone: '444',  address: 'test', password:"inadmin", pwConfirm:"adminadmin"})
		.expect(200)
		.end(function(err, res){
			if(err){
				return done(err);
			}
			expect(res.text).to.contain('match');
			done();
		})
	})

	it("sends error if password is not long enough", function(done){
		testSession.post('/client/dash')
		.send({title: 'Momentum Investments', name: 'test2', company: 'test inc', email: "a2@a.com", phone: '444',  address: 'test', password:"admin", pwConfirm:"admin"})
		.expect(200)
		.end(function(err, res){
			if(err){
				return done(err);
			}
			expect(res.text).to.contain('8');
			done();
		})
	})	

	it("sends error if already in database", function(done){
		testSession.post('/client/dash')
		.send({title: 'Momentum Investments', name: 'test2', company: 'test inc', email: "a2@a.com", phone: '444',  address: 'test', password:"adminadmin", pwConfirm:"adminadmin"})
		.expect(200)
		.end(function(err, res){
			if(err){
				return done(err);
			}
			expect(res.text).to.contain('Already');
			done();
		})
	})


	it("signs user up and sends them to dashboard", function(done){

		testSession.post('/client/dash')
		.send({title: 'Momentum Investments', name: 'test4', company: 'test inc', email: "a11@a.com", phone: '444',  address: 'test', password:"adminadmin", pwConfirm:"adminadmin"})
		.expect(200)
		.end(function(err, res){
			if(err){
				return done(err);
			}
			expect(res.text).to.contain('Sign-out')
			done();

		})
	})

	after(function(){

		knex('clients').del().where({email: "a11@a.com"}).then(function(){
			
		});
		
	})
})

describe('sign-in form', function(){
	it("signs user in and sends them to dashboard", function(done){
		testSession.put('/client/dash')
		.send({title: 'Momentum Investments', email: 'a7@a.com', password:'adminadmin'})
		.expect(200)
		.end(function(err, res){
			if(err){
				return done(err);
			}
			expect(res.text).to.contain('Sign-out');
			done();
		})
	})
})	 
