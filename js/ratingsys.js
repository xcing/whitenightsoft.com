var cm_star = {
	is_click:false,
	mouseover:function(){
		if(cm_star.is_click)
			return ;
		var star = $(this).attr('rel');
		cm_star.set_star(star);
	},
	mouseout:function(){
		if(cm_star.is_click)
			return ;
		$('.cm_star').removeClass('cm_star-full');
	},
	click:function(){
		var star = $(this).attr('rel');
		cm_star.is_click = true;
		cm_star.set_star(star);
		$('#commentscore').val(star);
	},
	set_star:function(star){
		$('.cm_star').each(function(i,el){
			if(parseInt($(el).attr('rel')) <= parseInt(star))
				$(el).addClass('cm_star-full');
			else $(el).removeClass('cm_star-full');
		})
	},
	init:function(){
	   $(".cm_star").click(cm_star.click);
	   $(".cm_star").mouseover(cm_star.mouseover);
	   $(".cm_star").mouseout(cm_star.mouseout);
	}
}