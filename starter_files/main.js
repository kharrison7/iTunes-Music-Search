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
  let search_input = document.getElementById("search_items").value;
  console.log(`search_input: ` + search_input);


let x = 'https://itunes.apple.com/search?q=';
let y = x + search_input;
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

        // This goes through the results and lists the first 10.
        for (let i = 0; i < 10; i++){
            let result = data.results[i];
            let image_Thumb = document.getElementById('fill' +i);
            let slot = document.getElementById('slot' +i);
            slot.innerHTML = result.title + "\nIngredients: " + result.ingredients + `\nLink: <a>${result.href}</a>`;
            console.log("href: " + result.href);
            // console.log("Image: " + result.thumbnail);

            // This puts in 'No Image Found' if the image is absent.
            let a = result.thumbnail;
            if( a === '' ){
              a = "https://www.shearwater.com/wp-content/plugins/lightbox/images/No-image-found.jpg"
            }
            image_Thumb.setAttribute("style", "background-image: url("+a+");");
            }
// This may eventually do something.
// let fill = `
// <p>${data.title}</p>
// <br>
// <p>Results: ${data.results}</p>
// `;
// let text_Result = document.getElementById('all_left_items');
// text_Result.innerHTML = fill;

   })
   .catch(function(err) {
    console.log("Fetch Error: ", err);
  });
 });
};
}
