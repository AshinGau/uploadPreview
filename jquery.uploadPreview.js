/**
 * jquery.uploadPreview.js - Preview images before uploading
 * http://www.ashin.space
 * 
 * Copyright (c) 2016 Ashin Gau
 * author		: Ashin Gau
 * date			: 2016/05/10
 * version		: 1.0.1 
 * license		: GPLv3
 * 
 */

; (function ($) {
	try {
		//Compatible with popular browsers
		window.createObjectURL = window.createObjectURL || window.URL.createObjectURL || window.webkitURL.createObjectURL;
	} catch (err) { }

	$.fn.uploadPreview = function (opts) {
		//default settings
		opts = $.extend({
			//properties
			type: ["gif", "jpeg", "jpg", "bmp", "png"],//available image types
			trigger: null,//null or 'change'
			//callbacks
			onTypeError: function (imgName) { },//fires when image type error
			onSuccess: function (img, imgName) { },//fires when every single image is completed
			onComplete: function (imgs) { }//fires when all images is completed
		}, opts || {});
		
		function get_preview_imgs(){
			var _self = this,
				$self = $(this);
			if (window.createObjectURL === undefined) {//Low version of the IE browser
				try {
					var $img = $('<img/>');
					$('body').append($img);
					$img.css({
						'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)'
					}).get(0).filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = _self.value;
					$img.detach();
					opts.onSuccess.call(_self, $img.get(0), _self.value);
					opts.onComplete.call(_self, $img.get(0));
				} catch (err) {
					opts.onTypeError.call(_self, _self.value);
					opts.onComplete.call(_self);
				}
			} else {
				var imgs = document.createDocumentFragment(),
					len = _self.files.length,
					typeReg = RegExp("\.(" + opts.type.join("|") + ")$", "i");
				for (var i = 0; i < len; i++) {
					var $img = $('<img/>');
					if (typeReg.test(_self.files[i].name)) {
						$img.attr('src', window.createObjectURL(_self.files[i]));
						imgs.appendChild($img.get(0));
						opts.onSuccess.call(_self, $img.get(0), _self.files[i].name);
					} else {
						opts.onTypeError.call(_self, _self.files[i].name);
					}
				}
				opts.onComplete.call(_self, imgs);
			}
		}
		
		if(opts.trigger)
			return this.change(function(){
				get_preview_imgs.call(this);
			});
		else{
			get_preview_imgs.call(this.get(0));
			return this;
		}
	};
})(jQuery);