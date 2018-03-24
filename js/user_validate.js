var user_validator = {
	require_id:[],
	email_id:false,
	password_id:false,
	password2_id:false,
	password_bar_id:false,
	set_require:function(ids){
		user_validator.require_id = [];
		for(var i = 0; i < ids.length; i++){
			user_validator.add_require(ids[i]);
		}
	},
	add_require:function(id){
		user_validator.require_id.push(id);
		$('#'+id).change(function(){user_validator.validate_require(id);});
	},
	set_email:function(id){
		user_validator.require_id.push(id);
		$('#'+id).change(function(){user_validator.validate_require(id);});
	},
	set_password:function(password_id, password_bar_id){
		user_validator.password_id = password_id;
		user_validator.password_bar_id = password_bar_id;
		$('#'+password_id).keyup(function(){user_validator.validate_password();});
	},
	set_password2:function(password_id){
		user_validator.password2_id = password_id;
		$('#'+password_id).change(function(){user_validator.validate_password2();});
	},
	validate:function(){
		var result = true;
		for(var i = 0; i < user_validator.require_id.length; i++){
			result = user_validator.validate_require(user_validator.require_id[i]) && result;
		}
		result = user_validator.validate_email() && result;
		result = user_validator.validate_password() && result;
		result = user_validator.validate_password2() && result;
		return result;
	},
	validate_require:function(id){
		var result = ($('#'+id).val() != '');
		if(result){
			$('#'+id).css('border', '');
		}else{
			$('#'+id).css('border', '1px solid red');
		}
		return result;
	},
	validate_email:function(){
		if(user_validator.email_id == false)
			return true;
			
		var re = /\S+@\S+\.\S+/;
		var result = re.test(email);
		if(result){
			$('#'+user_validator.email_id).css('border', '');
		}else{
			$('#'+user_validator.email_id).css('border', '1px solid red');
		}
		
		return result;
	},
	validate_password:function(){
		if(user_validator.password_id == false)
			return true;
		var intPassWd = 0;
		var passwd = $('#'+user_validator.password_id).val();
		
		if (passwd.length<1){
			intPassWd = (intPassWd+0)
		}
		else if (passwd.length>1 && passwd.length<5){
			intPassWd = (intPassWd+1)
		}
		else if (passwd.length>4 && passwd.length<8){
			intPassWd = (intPassWd+2)
		}
		else if (passwd.length>7 && passwd.length<16){
			intPassWd = (intPassWd+5)
		}
		else if (passwd.length>15){
			intPassWd = (intPassWd+8)
		}

		// ให้คะแนนความปลอดภัยเพิ่มเติม
		if (passwd.match(/[a-z]/)){ //ถ้ามี a-z
			intPassWd = (intPassWd+1)
		}
		if (passwd.match(/[A-Z]/)){ //ถ้ามี A-Z
			intPassWd = (intPassWd+1)
		}

		// NUMBERS
		if (passwd.match(/\d+/)){ // ถ้ามีตัวเลข
			intPassWd = (intPassWd+1)
		}
		if (passwd.match(/(.*[0-9].*[0-9].*[0-9])/)){ // ถ้ามีตัวเลข ต่อท้าย 3 ตัว
			intPassWd = (intPassWd+3)
		}

		// COMBOS
		if (passwd.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)){ // ถ้ามีตัวอักษรตัวเล็กตัวใหญ่สลับกัน
			intPassWd = (intPassWd+5)
		}

		if (passwd.match(/([a-zA-Z])/) && passwd.match(/([0-9])/)){ // ถ้ามีตัวอักษรเ และเลข
			intPassWd = (intPassWd+6)
		}
		
		// SPECIAL CHAR
		if (passwd.match(/[^0-9a-zA-Z]/)){ // ถ้ามีตัวอักษรพิเศษ 
			intPassWd = 3
		}
		
		var password_bar = $('#'+user_validator.password_bar_id);
		
		password_bar.removeClass('psslv_lv1');
		password_bar.removeClass('psslv_lv2');
		password_bar.removeClass('psslv_lv3');
		
		var result = false;
		
		if(intPassWd <= 4){
			password_bar.addClass('psslv_lv1');
		}else if (intPassWd >=5 && intPassWd <= 15){
			password_bar.addClass('psslv_lv2');
		}else {
			result = true
			password_bar.addClass('psslv_lv3');
		}
		password_bar.width(parseInt((intPassWd/25)*100)+'%');
		
		if(result){
			$('#'+user_validator.password_id).css('border', '');
		}else{
			$('#'+user_validator.password_id).css('border', '1px solid red');
		}
		
		return result;
	},
	validate_password2:function(){
		if(user_validator.password_id == false || user_validator.password2_id == false)
			return true;
		
		var result = $('#'+user_validator.password2_id).val() != '' && $('#'+user_validator.password_id).val() == $('#'+user_validator.password2_id).val();
		
		if(result){
			$('#'+user_validator.password2_id).css('border', '');
		}else{
			$('#'+user_validator.password2_id).css('border', '1px solid red');
		}
		
		return result;
	}
}