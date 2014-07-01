

APP.Views = APP.Views || {};


APP.Views.Kitten = (function(window){
	
	
	function Kitten(id, urlImg) {
		APP.View.call(this);
		
		this.name = 'kitten-'+id;
		
		this.loaderImg = null;
		this.urlImg = urlImg;
		
		this.x = null;
		this.y = null;
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
		
		_resize.call(this);
	};
	
	
	Kitten.prototype.unbindEvents = function() {
		
	};
	
	
	Kitten.prototype.load = function() {
		this.loaderImg = new APP.Loader();
		this.loaderImg.init();
		
		this.loaderImg.buildEvt(this.loaderImg.EVENT.ENDED, _bindMouseMouse.bind(this));
		
		this.loaderImg.initLoad([this.urlImg]);
	};
	
	
//	Kitten.prototype.draw = function(e) {
	var _draw = function(e) {
		var img = new Image();
		img.src = this.urlImg;
		
		this.context.globalCompositeOperation = 'source-over';
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		this.context.drawImage(img, 0, 0);
		
		this.context.globalCompositeOperation = 'destination-in';
		
		this.context.beginPath();
		this.context.arc(e.x, e.y, 100, 0, 2*Math.PI, false);
		this.context.fillStyle = '#0f9';
		this.context.fill();
	};
	
	
	var _resize = function() {
		APP.Main.resize();
		
		this.canvas.width = APP.Main.windowW;
		this.canvas.height = APP.Main.windowH;
		
	//	this.drawCanvas();
	};
	
	
	var _bindMouseMouse = function() {
		this.mouseMoveCanvasProxy = $.proxy(_draw, this);
		this.$.canvas.on('mousemove', this.mouseMoveCanvasProxy);
	};
	
	
	/*
	var _moveMask = function() {
		console.log('move mask');
		this.draw();
	};
	*/
	
	
	return Kitten;
	
	
})(window);

