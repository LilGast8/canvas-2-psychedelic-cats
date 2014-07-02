

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
		
		this.urlImgs = [
			'img/kitten_1.jpg',
			'img/kitten_2.jpg',
			'img/kitten_3.jpg',
			'img/kitten_4.jpg',
			'img/kitten_5.jpg',
			'img/kitten_6.jpg',
			'img/kitten_7.jpg',
			'img/kitten_8.jpg',
			'img/kitten_9.jpg',
			'img/kitten_10.jpg'
		];
		this.kittens = [];
		this.currentKitten = null;
		this.idCurrentKitten = 0;
		
	//	this.mouseX = null;
	//	this.mouseY = null;
		this.mouse = {
			x : null,
			y : null
		};
		
	//	_initLoader.call(this);
		
		_initKittens.call(this);
	};
	
	
	Index.prototype.bindEvents = function() {
		this.resizeWindowProxy = $.proxy(_resize, this);
		APP.Main.$.window.on('resize', this.resizeWindowProxy);
		
	//	this.mouseMoveCanvasProxy = $.proxy(_moveMask, this);
	//	this.$.canvas.on('mousemove', this.mouseMoveCanvasProxy);
		
		this.clickCanvasProxy = $.proxy(_changeKitten, this);
		this.$.canvas.on('click', this.clickCanvasProxy);
		
		_resize.call(this);
	};
	
	
	Index.prototype.unbindEvents = function() {
		
	};
	
	
	var _resize = function() {
		APP.Main.resize();
		
		this.canvas.width = APP.Main.windowW;
		this.canvas.height = APP.Main.windowH;
		
		this.currentKitten.resize();
	};
	
	
	var _initKittens = function() {
		for(var i=0; i<this.urlImgs.length; i++) {
			var kitten = new APP.Views.Kitten(i+1, this.urlImgs[i]);
			kitten.init();
			this.kittens.push(kitten);
		}
		
		this.currentKitten = this.kittens[this.idCurrentKitten];
		this.currentKitten.buildEvt(this.currentKitten.EVENT.LOADED, _bindMouseMouse.bind(this));
		this.currentKitten.load();
	};
	
	
	var _bindMouseMouse = function() {
		this.currentKitten.destroyEvt(this.currentKitten.EVENT.LOADED, _bindMouseMouse.bind(this));
		
		this.mouseMoveCanvasProxy = $.proxy(_moveMask, this);
		this.$.canvas.on('mousemove', this.mouseMoveCanvasProxy);
		
	//	TweenLite.ticker.addEventListener('tick', _moveMask, this);
	//	TweenLite.ticker.addEventListener('tick', this.moveMask, this);
	};
	
	
	var _moveMask = function(e) {
//	Index.prototype.moveMask = function(e) {
		this.mouse.x = e.x;
		this.mouse.y = e.y;
		this.currentKitten.draw(e);
	};
	
	
	var _changeKitten = function() {
		console.log('change');
		
		this.idCurrentKitten = this.idCurrentKitten+1 == this.kittens.length ? 0 : this.idCurrentKitten+1;
		var nextKitten = this.kittens[this.idCurrentKitten];
		
		nextKitten.buildEvt(nextKitten.EVENT.LOADED, _nextKittenLoaded.bind(this, nextKitten));
		nextKitten.load();
	};
	
	
	var _nextKittenLoaded = function(nextKitten) {
		nextKitten.destroyEvt(nextKitten.EVENT.LOADED, _nextKittenLoaded.bind(this, nextKitten));
		
		this.currentKitten = nextKitten;
		this.currentKitten.draw(this.mouse);
	};
	
	
	return new Index();
	
	
})(window);

