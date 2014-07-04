

APP.Views = APP.Views || {};


APP.Views.Kitten = (function(window){
	
	
	function Kitten(id, urlImg) {
		APP.View.call(this);
		
		this.name = 'kitten-'+id;
		
		this.urlImg = urlImg;
	}
	
	
	Kitten.prototype = Object.create(APP.View.prototype);
	Kitten.prototype.constructor = Kitten;
	
	
	Kitten.prototype.init = function() {
		this.initElt();
	};
	
	
	Kitten.prototype.initElt = function() {
		console.log('init elt :', this.name);
		
		this.loaderImg = new APP.Loader();
		this.loaderImg.buildEvt(this.loaderImg.EVENT.ENDED, _kittenLoaded.bind(this));
		
		this.canvas = APP.Views.Index.canvas;
		this.context = APP.Views.Index.context;
		
		this.$.canvas = $(this.canvas);
		
		this.mouse = {};
	};
	
	
	Kitten.prototype.bindEvents = function() {
		console.log('bind evt :', this.name);
	};
	
	
	Kitten.prototype.unbindEvents = function() {
		console.log('unbind evt :', this.name);
	};
	
	
	Kitten.prototype.destroy = function() {
		console.log('destroy kitten :', this.name);
		
	//	this.unbindEvents();
		
		this.loaderImg.destroyEvt(this.loaderImg.EVENT.ENDED, _kittenLoaded.bind(this));
		this.loaderImg = null;
		
		this.canvas = null;
		this.context = null;
		
		this.$ = {};
		
		this.mouse = {};
	};
	
	
	Kitten.prototype.load = function() {
		this.loaderImg.init();
		this.loaderImg.initLoad([this.urlImg]);
	};
	
	
//	var _draw = function() {
	Kitten.prototype.draw = function() {
		this.mouse = APP.Views.Index.getMousePos();
		
		var img = new Image();
		img.src = this.urlImg;
		
		this.context.globalCompositeOperation = 'source-over';
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		var sizeImg = _setSizeImage(img.width, img.height, this.canvas.width, this.canvas.height);
		this.context.drawImage(img, sizeImg.x, sizeImg.y, sizeImg.w, sizeImg.h);
		
		this.context.globalCompositeOperation = 'destination-in';
		
		this.context.beginPath();
		this.context.arc(this.mouse.x, this.mouse.y, 75, 0, 2*Math.PI, false);
		this.context.fillStyle = '#fff';
		this.context.fill();
	};
	
	
	var _kittenLoaded = function() {
		console.log('kitten loaded :', this.name);
		
		this.dispatch(this.EVENT.LOADED);
		
	//	this.bindEvents();
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
	
	
	return Kitten;
	
	
})(window);

