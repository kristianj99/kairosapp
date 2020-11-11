var search;
var searchName;
var lastResult = 0;
var nResults = 30;
var mySwiper;

async function searchApi() {
	searchName = document.getElementById('recipeSearch').value;
	if (searchName.length != 0){
		search = "https://api.edamam.com/search?q=" + searchName
			+ "&app_id=5a49e3a7&app_key=af17c370ff82a555da32682b4bc8e58b&from="
			+ lastResult + "&to=" + nResults;
	}
	
	//use jquery JSON shortcut
    $.getJSON(search, function(jsondata){
        //call function to format and print the result
		findRecipe(jsondata);
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

async function searchApiIngr() {
	console.log("search by ingredients")
}

/* Create the results html */
function findRecipe(jsondata){
	//clear the contents of swiper-wrapper
	$("#recipeSwipeWrap").html("");
	//get the number of results
	var countResults = Object.keys(jsondata.hits).length;
	console.log(countResults);
    //iterate through the results collection
    for (var i = 0; i < countResults; i++){
        //get and save the information needed
        var name = jsondata.hits[i].recipe.label;
        var image = jsondata.hits[i].recipe.image;
        var url = jsondata.hits[i].recipe.url;
        //create a string containing the HTML code
        var string = '<div class="result swiper-slide" id="rec-' + i + '">'
            + '<a href="' + url + '" target="_blank"><img src="' + image + '"></a>'
            + '<div class="result-description"><h4>' + name + '</h4></div></div>';
        //add the code to the box
        $('#recipeSwipeWrap').append(string);
    }
}
