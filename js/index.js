var index_showcase = {
	itemperrow:6,
	data:{},
	select_module:function(e){
		var module_id = $(e.target).attr('id');
		index_showcase.show_module(module_id);
	},
	show_module:function(id){
		$("#product_showcase").empty();
		var new_data;
		if(id == 0)
			new_data = index_showcase.data;
		else new_data = index_showcase.data.filter(".module_"+id);
		for(var i = 0; i < Math.ceil(new_data.length/index_showcase.itemperrow); i++){
			var row = $('<ul class="thumbnails"></ul>')
			for(var j = i * index_showcase.itemperrow; j < Math.min((i+1) * index_showcase.itemperrow, new_data.length); j++){
				row.append(new_data[j]);
			}
			$("#product_showcase").append(row);
		}
	},
	init:function(){
		index_showcase.data = $('#product_showcase li');
		index_showcase.show_module(0);
		$("#product_showcase_tab a").click(index_showcase.select_module);
	}
}