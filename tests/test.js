//--------------------------------------------
//
// Tests
//
//--------------------------------------------
'use strict'

var expect = chai.expect

const VIDEOID = 'OD0g_11_Q3iXmzD0lmvFvQ'
const DOMID = 'video'

//--------------------------------------------
// Make sure missing requirements throw error
//
describe('Basic setup', function(){

	describe('Constructor', function(){
		
		//--------------------------------------------
		// Test video ID
		//
				
		it('should throw error if no videoId is passed in', function(){
			expect(function(){
				(new VHS({videoId: '', domId: DOMID}))
			}).to.throw(Error)
		})

		//--------------------------------------------
		// Test domID
		//
				
		it('should throw error if no domId is passed in', function(){
			expect(function(){
				(new VHS({videoId: VIDEOID, domId: ''}))
			}).to.throw(Error)
		})

		//--------------------------------------------
		// Neither
		//
		it('should throw error if both domId + videoId are not specified', function(){
			expect(function(){
				(new VHS({videoId: '', domId: ''}))
			}).to.throw(Error)
		})

		//--------------------------------------------
		// Dom Element exists
		//
		it('domId should correspond to existing domElement', function(){
			
			var v = new VHS({videoId: VIDEOID, domId: DOMID })

			expect(v.domEl).to.exist
		})

		//--------------------------------------------
		// Autoplay defaults to false
		//
		it('autoplay should default to false', function(){
			var v = new VHS({videoId: VIDEOID, domId: DOMID })

			expect(v.autoplay).to.be.false
		})
				
				
				
	})
})


// var v = new VHS({
// 		videoId: 'OD0g_11_Q3iXmzD0lmvFvQ',
// 		domId: 'video'
// 	})