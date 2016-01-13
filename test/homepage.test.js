process.env.PORT = 3001;

var request = require('supertest')
	, app = require('../app')
	, expect = require('chai').expect

var DatabaseCleaner = require('database-cleaner');
var databaseCleaner = new DatabaseCleaner('postgres')

describe('homepage', function(){
	it("welcomes the user to momentum", function(done){
		request(app).get('/')
		.expect(200)
		.expect(/Momentum Investments/)
		.expect(/Sign-Up/, done)
	})
})


describe('sign-up form', function(){

	it("sends error if they do not have matching passwords", function(done){
		request(app).post('/client/dash')
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
		request(app).post('/client/dash')
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
		request(app).post('/client/dash')
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

		request(app).post('/client/dash')
		.send({title: 'Momentum Investments', name: 'test3', company: 'test inc', email: "a40@a.com", phone: '444',  address: 'test', password:"adminadmin", pwConfirm:"adminadmin"})
		.expect(200)
		.end(function(err, res){
			if(err){
				return done(err);
			}
			expect(res.text).to.contain('Sign-out');
			done();
		})
	})
	
	databaseCleaner.clean(database, callback);
})

describe('sign-in form', function(){
	it("signs user in and sends them to dashboard", function(done){
		request(app).put('/client/dash')
		.send({title: 'Momentum Investments', email: 'test@t.com', password:'admintest'})
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