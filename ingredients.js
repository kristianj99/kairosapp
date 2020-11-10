var search;
var searchname;
var searchcode;

async function searchapi() {
	searchname = document.getElementById('ingredients').value;
	searchcode = document.getElementById('barcode').value;
	if (searchname.length != 0 && searchcode.length != 0) {
		search = "https://api.edamam.com/api/food-database/v2/parser?ingr=" + searchname + "&upc=" + searchcode + "&app_id=9323297d&app_key=5d94ad408faa01064526c01a4ea278ec"
	} else if (searchname.length != 0 && searchcode.length == 0) {
		search = "https://api.edamam.com/api/food-database/v2/parser?ingr=" + searchname + "&app_id=9323297d&app_key=5d94ad408faa01064526c01a4ea278ec"
	} else if (searchname.length == 0 && searchcode.length != 0) {
		search = "https://api.edamam.com/api/food-database/v2/parser?upc=" + searchcode + "&app_id=9323297d&app_key=5d94ad408faa01064526c01a4ea278ec"
	}
	
	console.log(search)
	fetch(search).then(function(response) {
		response.text().then(function(text) {
			results.textContent = text;
		});
	});

}
	

        
    