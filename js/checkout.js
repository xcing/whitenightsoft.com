var checkout={
	product:[],
	shipping:{},
	shipping_price:{},
	address:{},
	shipping_type_dic:{'paper':'parcel'},
	discount_base:0,
	add_product:function(id,price,save,weight,type,freeshippingcount,discount){
		checkout.product.push({
			"id":id,
			"price":price,
			"save":save,
			"weight":weight,
			"type":type,
			"freeshippingcount":freeshippingcount,
			"discount":discount
		});
	},
	add_shipping:function(name,need_address,price){
		checkout.shipping[name] = {
			'need_address':need_address,
			'price':price
		};
	},
	add_address:function(id,is_thai){
		checkout.address[id] = is_thai;
	},
	add_shipping_price:function(type,weight,price,price_inter){
		if(checkout.shipping_price[type] == null)
			checkout.shipping_price[type] = [];
		checkout.shipping_price[type].push({
			'weight':weight,
			'price':price,
			'price_inter':price_inter
		});
	},
	get_product:function(id){
		for(var i=0;i<checkout.product.length; i++){
			if(id == checkout.product[i].id)
				return checkout.product[i];
		}
		return false;
	},
	get_shipping_price:function(type,weight,is_thai){
		price = 9999;
		b_get_price = false;
		weight_rate = null;
		if(checkout.shipping_price[type] == null)
			return 9999;
		for(var i=0;i<checkout.shipping_price[type].length;i++){
			var shipping_price = checkout.shipping_price[type][i];
			new_price = is_thai?shipping_price.price:shipping_price.price_inter;
			if(new_price == null)
				continue;
			if((weight_rate == null || shipping_price.weight < weight_rate) && shipping_price.weight >= weight){
				price = new_price;
				weight_rate = shipping_price.weight;
				b_get_price = true;
			}
		}
		if( !b_get_price && checkout.shipping_type_dic[type] != null )
			price = checkout.get_shipping_price(shipping_type_dic[type],weight,is_thai);
		return price;
	},
	shipping_change:function(){
		$('#ship_address').hide();
		$("input.shipmethod:checked").each(function(i,el){
			var value = $(el).val();
			if(checkout.shipping[value].need_address)
				$('#ship_address').show();
			var id = $(el).attr('name').replace("shipping_method_","");
			if(value == "self"){
				$("#shipping_branch_"+id).show();
			}else{
				$("#shipping_branch_"+id).hide();
			}
		});
		checkout.cal_price();
	},
	address_change:function(id){
		$(".shippingaddress").hide();
		$('#shippingaddress_'+id).show();
	},
	coupon_keyup:function(){
		if($('#coupon').val()!=""){
			$('#coupon_submit').show();
		}else $('#coupon_submit').hide();
	},
	cal_price:function(){
		is_thai = false;
		var is_thai = checkout.address[$('#shippingaddress_id').val()];
		shipping_check = {};
		price_shipping = 0;
		weight_total = 0;
		discount_total = checkout.discount_base;
		type_shipping = "paper";
		b_ems = false;
		b_shipping_complete = true;
		$("input.shipmethod:checked").each(function(i,el){
			var id = $(el).attr('name').replace("shipping_method_","");
			shipping_check[id] = true;
			var value = $(el).val();
			if(value=="ems"||value=="my_order_ems"){
				var product = checkout.get_product(id);
				b_ems = true;
				if(!isNaN(parseInt($('#amount_'+id).val()))) 
					amount = $('#amount_'+id).val();
				else amount = 1;
				if(product.type == "parcel")
					type_shipping = "parcel";
				weight_total += Math.max(product.weight,0)*Math.max(amount-product.freeshippingcount,0);
			}else{
				price_shipping += checkout.shipping[value].price;
			}
		});
		if(b_ems && weight_total > 0){
			price_shipping += checkout.get_shipping_price(type_shipping,weight_total,is_thai);
			price_shipping += checkout.shipping.ems.price;
		}
                
		price_product = 0;
		for(ii = 0;ii<checkout.product.length;ii++){
			var product = checkout.product[ii];
			var amount = 1;
			if(!isNaN(parseInt($('#amount_'+product.id).val())))
				amount = parseInt($('#amount_'+product.id).val());
			price_amount = product.price * amount;
			price_save = product.save * amount;
			price_discount = product.discount * amount;
			
			price_product += price_amount;
			discount_total += price_discount;
			if(price_save <= 0)
				price_save = '-';
			else price_save = numberformat(price_save,2);
			$('#save_'+product.id).html(price_save);
			$('#amountprice_'+product.id).html(numberformat(price_amount,2));
			if(!shipping_check[product.id])
				b_shipping_complete = false;
		}
                check_free_shipping = price_product-discount_total;
                if (check_free_shipping > 3000) price_shipping = 0;
		if( price_shipping == 0 ){
			if(b_shipping_complete)
				$("#delivery_cost").html("<font color='red'>Free!!!</span>");
			else $("#delivery_cost").html("-");
		}else $("#delivery_cost").html(numberformat(price_shipping,2));
		$('#total').html(numberformat(parseFloat(price_product)+parseFloat(price_shipping)-parseFloat(discount_total),2));
	},
	address_new:function(){
		$('#address_type').val('new');
		$('.address_header').hide();
		checkout.address_change('form');
	},
	address_cancel:function(){
		$('#address_type').val('data');
		$('.address_header').show();
		checkout.address_change($('#shippingaddress_id').val());
	},
	onsubmit:function(){
		if($('#address_type').val() == 'new' && !user_validator.validate())
			return false;
		return true;
	}
}

function numberformat(nStr,comma){
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? x[1] : '';
	if(comma != null)
		if(x2.length<=comma)
			for(i=x2.length;i<comma;i++)
				x2+='0';
		else x2=x2.substring(0,comma);
	if(x2.length>0)
		x2 = '.'+x2;
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}