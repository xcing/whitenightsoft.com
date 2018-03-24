 function showCart(idShow){
	 	ShowPopupP2W('p2w_cart',idShow,0,0);
		var URL = 'cart/';
			ajaxLoadP2W('GET', URL,'','p2w_cart');
 }
 function hideCart(){
	 	document.getElementById('p2w_cart').style.display = 'none';
 }