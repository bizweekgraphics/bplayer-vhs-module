//--------------------------------------------
//
// Tests
//
//--------------------------------------------
'use strict'

var expect = chai.expect

const VIDEOID = 'OD0g_11_Q3iXmzD0lmvFvQ'
const DOMID = 'video'
const SRC = '//cdn.gotraffic.net/projector/latest/bplayer.js'




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
			
			const v = new VHS({videoId: VIDEOID, domId: DOMID })

			expect(v.domEl).to.exist
		})

		it('should have autoplay set to false if autoplay parameter is not passed in', function(){
			const v = new VHS({videoId: VIDEOID, domId: DOMID})
			expect(v.autoplay).to.be.false
		})	
	})
})

//--------------------------------------------
// Autoplay methods
//
			
describe('Async loading', function(){

	const v = new VHS({videoId: VIDEOID, domId: DOMID})
	
	function Video(){
		if (Video._instance){
			return Video._instance
		}

		Video._instance = v
	}

	console.log("XXX", Video())


	describe('External script', function(){


		it('Script should be able to load', function(done){

			var tag = document.createElement('script')
			var firstScriptTag = document.getElementsByTagName('script')[0]
			tag.src = SRC

			tag.onload = tag.onreadystatechange = function(){
				done()
			}
			tag.onerror = function(err){
				console.log('Error loading script', err)
			}

			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
		})		
	})
})

