# jquery.uploadPreview.js
> Preview images before uploading. Compatible with IE6 and independent on THML/CSS.
Demo page: [www.ashin.space/uploadPreview](http://www.ashin.space/uploadPreview)

## Usage

### THML
```html
<script src="http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js"></script>
<script type="text/javascript" src="jquery.uploadPreview.js"></script>
...
<input type="file" name="pithyUpload" class="previewImages" multiple="multiple">
```

### javascript
```javascript
$(function() {
	$('.previewImages').uploadPreview({
		trigger: 'change',
		onTypeError: function(name) {
			console.log('type error:', name);
		},
		onSuccess: function(img, name) {
			$(img).css({
				maxWidth: 300,
				maxHeight: 300
			})
			console.log('success:', name);
		},
		onComplete: function(imgs) {
			console.log('complete:');
			$('body').append(imgs);
		}
	})
});
```

## Settings

### Default settings
```javascript
{
	//properties
	type: ["gif", "jpeg", "jpg", "bmp", "png"],//available image types
	trigger: null,//null or 'change'
	//callbacks
	onTypeError: function (imgName) { },//fires when image type error
	//imgName refers to the file name that has wrong type
	onSuccess: function (img, imgName) { },//fires when every single image is completed
	//img refers to the image document element. you can control and amend it, such as changing it's styles.
	onComplete: function (imgs) { }//fires when all images is completed
	//imgs refers to the images the file input document element has been selected
}
```