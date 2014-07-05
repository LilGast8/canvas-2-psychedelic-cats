

APP.Views = APP.Views || {};


APP.Views.Kitten = (function(window){
	
	
	function Kitten(id, urlImg) {
		APP.View.call(this);
		
		this.name = 'kitten-'+id;
		
		this.urlImg = urlImg;
		
		this.SPEED_COLORIZATION = 5;
	}
	
	
	Kitten.prototype = Object.create(APP.View.prototype);
	Kitten.prototype.constructor = Kitten;
	
	
	Kitten.prototype.init = function() {
		this.initElt();
	};
	
	
	Kitten.prototype.initElt = function() {
		this.loaderImg = new APP.Loader();
		this.loaderImg.buildEvt(this.loaderImg.EVENT.ENDED, _kittenLoaded.bind(this));
		
		this.canvas = APP.Views.Mask.canvas;
		this.context = APP.Views.Mask.context;
		this.tempCanvas = APP.Views.Mask.tempCanvas;
		this.tempContext = APP.Views.Mask.tempContext;
		
		this.img = null;
		this.imgData = null;
		
		this.counterColorization = 0;
	};
	
	
	Kitten.prototype.destroy = function() {
		this.loaderImg.destroyEvt(this.loaderImg.EVENT.ENDED, _kittenLoaded.bind(this));
		this.loaderImg = null;
		
		this.canvas = null;
		this.context = null;
		this.tempCanvas = null;
		this.tempCanvas = null;
		
		this.img = null;
		this.imgData = null;
		
		this.counterColorization = null;
	};
	
	
	Kitten.prototype.load = function() {
		this.loaderImg.init();
		this.loaderImg.initLoad([this.urlImg]);
	};
	
	
	Kitten.prototype.draw = function(x, y, radius, colorize) {
		this.context.globalCompositeOperation = 'source-over';
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		var sizeImg = _setSizeImage(this.img.width, this.img.height, this.canvas.width, this.canvas.height);
		
		if(!colorize) this.context.drawImage(this.img, sizeImg.x, sizeImg.y, sizeImg.w, sizeImg.h);
		else {
			if(this.counterColorization === 0) {
				this.tempContext.drawImage(this.img, sizeImg.x, sizeImg.y, sizeImg.w, sizeImg.h);
				this.imgData = this.tempContext.getImageData(0, 0, this.canvas.width, this.canvas.height);
				_colorize.call(this, true);
			} else {
				this.imgData = this.tempContext.getImageData(0, 0, this.canvas.width, this.canvas.height);
				_colorize.call(this, false);
			}
			
			this.counterColorization = this.counterColorization == this.SPEED_COLORIZATION ? this.counterColorization = 0 : this.counterColorization+1;
		}
		
		this.context.globalCompositeOperation = 'destination-in';
		
		this.context.beginPath();
		this.context.arc(x, y, radius, 0, 2*Math.PI, false);
		this.context.fillStyle = '#fff';
		this.context.fill();
	};
	
	
	var _kittenLoaded = function() {
		_initImg.call(this);
		
		this.dispatch(this.EVENT.LOADED);
	};
	
	
	var _initImg = function() {
		this.img = new Image();
		this.img.src = this.urlImg;
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
	
	
	var _colorize = function(generateColor) {
		var newImgData = this.imgData;
		
		if(generateColor) {
			var datas = this.imgData.data;
			
			var vR = Math.random();
			var vG = Math.random();
			var vB = Math.random();
			
			for(var i=0; i<datas.length; i+=4) {
				var r = datas[i];
				var g = datas[i+1];
				var b = datas[i+2];
				
			//	datas[i] = r*Math.random();
			//	datas[i+1] = g*Math.random();
			//	datas[i+2] = b*Math.random();
				
				datas[i] = r*vR;
				datas[i+1] = g*vG;
				datas[i+2] = b*vB;
				
			//	datas[i] = r*1;
			//	datas[i+1] = g*0;
			//	datas[i+2] = b*0.5;
			}
			
			this.tempContext.putImageData(newImgData, 0, 0);
		}
		else this.context.putImageData(newImgData, 0, 0);
	};
	
	
	return Kitten;
	
	
})(window);

