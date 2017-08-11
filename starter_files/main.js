/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play


// My Code
console.log("JS On");

// This obtains info form the search form and sends it to a function to fetch the data.
function getSearch(){
  console.log("get_Search Running");
  let raw_search_input = document.getElementById("search_items").value;
  console.log(`search_input: ` + raw_search_input);

  let space_Count = raw_search_input.split(" ").length-1
  console.log(`There are ${space_Count} spaces in raw_search_input`);

let refined_search_input = '';
for(i=0; i < space_Count; i++){
refined_search_input = raw_search_input.replace(" ", "+");
}


let x = 'https://itunes.apple.com/search?term=';
let z = "&entity=song";
let y = x + refined_search_input + z;
fetchGet(y);
console.log(`search_url: ` + y);





function fetchGet(url){
fetch(url)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      else{
        console.log('fetch successfully.');
      }




      // Examine the text in the response
      response.json().then(function(data) {
        // console.log("Data First Result: " + data.results[0].title);

        console.log(`Data ${data.results[0].artistName}`);

        // This goes through the results and lists the first 3.
        for (let i = 0; i < 3; i++){
            let result = data.results[i];
            let image_Thumb = document.getElementById('fill' +i);
            let slot = document.getElementById('slot' +i);
            slot.innerHTML = "Song: " + result.trackName + `\n\r <br> Artist(s): <a>${result.artistName}</a>`;
            console.log("href: " + result.artworkUrl60);
            // console.log("Image: " + result.thumbnail);

            // This puts in 'No Image Found' if the image is absent.
            let a = result.artworkUrl100;
            if( a === '' ){
              a = "https://www.shearwater.com/wp-content/plugins/lightbox/images/No-image-found.jpg"
            }
            image_Thumb.setAttribute("style", "background-image: url("+a+");");



            console.log(`music preview link: ${result.previewUrl}`);
            }


   })
   .catch(function(err) {
    console.log("Fetch Error: ", err);
  });
 });
};
}
