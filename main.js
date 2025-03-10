const url = `https://api.thecatapi.com/v1/breeds`;
const url2 = `https://api.thecatapi.com/v1/images/search?limit=9`
const api_key = import.meta.env.VITE_CAT_API_KEY;
let storedBreeds = [];

// Fetch breeds data and filter based on whether the data has an image
 fetch(url,{headers: {
      'x-api-key': api_key
    }})
 .then((response) => {
   return response.json();
 })
.then((data) => {
   
   // Filter to only include those with an `image` object
   data = data.filter(img=> img.image?.url!=null);
   console.log(data);
   storedBreeds = data;
   
   for (let i = 0; i < storedBreeds.length; i++) {
    const breed = storedBreeds[i];
    let option = document.createElement('option');
     
     // Skip any breeds that don't have an image
    if(!breed.image)
		continue;
     
    // Use the current array index
    option.value = i;
    option.innerHTML = `${breed.name}`;
	document.getElementById('breed_selector').appendChild(option);
    
    }
})
.catch(function(error) {
   console.log(error);
});

/*
*  Displays the information of the selected breed specified by index
*/
window.showBreedImage= function showBreedImage(index)
{ 
	if (index === "--Choose a breed--") {
		document.getElementById("breed_info").setAttribute("hidden", "true");
	} else {
		document.getElementById("breed_info").setAttribute("hidden", "false");
		document.getElementById("breed_image").src= storedBreeds[index].image.url;
		document.getElementById("breed_json").textContent= "Temperament: " + storedBreeds[index].temperament;
		document.getElementById("age").textContent = "Lifespan: " + storedBreeds[index].life_span + " years"
		document.getElementById("country").textContent = "Country of Origin: " + storedBreeds[index].origin
		document.getElementById("info").textContent = storedBreeds[index].description;
		document.getElementById("wiki_link").href= storedBreeds[index].wikipedia_url;
		document.getElementById("wiki_link").innerHTML= "More info: " + storedBreeds[index].wikipedia_url;
		document.getElementById("breed_info").removeAttribute("hidden");
	}
}


/*
*  Fetches 9 random images from the /images endpoint and displays them in a 3x3 grid
*/
window.showImages= function showImages() {

	// Clear out previous images
	while (document.getElementById("grid").firstChild) {
		document.getElementById("grid").removeChild(document.getElementById("grid").firstChild);
	}
	
	fetch(url2,{headers: {
		'x-api-key': api_key
	  }})
   .then((response) => {
	 return response.json();
   })
  .then((data) => {
	let imagesData = data;
	imagesData.map(function(imageData) {
	  
	  let image = document.createElement('img');
	  // Use the url from the image object
	  image.src = `${imageData.url}`;
		  
	  let gridCell = document.createElement('div');
	  gridCell.classList.add('col');
	  gridCell.classList.add('col-lg');
	  gridCell.appendChild(image)
		
	  document.getElementById('grid').appendChild(gridCell);
	  
	  });
  })
  .catch(function(error) {
	 console.log(error);
  });
}