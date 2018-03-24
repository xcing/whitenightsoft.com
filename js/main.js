var cart_control = {
	add_product:function(product_id,amount,game_id){
		var post_var = {
			pid:product_id,
			count:amount,
			gid:game_id
		}
		$.ajax({
			url: BASEURL+"product/addtocart",
			type: "POST",
			data: post_var,
			dataType: "JSON"
		}).done(cart_control.ajax_done);
	},
	ajax_done:function(result){
		if(result['error_msg'] != null){
			return alert(result['error_msg']);
		}
		if(result['cart_count'] != null)
			cart_control.set_cart(result['cart_count']);
	},
	set_cart:function(item_count){
		$('#cart_count').html(item_count);
		if(parseInt(item_count)>0)
			$('#goto_checkout').show();
		else $('#goto_checkout').hide();
	}
}