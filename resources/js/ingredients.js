var search;
var searchname;
var searchcode;
var mySwiper;

async function searchapi() {
	searchname = document.getElementById('ingredients').value;
	searchcode = document.getElementById('barcode').value;
	if (searchname.length != 0 && searchcode.length != 0) {
		search = "https://api.edamam.com/api/food-database/v2/parser?ingr=" + searchname
			+ "&upc=" + searchcode + "&app_id=9323297d&app_key=5d94ad408faa01064526c01a4ea278ec";
	} else if (searchname.length != 0 && searchcode.length == 0) {
		search = "https://api.edamam.com/api/food-database/v2/parser?ingr=" + searchname
			+ "&app_id=9323297d&app_key=5d94ad408faa01064526c01a4ea278ec";
	} else if (searchname.length == 0 && searchcode.length != 0) {
		search = "https://api.edamam.com/api/food-database/v2/parser?upc=" + searchcode
			+ "&app_id=9323297d&app_key=5d94ad408faa01064526c01a4ea278ec";
	}

	//use jquery JSON shortcut
    $.getJSON(search, function(jsondata){
        //call function to format and print the result
		findFood(jsondata);
		console.log(jsondata)
	});
	
	//create a new swiper
	setTimeout(function() {
		mySwiper = new Swiper('.swiper-container', {
			observer: true,
			observeParents: true,
			observeSlideChildren: true,
			slidesPerView: 'auto',
			spaceBetween: 12,
		});
	}, 500);
}

/* Create the recipes code */
function findFood(jsondata){
	//clear the contents of swiper-wrapper
	$("#swipeWrap").html("");
	var countKey = Object.keys(jsondata).length;
    //iterate through the results collection
    for (var i = 0; i < countKey; i++){
        //get and save the information needed
        var name = jsondata.hints[i].food.label;
		var image = jsondata.hints[i].food.image;
        //create the string containing the HTML code
        var string = '<div class="food swiper-slide" id="food-' + (i) + '">'
			+ '<img src="' + image + '">'
            + '<div class="food-description"><h4>' + name + '</h4></div></div>';
        //add the code to the box
		$('#swipeWrap').append(string);
	}
}
