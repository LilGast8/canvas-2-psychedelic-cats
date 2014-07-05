

APP.Views = APP.Views || {};


APP.Views.Mask = (function(window){
	
	
	function Mask() {
		APP.View.call(this);
		
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
		
		this.colorize = false;
		
		this.RADIUS_MIN = 75;
		this.RADIUS_MAX = 350;
		this.SPEED_ENLARGE = 5;
		this.SPEED_REDUCE = 15;
		
		this.isChange = false;
	}
	
	
	Mask.prototype = Object.create(APP.View.prototype);
	Mask.prototype.constructor = Mask;
	
	
	Mask.prototype.init = function() {
		this.initElt();
	};
	
	
	Mask.prototype.initElt = function() {
		this.$.page = $(document.getElementById('page-content'));
		
		this.canvas = document.getElementById('canvas');
		this.context = this.canvas.getContext('2d');
		this.tempCanvas = document.getElementById('tempCanvas');
		this.tempContext = this.tempCanvas.getContext('2d');
		
		this.$.canvas = $(this.canvas);
		
		_resize.call(this);
		
		this.prop = {
			x : this.canvas.width/2,
			y : this.canvas.height/2,
			r : this.RADIUS_MIN
		};
		
		this.isEnlarge = false;
		this.nbFrameSinceMouseDown = 0;
		
		_initKittens.call(this);
	};
	
	
	Mask.prototype.bindEvents = function() {
		this.resizeWindowProxy = $.proxy(_resize, this);
		APP.Main.$.window.on('resize', this.resizeWindowProxy);
		
		this.mouseMoveCanvasProxy = $.proxy(_moveMask, this);
		this.$.canvas.on('mousemove', this.mouseMoveCanvasProxy);
		
		this.clickCanvasProxy = $.proxy(_changeKitten, this);
		this.$.canvas.on('click', this.clickCanvasProxy);
		
		this.clickCanvasProxy = $.proxy(_enlargeRadius, this);
		this.$.canvas.on('mousedown', this.clickCanvasProxy);
		
		this.clickCanvasProxy = $.proxy(_reduceRadius, this);
		this.$.canvas.on('mouseup', this.clickCanvasProxy);
	};
	
	
	Mask.prototype.unbindEvents = function() {
		
	};
	
	
	Mask.prototype.getProp = function() {
		return this.prop;
	};
	
	
	var _resize = function() {
		APP.Main.resize();
		
		this.canvas.width = this.tempCanvas.width = APP.Main.windowW;
		this.canvas.height = this.tempCanvas.height = APP.Main.windowH;
	};
	
	
	var _initKittens = function() {
		for(var i=0; i<this.urlImgs.length; i++) {
			var kitten = new APP.Views.Kitten(i+1, this.urlImgs[i]);
			this.kittens.push(kitten);
		}
		
		this.currentKitten = this.kittens[this.idCurrentKitten];
		this.currentKitten.buildEvt(this.currentKitten.EVENT.LOADED, _initFirstKitten.bind(this));
		
		this.currentKitten.init();
		this.currentKitten.load();
	};
	
	
	var _initFirstKitten = function() {
		this.currentKitten.destroyEvt(this.currentKitten.EVENT.LOADED, _initFirstKitten.bind(this));
		
		this.bindEvents();
		
		TweenLite.ticker.addEventListener('tick', _draw, this);
	};
	
	
	var _draw = function() {
		APP.Main.stats.begin();
		
		_manageRadius.call(this);
		
		this.currentKitten.draw(this.prop.x, this.prop.y, this.prop.r, this.colorize);
		
		APP.Main.stats.end();
	};
	
	
	var _moveMask = function(e) {
		TweenLite.to(this.prop, 1.5, {x:e.x, y:e.y, ease:Quad.easeOut});
	};
	
	
	var _enlargeRadius = function() {
		this.isEnlarge = true;
	};
	
	
	var _reduceRadius = function() {
		this.isEnlarge = false;
	};
	
	
	var _manageRadius = function() {
		if(this.isEnlarge && this.prop.r == this.RADIUS_MAX) this.colorize = true;
		else if(this.isEnlarge) {
			this.colorize = true;
			this.nbFrameSinceMouseDown++;
			this.prop.r = this.prop.r+this.SPEED_ENLARGE < this.RADIUS_MAX ? this.prop.r+this.SPEED_ENLARGE : this.RADIUS_MAX;
		}
		else if(this.prop.r > this.RADIUS_MIN) {
			this.colorize = false;
			this.nbFrameSinceMouseDown = 0;
			this.prop.r = this.prop.r-this.SPEED_REDUCE < this.RADIUS_MIN ? this.RADIUS_MIN : this.prop.r-this.SPEED_REDUCE;
		}
	};
	
	
	var _changeKitten = function() {
		if(this.nbFrameSinceMouseDown > 8) return false;
		
		if(this.isChange) return false;
		else this.isChange = true;
		
		this.idCurrentKitten = this.idCurrentKitten+1 == this.kittens.length ? 0 : this.idCurrentKitten+1;
		var nextKitten = this.kittens[this.idCurrentKitten];
		
		nextKitten.buildEvt(nextKitten.EVENT.LOADED, _nextKittenLoaded.bind(this, nextKitten));
		nextKitten.init();
		nextKitten.load();
	};
	
	
	var _nextKittenLoaded = function(nextKitten) {
		nextKitten.destroyEvt(nextKitten.EVENT.LOADED, _nextKittenLoaded.bind(this, nextKitten));
		
		this.currentKitten.destroy();
		
		this.currentKitten = nextKitten;
		
		this.isChange = false;
	};
	
	
	return new Mask();
	
	
})(window);

