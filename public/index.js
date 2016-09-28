//--------------------------------------------
//
// VHS - Bplayer Video wrapper
//
//--------------------------------------------

'use strict';

//--------------------------------------------
//
// VHS Constructor
//
//--------------------------------------------

(function(){


	var VHS = (function(){

		var VHS = function(params){

			this.id = params.videoId || null;
			this.domId = document.getElementById(params.domId) || null;
			this.autoplay = params.autoplay || false;
			this.player = null;

			this.options = {};
			this.callbacks = {};
			this.src = 'https://cdn.gotraffic.net/projector/latest/bplayer.js';


			//--------------------------------------------
			// Binding
			//
			this.initializePlayer = this.initializePlayer.bind(this);
					

			this.init();
		};




		//--------------------------------------------
		//
		// VHS class
		//
		//--------------------------------------------
				
		VHS.prototype = {

			//--------------------------------------------
			// Initialization
			//
			init: function(){

				var self = this;

				//Make sure required params are set
				this.checkRequirements();



				//Add bplayer defaults + required params
				this.addOptions();

				//add projector script, with start method as callback
				if (!window.BPlayer){
					this.addScript(this.initializePlayer);
				}
				


				window.addEventListener('BPlayerLoaded', this.onLoad.bind(this));

			},


			//--------------------------------------------
			//
			// Make sure all required params are in
			//
			//--------------------------------------------
					
			checkRequirements: function(){
				//--------------------------------------------
				// Make sure user has entered ID
				//
						
				if (!this.id){
					console.warn('🐍 It seems you have not provided a video ID to VHS. Please specify ID.');
					return null;
				}


				//--------------------------------------------
				// Make sure there is a DOM node to inject video into
				//
				if	(!this.domId){
					console.warn('👻 It seems you have not provided a DOM node to inject the video into. Please specifiy domId.');
					return null;
				}

				//--------------------------------------------
				// Check to make sure if autoplay is passed in, it is in right type
				//
						
				if (this.autoplay === 'true' || this.autoplay === true){
					this.autoplay = true;
				}

				else{
					this.autoplay = false;
				}
			},



			//--------------------------------------------
			//
			// Setup bplayer defaults + user params
			//
			//--------------------------------------------
					
			addOptions: function(){
				var self = this;

				this.options = {
					module_ad_player: 'enabled',
					use_comscore: true,
					use_parsely: true,
					use_mediabong: true,
					module_conviva_insights: 'enabled',
					conviva_account: 'c3.Bloomberg',
					use_share_overlay: true,
					use_js_ads: true,
					id: this.id,
					htmlChildId: 'bbg-video-player-' + this.domId,
					idType: 'BMMR',
					serverUrl: 'https://www.bloomberg.com/api/embed',
					//HTML5 first...
					techOrder:['html5', 'flash'],
					log_debug: false,
					ui_controls_popout: false,
					ad_tag_gpt_preroll: true,
					ad_tag_gpt_midroll: true,
					ad_tag_sz_preroll: '1x7',
					ad_tag_sz_midroll: '1x7',
					ad_tag_sz_overlay: '1x7',
					ad_network_id_preroll: '5262',
					ad_network_id_midroll: '5262',
					ad_network_id_overlay: '5262',
					ad_tag_overlay: 'business/videooverlay',
					ads_vast_timeout: 10000,
					ads_playback_timeout: 10000,
					wmode: 'opaque',
					comscore_ns_site: 'bloomberg-stream',
					comscore_page_level_tags: {}, 
					ads_max_retries_preroll: 3,
					ads_max_retries_midroll: 3,
					vertical: 'business',  
					vertical: 'business', 
					ad_tag_overlay: 'business/videooverlay', 
					use_parsely: true, 'source': 'BBIZweb', 
					module_conviva_insights: 'enabled', 
					conviva_account: 'c3.Bloomberg', 
					zone: 'video', 'ad_tag_cust_params_preroll': '',
					ad_tag: '',
					ad_tag_midroll: '',
					offsite_embed: false,    
					ad_tag_midroll: '',
					ad_tag_cust_params_preroll: '',
					autoplay: this.autoplay
				};
			},


			//--------------------------------------------
			// Add script
			//
			addScript: function(callback){
				var self = this;
				var ready = false;
				var tag = document.createElement('script');
				var firstScriptTag = document.getElementsByTagName('script')[0];
				tag.src = this.src;

				
				tag.onload = tag.onreadystatechange = function(){

					if (!ready && (!this.readyState || this.readyState === 'complete')){
						ready = true;
						self.scriptLoaded = true;

						if (callback){
							callback();
						}
					}
				}

				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			},


			onLoad: function(event){
				this.playerVersion = event.detail.version;
			},


			//--------------------------------------------
			//
			// Initialize player
			//
			//--------------------------------------------

			initializePlayer: function(event){

				var self = this;


				BPlayer.create(this.domId, this.options, {
					onReady: function(){
						self.player = this;
					},

					onError: function(err){
						console.error(err);
					}
				});
			}
		};

		return VHS;

	})();


	//--------------------------------------------
	// Export to common.js or window, depending
	//
			
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
		module.exports = VHS;
	}

	else{
		window.VHS = VHS;
	}

})();
		
