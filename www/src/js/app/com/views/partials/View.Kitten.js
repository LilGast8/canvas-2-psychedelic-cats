

APP.Views = APP.Views || {};


APP.Views.Kitten = (function(window){
	
	
	function Kitten(id, urlImg) {
		APP.View.call(this);
		
		this.name = 'kitten-'+id;
		
		this.loaderImg = null;
		this.urlImg = urlImg;
		
		this.x = null;
		this.y = null;
	//	this.radius = null;
	}
	
	
	Kitten.prototype = Object.create(APP.View.prototype);
	Kitten.prototype.constructor = Kitten;
	
	
	Kitten.prototype.initElt = function() {
		this.$.page = $(document.getElementById('page-content'));
		
		this.canvas = APP.Views.Index.canvas;
		this.context = APP.Views.Index.context;
		
		this.$.canvas = $(this.canvas);
		
		this.x = this.canvas.width/2;
		this.y = this.canvas.height/2;
		
	//	_initLoader.call(this);
	};
	
	
	Kitten.prototype.bindEvents = function() {
	//	this.mouseMoveCanvasProxy = $.proxy(_moveMask, this);
	//	this.$.canvas.on('mousemove', this.mouseMoveCanvasProxy);
		
	//	_resize.call(this);
		this.resize();
	};
	
	
	Kitten.prototype.unbindEvents = function() {
		
	};
	
	
//	var _resize = function() {
	Kitten.prototype.resize = function() {
		APP.Main.resize();
		
		this.canvas.width = APP.Main.windowW;
		this.canvas.height = APP.Main.windowH;
	//	this.radius = this.canvas.width*this.canvas.height/15000;
		
	//	this.drawCanvas();
	};
	
	
	Kitten.prototype.load = function() {
		this.loaderImg = new APP.Loader();
		this.loaderImg.init();
		
	//	this.loaderImg.buildEvt(this.loaderImg.EVENT.ENDED, _bindMouseMouse.bind(this));
		this.loaderImg.buildEvt(this.loaderImg.EVENT.ENDED, _kittenLoaded.bind(this));
		
		this.loaderImg.initLoad([this.urlImg]);
	};
	
	
	Kitten.prototype.draw = function(e) {
//	var _draw = function(e) {
		console.log(this.name);
		
		var img = new Image();
		img.src = this.urlImg;
		
		this.context.globalCompositeOperation = 'source-over';
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		var sizeImg = _setSizeImage(img.width, img.height, this.canvas.width, this.canvas.height);
		this.context.drawImage(img, sizeImg.x, sizeImg.y, sizeImg.w, sizeImg.h);
		
		this.context.globalCompositeOperation = 'destination-in';
		
		this.context.beginPath();
	//	this.context.arc(e.x, e.y, 75, 0, 2*Math.PI, false);
		this.context.arc(this.x, this.y, 75, 0, 2*Math.PI, false);
		this.context.fillStyle = '#fff';
		this.context.fill();
		
		TweenLite.to(this, 1.5, {x:e.x, y:e.y, ease:Quart.easeOut});
	};
	
	
	var _kittenLoaded = function() {
		console.log('kitten loaded');
		
		this.dispatch(this.EVENT.LOADED);
	};
	
	
	var _bindMouseMouse = function() {
	//	this.mouseMoveCanvasProxy = $.proxy(_draw, this);
	//	this.$.canvas.on('mousemove', this.mouseMoveCanvasProxy);
	};
	
	
	var _setSizeImage = function(imgW, imgH, contW, contH) {
		var imgRatio = imgW/imgH;
		var canvasRatio = contW/contH;
		var sizeImg = {
			x : 0,
			y : 0,
			w : 0,
			h : 0
		};
		
		if(imgRatio < canvasRatio) {
			sizeImg.w = contW;
			sizeImg.h = sizeImg.w/imgRatio;
			sizeImg.x = 0;
			sizeImg.y = -(sizeImg.h-contH)/2;
			
		} else {
			sizeImg.h = contH;
			sizeImg.w = sizeImg.h*imgRatio;
			sizeImg.x = -(sizeImg.w-contW)/2;
			sizeImg.y = 0;
		}
		
		return sizeImg;
	};
	
	
	/*
	var _moveMask = function() {
		console.log('move mask');
		this.draw();
	};
	*/
	
	
	return Kitten;
	
	
})(window);

