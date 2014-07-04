

APP.Views = APP.Views || {};


APP.Views.Index = (function(window){
	
	
	function Index() {
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
		
		this.isChange = false;
	}
	
	
	Index.prototype = Object.create(APP.View.prototype);
	Index.prototype.constructor = Index;
	
	
	Index.prototype.init = function() {
		this.initElt();
	};
	
	
	Index.prototype.initElt = function() {
		this.$.page = $(document.getElementById('page-content'));
		
		this.canvas = document.getElementById('canvas');
		this.context = this.canvas.getContext('2d');
		
		this.$.canvas = $(this.canvas);
		
		_resize.call(this);
		
		this.mouse = {
			x : this.canvas.width/2,
			y : this.canvas.height/2
		};
		
		_initKittens.call(this);
	};
	
	
	Index.prototype.bindEvents = function() {
		this.resizeWindowProxy = $.proxy(_resize, this);
		APP.Main.$.window.on('resize', this.resizeWindowProxy);
		
		this.mouseMoveCanvasProxy = $.proxy(_moveMask, this);
		this.$.canvas.on('mousemove', this.mouseMoveCanvasProxy);
		
		this.clickCanvasProxy = $.proxy(_changeKitten, this);
		this.$.canvas.on('click', this.clickCanvasProxy);
	};
	
	
	Index.prototype.unbindEvents = function() {
		
	};
	
	
	Index.prototype.getMousePos = function() {
		return this.mouse;
	};
	
	
	var _resize = function() {
		APP.Main.resize();
		
		this.canvas.width = APP.Main.windowW;
		this.canvas.height = APP.Main.windowH;
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
		console.log('init first kitten');
		
		this.currentKitten.destroyEvt(this.currentKitten.EVENT.LOADED, _initFirstKitten.bind(this));
		
		this.bindEvents();
		
		TweenLite.ticker.addEventListener('tick', _draw, this);
	};
	
	
	var _draw = function() {
		this.currentKitten.draw();
	};
	
	
	var _moveMask = function(e) {
		TweenLite.to(this.mouse, 1.5, {x:e.x, y:e.y, ease:Quad.easeOut});
	};
	
	
	var _changeKitten = function() {
		console.log('change');
		
	//	if(this.isChange) {
	//		console.log('STOP', this.isChange);
	//		return false;
	//	}
	//	else this.isChange = true;
		
		this.idCurrentKitten = this.idCurrentKitten+1 == this.kittens.length ? 0 : this.idCurrentKitten+1;
		var nextKitten = this.kittens[this.idCurrentKitten];
		
		nextKitten.buildEvt(nextKitten.EVENT.LOADED, _nextKittenLoaded.bind(this, nextKitten));
		nextKitten.init();
		nextKitten.load();
	};
	
	
	var _nextKittenLoaded = function(nextKitten) {
		console.log('next kitten loaded');
		
		nextKitten.destroyEvt(nextKitten.EVENT.LOADED, _nextKittenLoaded.bind(this, nextKitten));
		
		this.currentKitten.destroy();
		
		this.currentKitten = nextKitten;
	};
	
	
	return new Index();
	
	
})(window);

