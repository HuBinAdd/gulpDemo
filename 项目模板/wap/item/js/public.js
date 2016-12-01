//切换城市
var 
lyBtn={
	initialize:function(){//用于存放标签对象以及调用基础函数
		this.btn=$('.ly-btn'); 
		this.layer=$('.layer');
		this.content=$('.layer-ly',this.layer);
		this.time=$('.red',this.content);
		this.startTime=3;//开始时间
		this.initEvent();//为标签绑定事件函数 
	}, 
	initEvent:function(){ 
		this.btn.on('singleTap',this.bodyScroll.bind(this)); 
	},
	bodyScroll:function(e){
		this.setStartT();//初始化开始时间
	    this.layer.show();
	    this.interval();
	},
	setStartT:function(){
		this.time.html(this.startTime);
	},
	interval:function(){
		this.setStartT();
		if(!this.startTime){
			alert("要跳转了");
			return ;
		}
		this.clearIn = setTimeout(function(){
			this.startTime--;
	    	this.interval();
		}.bind(this),1000);
	}
},
banner={
	initialize:function(){//用于存放标签对象以及调用基础函数		
        var swiper = new Swiper('.banner-box', {
            pagination: '.banner-dian',
            paginationClickable: true
        });
	}
},
xheNav={
	initialize:function(){//用于存放标签对象以及调用基础函数
		this.navs=$('.xc-baod-tabs'); 
		this.nav=$('li',this.navs);
		this.startTime=3;//开始时间
		this.initEvent();//为标签绑定事件函数 
	}, 
	initEvent:function(){
		this.navs.width(this.nav.length * 1.87 + "rem");
		if(this.nav.length > 4){
			this.navs.addClass('animate');
		}
	}

},
rotJiaxiao={
	initialize:function(){
		this.btn = $('#get-jiax-n10');
		this.box = this.btn.prev('.jxlb-lists');
		this.list = $('.jxlb-list',this.box);
		this.dbClickHtml='查看更多驾校';
		this.isFClick = false;
		this.initEvent();//为标签绑定事件函数 
	}, 
	initEvent:function(){
		var that = this;
		this.btn.click(function(event) {
			if(!that.isFClick){
				that.box.height( 1.6 * that.list.length + 'rem');
				that.btn.html(that.dbClickHtml);
				that.isFClick = true;
			}else{
				alert('我跳转');
			}
		});
	}
},
jxRadio={
	initialize:function(){
		this.box = $('.jxxp-baom-list');
		this.input = $('input',this.box);
		this.form  = $('#jxxp-form1');
		this.dbClickHtml='查看更多驾校';
		this.isFClick = false;
		this.initEvent();//为标签绑定事件函数 
	}, 
	initEvent:function(){
		var bool = false;
		this.input.forEach(function(that){
			if($(that).prop('checked')){
				bool = true;
				$(that).parents('.jxxp-baom-list').addClass('active');
			}
		});
		this.setHeight(bool);
		this.input.on('change',this.clickBox.bind(this));
	},
	clickBox:function(e){
		var $that=$(e.currentTarget);
		this.box.removeClass('active');
		if($that.prop('checked')){
			$that.parents('.jxxp-baom-list').addClass('active');
		}
		this.setHeight(true);
	},
	setHeight:function(bool){		
		if(bool){
			this.form.show();
		};
	}
},
lockMorejj={
	initialize:function(){
		this.more = $('#lock_more');
		this.box = $('.jxxp-jiax-jj');
		this.showHtml='收起简介';
		this.hideHtml='查看全部';
		this.initEvent();//为标签绑定事件函数 
	}, 
	initEvent:function(){
		var that = this;
		this.more.click(function(event) {
			if(that.more.html() == that.showHtml){
				that.box.removeClass('active');
				that.more.html(that.hideHtml);
			}else{
				that.box.addClass('active');
				that.more.html(that.showHtml);
			}
		});
	}
},
jiaoxList={
	initialize:function(){
		this.box=$('.jxlb-lists');
		this.more=$('.jiaox-list-more');
		this.page = 1;//默认页码
		this.PAGE_NUMBER=5;//默认每页数据条数
		this.initEvent();

	}, 
	initEvent:function(){
		this.more.on('singleTap',this.clickMore.bind(this));

	},
	clickMore:function(){
		this.page++;
		// $.ajax({
		// 	url: '/path/to/file',
		// 	type: 'POST',
		// 	dataType: 'json',
		// 	data: {page: this.page,pageNumber:this.PAGE_NUMBER},
		// 	success:function(data, status, xhr){
		// 		this.setHtml(data);
		// 	},
		// 	error:function(data, status, xhr){

		// 	},
		// 	complete:function(data, status, xhr){

		// 	}
		// });
		
		this.setHtml([1,2,3,4,5]);
	},
	setHtml:function(datas){
		var html = [];
		datas.forEach(function(data){
			html.push('<li class="jxlb-list">');
				html.push('<div class="jxlb-list-img">');
					html.push('<img src="images/jl-list-1.jpg">');
				html.push('</div>');
				html.push('<div class="jxlb-list-header">');
					html.push('<span class="jxlb-header-span">'+data+'</span>');
					html.push('<div class="jxlb-xx-lists">');
					var i=1;
					while (i<6){
						html.push('<span class="jxlb-xx-list">');
							if (i < 4) {
								html.push('<i class="icon-jll-xx-1 iconfont"></i>');
							}else{
								html.push('<i class="icon-jll-xx iconfont"></i>');
							}
						html.push('</span>');
						i++;
					}
						
					html.push('</div>');
					html.push('<div class="jxlb-header-fr">');
						html.push('<span>点评(<span class="red">10</span>)</span>');
						html.push('<span class="pl15">留言(<span class="red">88</span>)</span>');
					html.push('</div>');
				html.push('</div>');
				html.push('<div class="money"><strong>4580</strong>元起（暑期大促中）</div>');
				html.push('<p class="confines">招生范围：东方高新科技园、文三路、城西</p>');
			html.push('</li>');
		});
		this.box.append(html.join(''));
	}	
},
jangcShow={
	initialize:function(){
		this.box=$('.cjwt-lists');
		this.list=$('li',this.box);
		this.initEvent();

	}, 
	initEvent:function(){
		this.list.on('singleTap',this.listClick.bind(this));
	},
	listClick:function(e){
		var $that=$(e.currentTarget);
		this.list.removeClass('active');
		$that.addClass('active');

	}
};