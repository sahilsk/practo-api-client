var 
	expect = require('expect.js')
,	request = require('request')
,	Practo = require("../src/practo")
;

describe('#Ednpoints ', function() {
	var pClient = null;

	before(function(done){
		this.timeout(0);
		pClient = new Practo({
						client_id: process.env['CLIENT_ID'],
						token:  process.env['API_KEY'],
						timeout: 55000
					});
		pClient.ping( function(err, res){
			if(err) throw new Error(err + " : Perhaps, credentials are not set or incorrent");
			console.log('Testing endpoint: ', res);
			done();
		})
	});

	describe("#Doctors ", function(){
		describe('> List All Doctors', function () {
			it('should return list of doctors', function (done) {
				pClient.list_doctors( {page:1}, function(err, res){
					expect(err).to.be.null;
					expect(typeof res.body).to.be('object');
					expect(typeof res.body['doctors']).to.be('object');
					done();
				});
			});
		});

		describe('> Fetch doctor profile ', function () {
			it('should fetch doctor detail', function (done) {
				pClient.get_doctor( {id:434255}, function(err, res){
					expect(err).to.be.null;
					expect(typeof res.body).to.be('object');
					done();
				});
			});
		});	
	})

	describe("#Practices ", function(){
		describe('> List All Practices', function () {
			it('should return list of practices', function (done) {
				pClient.list_practices( {page:1}, function(err, res){
					expect(err).to.be.null;
					expect(typeof res.body).to.be('object');
					expect(typeof res.body['practices']).to.be('object');
					done();
				});
			});
		});

		describe('> Fetch doctor profile ', function () {
			it('should fetch practice detail', function (done) {
				pClient.get_practice( {id:862800}, function(err, res){
					expect(err).to.be.null;
					expect(typeof res.body).to.be('object');
					done();
				});
			});
		});	
	})

	describe("#Search ", function(){
		describe('> show search result', function () {
			it('should return search result', function (done) {
				pClient.search( {city:'bangalore'}, function(err, res){
					expect(err).to.be.null;
					expect(typeof res.body ).to.be('object');
					done();
				});
			});
		});
	})


	describe("#Search Meta ", function(){
		describe('> show cities ', function () {
			this.timeout(0);
			it('should return search result', function (done) {
				pClient.list_cities( function(err, res){
					//console.log(res)
					expect(err).to.be.null;
					expect(typeof res.body ).to.be('object');
					expect(typeof res.body['cities'] ).to.be('object');
					done();
				});
			});
		});
		describe('> Localities, specialties ', function () {
			it('should return list of localities, specialties for a city', function (done) {
				pClient.get_city_report( {id: 1}, function(err, res){
					expect(err).to.be.null;
					expect(typeof res.body ).to.be('object');
					done();
				});
			});
		});
	})

});