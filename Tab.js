/*
 * Tab: a jquery plugn
 * author: skdream@126.com
*/
(function($,win){

	function Tab(options){

		var defaults = {
			el : "body",
			tabs : "li",
			panels : "div",
			eventType : "click",
			index : 0,
			auto : !1,
			interval : 5e3,
			animate : {
				show : "show",
				hide : "hide"
			},
			currentClass : "focus"
		}
		this.settings = $.extend({}, defaults, options);
		
		this.init();
	}
	
	Tab.prototype = {
	
		init:function(){
			this.el = $(this.settings.el);
			this.tabs = $(this.settings.tabs, this.el);
			this.panels = $(this.settings.panels, this.el);
			
			this.change(this.settings.index);
			this.bindEvents();
			this.settings.auto && this.auto();
			
		},
		
		change:function(index){
			var curClass = this.settings.currentClass;
			this.tabs.filter('.'+ curClass).removeClass(curClass),
			this.tabs.eq(index).addClass(curClass),
			this.panels.hide().eq(index)[this.settings.animate.show]();
			this.currentIndex = index;
			this.settings.callback && this.settings.callback.call(this,this);
			
		},
		
		bindEvents:function(){
			var self = this;
			this.tabs.bind(this.settings.eventType, $.proxy(self.eventHandler,this));
			this.settings.auto && this.tabs.bind('mouseenter',$.proxy(this.stop,this)) && this.tabs.bind('mouseleave', $.proxy(this.auto,this)),
			this.panels.bind('mouseenter',$.proxy(this.stop,this)) && this.panels.bind('mouseleave', $.proxy(this.auto,this));
		},
		
		eventHandler:function(e){
			var target = e.currentTarget;
			if( !$(target).hasClass(this.settings.currentClass) ){
				var current = 0;
				return this.tabs.each(function(index){
					return target === this?(current=index,!1):void 0;
				}),
				this.change(current),
				!1;
			}
		},
		
		auto:function(){
			this.timerId = setInterval($.proxy( this.autoHandler, this ),this.settings.interval);
		},
		
		autoHandler:function(){
			var index = this.currentIndex+1;
			(index >= this.tabs.size() ) ? index=0: index
			this.change(index);
		},
		
		stop:function(){
			this.timerId && clearInterval(this.timerId);
		},
		
		destroy:function(){
			this.stop();
			this.tabs.unbind(this.settings.eventType);
			this.panels.unbind();
		}
		
	}
	$.Tab = Tab;
	

})(jQuery, window)