const url = `https://api.thecatapi.com/v1/breeds`;
const url2 = `https://api.thecatapi.com/v1/images/search?limit=4`
const api_key = import.meta.env.VITE_CAT_API_KEY;
let storedBreeds = [];

 fetch(url,{headers: {
      'x-api-key': api_key
    }})
 .then((response) => {
   return response.json();
 })
.then((data) => {
   
   //filter to only include those with an `image` object
   data = data.filter(img=> img.image?.url!=null);
   console.log(data);
   storedBreeds = data;
   
   for (let i = 0; i < storedBreeds.length; i++) {
    const breed = storedBreeds[i];
    let option = document.createElement('option');
     
     //skip any breeds that don't have an image
    if(!breed.image)
		continue;
     
    //use the current array index
    option.value = i;
    option.innerHTML = `${breed.name}`;
	document.getElementById('breed_selector').appendChild(option);
    
    }
   //show the first breed by default
   showBreedImage(0);
})
.catch(function(error) {
   console.log(error);
});

window.showBreedImage= function showBreedImage(index)
{ 
  document.getElementById("breed_image").src= storedBreeds[index].image.url;
  
  document.getElementById("breed_json").textContent= storedBreeds[index].temperament;
  document.getElementById("age").textContent = "Lifespan: " + storedBreeds[index].life_span + " years"
  document.getElementById("country").textContent = "Country of Origin: " + storedBreeds[index].origin
  document.getElementById("info").textContent = storedBreeds[index].description;
  
  
  document.getElementById("wiki_link").href= storedBreeds[index].wikipedia_url;
  document.getElementById("wiki_link").innerHTML= storedBreeds[index].wikipedia_url;
}

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
	  //use the url from the image object
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