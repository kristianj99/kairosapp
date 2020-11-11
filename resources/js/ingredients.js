var search;
var searchName;
var searchCode;
var mySwiper;
var countResults
var nextPage

async function searchApi() {
	searchName = document.getElementById('ingredients').value;
	searchCode = document.getElementById('barcode').value;
	if (searchName.length != 0 && searchCode.length != 0) {
		search = "https://api.edamam.com/api/food-database/v2/parser?ingr=" + searchName
			+ "&upc=" + searchCode + "&app_id=9323297d&app_key=5d94ad408faa01064526c01a4ea278ec";
	} else if (searchName.length != 0 && searchCode.length == 0) {
		search = "https://api.edamam.com/api/food-database/v2/parser?ingr=" + searchName
			+ "&app_id=9323297d&app_key=5d94ad408faa01064526c01a4ea278ec";
	} else if (searchName.length == 0 && searchCode.length != 0) {
		search = "https://api.edamam.com/api/food-database/v2/parser?upc=" + searchCode
			+ "&app_id=9323297d&app_key=5d94ad408faa01064526c01a4ea278ec";
	}
	console.log(search)

	//use jquery JSON shortcut
    $.getJSON(search, function(jsondata){
        //call function to format and print the result
		findFood(jsondata);
		console.log(jsondata)
	});
	
	//create a new swiper (with delay)
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

/* Create the results html */
function findFood(jsondata){
	//clear the contents of swiper-wrapper
	$("#ingredientSwipeWrap").html("");
	//get the number of results
	countResults = Object.keys(jsondata.hints).length;
    //iterate through the results collection
    for (var i = 0; i < countResults; i++){
        //get and save the information needed
        var name = jsondata.hints[i].food.label;
		var image = jsondata.hints[i].food.image;
        //create a string containing the HTML code
        var string = '<div class="result swiper-slide" id="ing-' + i + '">'
			+ '<img src="' + image + '">'
            + '<div class="result-description"><h4>' + name + '</h4></div></div>';
        //add the code to the box
		$('#ingredientSwipeWrap').append(string);
	}
	
}


