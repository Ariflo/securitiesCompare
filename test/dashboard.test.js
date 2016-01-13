process.env.PORT = 3001;

var request = require('supertest')
	, app = require('../app')
	, expect = require('chai').expect
	, session = require('supertest-session')

beforeEach(function () {
  testSession = session(app);
})

describe('the dashboard', function(){

	xit("should allow the user to edit their profile", function(done){
		testSession.get('/test4/edit')
		.expect(200)
		.end(function(err, res){
			if(err){
				return done(err);
			}
			expect(res.text).to.contain('booh');
		})
	})

	xit("should allow the user to change settings", function(done){
		testSession.get('/test4/settings')
		.expect(200)
		.end(function(err, res){
			if(err){
				return done(err);
			}
			expect(res.text).to.contain('DELETE ACCOUNT');
		})
	})	

	xit("should allow the user to delete their profile and return to the homescreen", function(done){
		testSession.get('/test4/settings/delete')
		.expect(302)
		.expect(/Sign-Up/, done)
	})

	xit("should display three input feilds that return percentages", function(done){
		testSession.get('/test4/dash/search')
		.expect(200)
		.expect()

	})

})