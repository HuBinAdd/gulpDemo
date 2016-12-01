//选择切换
var 
SetCookie={
	initialize:function(){
		this.name=$('#name');
		this.password=$('#password');
		this.btn=$('.login-btn');
		this.checkbox=$(':checkbox','.wjmi');
		this.setDefault();
		this.initEvent();

	}, 
	initEvent:function(){

		this.btn.on('click',this.submitForm.bind(this));
	},
	submitForm:function(e){
 		if (this.checkbox.prop("checked")) {
            $.cookie("SetCookie", "true", { expires: 7 }); //存储一个带7天期限的cookie
            $.cookie("name", this.name.val(), { expires: 7 });
            $.cookie("password", this.password.val(), { expires: 7 });
        }
        else {
            $.cookie("SetCookie", "false", { expire: -1 });
            $.cookie("name", "", { expires: -1 });
            $.cookie("password", "", { expires: -1 });
        }

	},
	setDefault:function(){
        if ($.cookie("SetCookie") == "true") {
	        this.checkbox.attr("checked", true);
	        this.name.val($.cookie("name"));
	        this.password.val($.cookie("password"));
        }
	}
},
loginSelect={
	initialize:function(){
		this.box=$('label','.wjmi');
		this.checkbox=$(':checkbox',this.box);
		this.setDefault();
		this.initEvent();
	}, 
	initEvent:function(){
		this.checkbox.on('change',this.checkboxChange.bind(this));
	},
	checkboxChange:function(e){
		var $that=$(e.currentTarget);
		if($that.prop('checked')){
			this.box.addClass('active');
		}else{
			this.box.removeClass('active');
		};
	},
	setDefault:function(){
		if(this.checkbox.prop('checked')){
			this.box.addClass('active');
		}else{
			this.box.removeClass('active');
		};

	}
},
jiaxrz = {
	initialize:function(){
		this.select=$('select');
		this.uploadify=$('#uploadify');
		this.uploadify1=$('#uploadify-1');
		this.uploadify2=$('#uploadify-2');
		this.layerBtn = $('.ck-gf');
		this.layerBox=$('.layer');
		this.layerBg=$('.layer-bg',this.layerBox);
		this.layerImage=$('.layer-content',this.layerBox);
		this.close=$('.icon-layer-close',this.layerBox);
		this.initEvent();
	}, 
	initEvent:function(){		
		this.select.selecter();
        this.uploadify.uploadPreview({ width: 405, height: 224, imgDiv: "#fileQueue"});
        this.uploadify1.uploadPreview({ width: 405, height: 224, imgDiv: "#fileQueue-1"});
        this.uploadify2.uploadPreview({ width: 405, height: 224, imgDiv: "#fileQueue-2"});
		this.layerBtn.on('click',this.layerBtnClick.bind(this));
		this.close.on('click',this.closeClick.bind(this));
		this.layerBg.on('click',this.closeClick.bind(this));
	},
	layerBtnClick:function(e){
		var $that=$(e.currentTarget),$box=this.layerImage,src = $that.attr('data-images');
		this.layerBox.show();
		var img = new Image();
		img.onload=function(){
			$box.append(img);
		};
		img.src = src;
	},
	closeClick:function(){
		this.layerBox.hide();
		this.layerImage.html('');
	}
};