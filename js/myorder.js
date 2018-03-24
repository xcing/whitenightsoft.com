function send_serial_email( order_id ){
	$("#div_email_"+order_id).hide();
	$("#div_load_"+order_id).show();
	$.ajax({
		url:"/user/orderemail/id/"+order_id+"/", 
		type: "POST",
		data: {email: $("#order_email_"+order_id).val()},
		success: function(text) {
			$("#div_load_"+order_id).hide();
			$("#div_msg_"+order_id).show();
			$("#order_msg_"+order_id).html(text);
			if( $("#count_email_"+order_id) )
			{
				var count_email = parseInt( $("#count_email_inner_"+order_id).html());
				if( count_email == 0 )
				$("#count_email_"+order_id).show();
				$("#count_email_inner_"+order_id).html( count_email + 1 );
				$("#count_email_inner_"+order_id).click(function(){
					location.reload(true);
				});
				$("#list_email_"+order_id).hide();
			}
		}
	});
}