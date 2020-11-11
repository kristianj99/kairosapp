var search;
var searchname;

async function searchapi() {
	searchname = document.getElementById('recipesearch').value;
	search = "https://api.edamam.com/search?q=" + searchname + "&app_id=5a49e3a7&app_key=af17c370ff82a555da32682b4bc8e58b"
	
	console.log(search)
	fetch(search).then(function(response) {
		response.text().then(function(text) {
			results.textContent = text;
		});
	});

}
        
    