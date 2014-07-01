

APP.Views = APP.Views || {};


APP.Views.Index = (function(window){
	
	
	function Index() {
		APP.View.call(this);
	}
	
	
	Index.prototype = Object.create(APP.View.prototype);
	Index.prototype.constructor = Index;
	
	
	Index.prototype.initElt = function() {
		this.$.page = $(document.getElementById('page-content'));
		
		this.canvas = document.getElementById('canvas');
		this.context = this.canvas.getContext('2d');
		
		this.$.canvas = $(this.canvas);
		
		this.urlImgs = ['img/kitten_1.jpg'];
		this.kittens = [];
		this.currentKitten = null;
		
	//	_initLoader.call(this);
		
		_initKittens.call(this);
	};
	
	
	Index.prototype.bindEvents = function() {
		this.resizeWindowProxy = $.proxy(_resize, this);
		APP.Main.$.window.on('resize', this.resizeWindowProxy);
		
	//	this.mouseMoveCanvasProxy = $.proxy(_moveMask, this);
	//	this.$.canvas.on('mousemove', this.mouseMoveCanvasProxy);
		
		_resize.call(this);
	};
	
	
	Index.prototype.unbindEvents = function() {
		
	};
	
	
	var _resize = function() {
		APP.Main.resize();
		
		this.canvas.width = APP.Main.windowW;
		this.canvas.height = APP.Main.windowH;
		
	//	this.drawCanvas();
	};
	
	
	var _initKittens = function() {
		for(var i=0; i<this.urlImgs.length; i++) {
			var kitten = new APP.Views.Kitten(i+1, this.urlImgs[i]);
			kitten.init();
			this.kittens.push(kitten);
		}
		
		this.currentKitten = this.kittens[0];
		
		this.currentKitten.load();
	};
	
	
	var _moveMask = function() {
		this.currentKitten.draw();
	};
	
	
	return new Index();
	
	
})(window);

