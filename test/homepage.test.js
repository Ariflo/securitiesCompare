var request = require('supertest')
	, app = require('../app')

describe('homepage', function(){
	it("welcomes the user to momentum", function(done){
		request(app).get('/')
		.expect(200)
		.expect(/Momentum Investments/)
		.expect(/Sign-Up/, done)
	})
})

describe('Sign-Up form', function(){
	it("welcomes the user to momentum", function(done){
		request(app).get('/')
		.expect(200)
		.expect(/Momentum Investments/)
		.expect(/Sign-Up/, done)
	})
})	 