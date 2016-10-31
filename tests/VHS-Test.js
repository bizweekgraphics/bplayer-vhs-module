//--------------------------------------------
//
// VHS - Bplayer Video wrapper
//
//--------------------------------------------

//--------------------------------------------
//
// VHS Constructor
//
//--------------------------------------------

(function(){


	var VHS = (function(){

		var VHS = function(params){

			this.id = params.videoId || null;
			this.domId = params.domId || null;

			this.live = params.live || null;
			this.domEl = document.getElementById(params.domId) || null;
			this.autoplay = params.autoplay || false;
			this.playOnTerminal = params.playOnTerminal || false;
			this.onReady = params.onReady || null;
			// this.onPlay = params.onPlay || null;
			// this.onPause = params.onPause || null;
			// this.onEnd = params.onEnd || null;
			this.player = null;
			this.loaded = true;
			this.options = {};
			this.src = '//cdn.gotraffic.net/projector/latest/bplayer.js';

			


			//--------------------------------------------
			// Binding
			//
			this.initializePlayer = this.initializePlayer.bind(this);
					

			

			//--------------------------------------------
			// Instance used for testing
			//
					
			this._instance = this

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


				if (window.isTerminal){

					if (this.playOnTerminal){
						this.start();
					}

					else{
						return null;
					}
				}

				else{
					this.start();
				}

			},


			//--------------------------------------------
			// Returns singleton instance
			//
			get: function(params){
				if (VHS._instance){
					return VHS._instance
				}

				VHS._instance = new VHS(params)

				return VHS._instance
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
					throw new Error('missing video ID')
				}


				//--------------------------------------------
				// Make sure there is a DOM node to inject video into
				//
				if	(!this.domId){
					console.warn('👻 It seems you have not provided a DOM node to inject the video into. Please specifiy domId.');
					throw new Error('missing dom ID')
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

				//--------------------------------------------
				// Same for play on terminal
				//
						
				if (this.playOnTerminal === 'true' || this.playOnTerminal === true){
					this.playOnTerminal = true;
				}

				else{
					this.playOnTerminal = false;
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
					live: this.live,
					id: this.id,
					htmlChildId: 'bbg-video-player-' + this.domId,
					idType: 'BMMR',
					serverUrl: '//www.bloomberg.com/api/embed',
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
					ads_vast_timeout: 10000,
					ads_playback_timeout: 10000,
					wmode: 'opaque',
					comscore_ns_site: 'bloomberg-stream',
					comscore_page_level_tags: {}, 
					ads_max_retries_preroll: 3,
					ads_max_retries_midroll: 3,
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


			//--------------------------------------------
			// Startup
			//
					
			start: function(){


				//add projector script, with start method as callback
				if (window.BPlayer){

					this.initializePlayer({bplayer: window.BPlayer});
				}

				else{
					window.addEventListener('BPlayerLoaded', this.onLoad.bind(this));
					this.addScript(this.initializePlayer);
				}
			},


			onLoad: function(event){
				this.playerVersion = event.detail.version;
				this.loaded = true;

				if (window.BPlayer){
					return null;
				}

			},


			//--------------------------------------------
			//
			// Initialize player
			//
			//--------------------------------------------

			initializePlayer: function(event){

				var self = this;


				self.bplayer = window.BPlayer.create(this.domEl, this.options, {
					onReady: function(){
						self.player = this;
						if (self.onReady){
							self.onReady(self.bplayer, self.player);
						}
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
		

