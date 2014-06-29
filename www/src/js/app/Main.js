

APP.Main = {};


(function(window) {
	
	
	function Main() {
		this.$ = {};
		
		this.windowW = null;
		this.windowH = null;
	}
	
	
	Main.prototype = {
		
		onReady : function() {
			this.$.window = $(window);
			this.$.body = $(document.body);
			this.$.mainContainer = $(document.getElementById('main-container'));
			this.$.pageContainer = $(document.getElementById('page-container'));
			this.$.loader = $(document.getElementById('loader'));
			
			this.windowLoadProxy = $.proxy(_windowLoad, this);
			this.$.window.on('load', this.windowLoadProxy);
		},
		
		
		resize : function() {
			this.windowW = this.$.window.width();
			this.windowH = this.$.window.height();
		}
		
	};
	
	
	var _windowLoad = function() {
		this.$.window.off('load', this.windowLoadProxy);
		this.windowLoadProxy = null;
		
		this.$.mainContainer[0].className = '';
		
		_init.call(this);
	};
	
	
	var _init = function() {
		APP.Config.init();
		APP.Views.Index.init();
		
		_bindEvents.call(this);
	};
	
	
	var _bindEvents = function() {
		
	};
	
	
	APP.Main = new Main();
	
	
})(window);


$(APP.Main.onReady.bind(APP.Main));

