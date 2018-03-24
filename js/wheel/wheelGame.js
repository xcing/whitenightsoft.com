var game;
var wheel;
var pin;
var allowSpin;
var prizes = [];
var slices;
var winningPrize;
var pText;
var deg;
var playCount = $('#game').attr('pc');

// Utilities for detailed logging system
console.detailedLog = function(topic, data) {
	var context = topic+" : ";
	console.log(context+data);
}

// ------------------------------------------------------

// Setup AJAX Request first for asynchronous request
$.ajaxSetup({
	type: 'POST',
	async: false
});

$(window).load(function() {
	// Instantiate Phaser
	game = new Phaser.Game(488, 488, Phaser.AUTO, "wheel", "");
	game.state.add("PlayGame",playGame);
	game.state.start("PlayGame");
});
/* ------------------------------------------------------
UTILITIES 
------------------------------------------------------ */

var getWinningItem = function() {
	var obj;
	$.ajax({
		url: 'https://th.mol.com/mol12call/index.php?r=wheel/getprizes',
		dataType: 'json',
                data: {ti: $('#game').attr('ti')},
		success: function(o) {
			obj = o;
		}
	});
	return obj;
}

/* ---------------------------------------------------- */

var playGame = function(game){};

playGame.prototype = {
	preload: function() {
		game.load.image("wheel", $('#game').attr('wimg'));
		game.load.image("pin", "/mol12call/images/pin.png");
	},
	create: function() {
		game.stage.backgroundColor = "#29ABE2";
		wheel = game.add.sprite(game.width/2, game.height/2, "wheel");
		pin = game.add.sprite(game.width/2, game.height/2, "pin");
		wheel.anchor.set(0.5);
		pin.anchor.set(0.5);
		allowSpin = true;
		pin.inputEnabled = true;
		//pin.events.onInputDown.add(this.spin, this);
                game.input.onDown.add(this.spin, this);
	},
	spin: function() {
		if(playCount > 0) {
			if(allowSpin) {
				var wd = getWinningItem();
				if(wd.resp_code != 0) alert(wd.resp_desc); 
				var rounds = game.rnd.between(2, 4);
				var degrees = parseInt(wd.degree)+(game.rnd.between(wd.scatter_min,wd.scatter_max));
				allowSpin = false;
				var spinTween = game.add.tween(wheel).to({
					angle:360*rounds+degrees
				}, 3000, Phaser.Easing.Quadratic.Out, true);
				spinTween.onComplete.add(function() {
					var finalResponse;
					$.ajax({
						url: 'https://th.mol.com/mol12call/index.php?r=wheel/check',
						data: {tk: $('#game').attr('ti'), deg: degrees, gi:$('#game').attr('gi')},
						success: function(res) {
							finalResponse = res;
						}
					});
					var fr = JSON.parse(finalResponse);
					if(fr.resp_code != 0) {
						alert("เกิดข้อผิดพลาด กรุณาลองเล่นใหม่อีกครั้ง");
					} else {
						allowSpin = true;
						playCount--;
						$('#amount_play').html(playCount);
                                                $('#item_name').html(fr.item_name);
                                                $('#item_code').html(fr.item_code);
                                                $('#result_game').show();
					}
				}, this);
			}
		} else {
			alert('คุณใช้สิทธิในการเล่นเกมครบแล้ว');
		}
	}
}