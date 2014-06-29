

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
		
		_initLoader.call(this);
	};
	
	
	Index.prototype.bindEvents = function() {
		this.resizeWindowProxy = $.proxy(_resize, this);
		APP.Main.$.window.on('resize', this.resizeWindowProxy);
		
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
	
	
	var _initLoader = function() {
		this.loaderImg = new APP.Loader();
		this.loaderImg.init();
		
		var urlImg = 'img/kitten_1.jpg';
		
		this.loaderImg.buildEvt(this.loaderImg.EVENT.ENDED, _drawCanvas.bind(this, urlImg));
		
		this.loaderImg.initLoad(['img/kitten_1.jpg']);
	};
	
	
	var _drawCanvas = function(urlImg) {
		console.log(urlImg);
		
		var img = new Image();
	//	imageObj.onload = function() {
	//	context.drawImage(imageObj, x, y);
	//	};
		img.src = urlImg;
		
		this.context.drawImage(img, 0, 0);
		
		this.context.globalCompositeOperation = 'destination-in';
		
		this.context.beginPath();
	//	this.context.arc(centerX, centerY, radius, 0, 2*Math.PI, false);
		this.context.arc(1180, 600, 100, 0, 2*Math.PI, false);
		this.context.fillStyle = '#0f9';
		this.context.fill();
	};
	
	
	return new Index();
	
	
})(window);

