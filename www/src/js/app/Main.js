

APP.Main = (function(window) {
	
	
	function Main() {
		this.$ = {};
		
		this.windowW = null;
		this.windowH = null;
	}
	
	
	Main.prototype.onReady = function() {
		this.$.window = $(window);
		this.$.body = $(document.body);
		this.$.mainContainer = $(document.getElementById('main-container'));
		this.$.pageContainer = $(document.getElementById('page-container'));
		this.$.loader = $(document.getElementById('loader'));
		
		this.windowLoadProxy = $.proxy(_windowLoad, this);
		this.$.window.on('load', this.windowLoadProxy);
	};
	
	
	Main.prototype.resize = function() {
		this.windowW = this.$.window.width();
		this.windowH = this.$.window.height();
	};
	
	
	var _windowLoad = function() {
		this.$.window.off('load', this.windowLoadProxy);
		this.windowLoadProxy = null;
		
		this.$.mainContainer[0].className = '';
		
		_init.call(this);
	};
	
	
	var _init = function() {
		_initStats.call(this);
		
		APP.Config.init();
		APP.Views.Mask.init();
		
	//	_bindEvents.call(this);
	};
	
	
	var _bindEvents = function() {
		
	};
	
	
	var _initStats = function() {
		this.stats = new Stats();
		this.stats.setMode(0);
		
		this.stats.domElement.style.position = 'absolute';
		this.stats.domElement.style.right = '0px';
		this.stats.domElement.style.bottom = '0px';
		this.stats.domElement.style.zIndex = 88;
		
		document.body.appendChild(this.stats.domElement);
	};
	
	
	return new Main();
	
	
})(window);


$(APP.Main.onReady.bind(APP.Main));

