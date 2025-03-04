const url = `https://api.thecatapi.com/v1/breeds`;
const api_key = "live_XrYSqirPLenmKLh25y7GUu96kiXA7tfW3CIHiJOWUVAFSbij3HgrZCsjwPzDyuq1";
console.log(api_key);
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

function showBreedImage(index)
{ 
  document.getElementById("breed_image").src= storedBreeds[index].image.url;
  
  document.getElementById("breed_json").textContent= storedBreeds[index].temperament;
  document.getElementById("age").textContent = "Lifespan: " + storedBreeds[index].life_span + " years"
  document.getElementById("country").textContent = "Country of Origin: " + storedBreeds[index].origin
  document.getElementById("info").textContent = storedBreeds[index].description;
  
  
  document.getElementById("wiki_link").href= storedBreeds[index].wikipedia_url;
  document.getElementById("wiki_link").innerHTML= storedBreeds[index].wikipedia_url;
}