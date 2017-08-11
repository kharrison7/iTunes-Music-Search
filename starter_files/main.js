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

// This controls the number of results.
let result_Num = 3;
// This keeps track of the number of searches.
let search_Count = 0;

// This obtains info form the search form and sends it to a function to fetch the data.
function getSearch(){
  // console.log("get_Search Running");
  // This collects raw input from the submission field.
  let raw_search_input = document.getElementById("search_items").value;
  // console.log(`search_input: ` + raw_search_input);

  // This calculates the number of spaces inside the raw_search_input.
  let space_Count = raw_search_input.split(" ").length-1
  // console.log(`There are ${space_Count} spaces in raw_search_input`);

// This removes all spaces and replaces them with '+' within refined_search_input[refined_search_input.length-1]
let refined_search_input = [];
if (space_Count > 0){
for(i=0; i < space_Count; i++){
    if( i === 0 ){
    refined_search_input[i] = raw_search_input.replace(" ", "+");
    }
    else{
    refined_search_input[i] = refined_search_input[i-1].replace(" ", "+");
    }
}
}
else{
  space_Count = 1;
  refined_search_input[0] = raw_search_input;
}

// This creates a url to be a fetch target.
let x = 'https://itunes.apple.com/search?term=';
let z = "&entity=song";
let y = x + refined_search_input[space_Count-1] + z;
fetchGet(y);
console.log("\n\r");
console.log("New Search");
console.log(`search_url: ` + y);

// This fetches the information using the url obtained above and returns that data to the browser.
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
      // This puts the various data on the browser page.
      response.json().then(function(data) {
        // This makes an array to fill with music.
        let aud = [];

        // This goes through the results and lists the first 3.
        for (let i = 0; i < result_Num; i++){
            let result = data.results[i];
            let image_Thumb = document.getElementById('fill' +i);
            console.log("1: " + image_Thumb);
            let slot = document.getElementById('slot' +i);
            slot.innerHTML = "Song: " + result.trackName + `\n\r <br> Artist(s): <a>${result.artistName}</a>`;

            // This puts in 'No Image Found' if the image is absent.
            let a = result.artworkUrl100;
            if( a === '' ){
              a = "https://www.shearwater.com/wp-content/plugins/lightbox/images/No-image-found.jpg"
            }
            image_Thumb.setAttribute("style", "background-image: url("+a+");");

              image_Thumb.addEventListener('click', play_Music);
              // image_Thumb.setAttribute("id", "result" + i);

            console.log(`music preview link: ${result.previewUrl}`);

            // This does audio stuff.
            aud[i] = new Audio(result.previewUrl);
            }


        // This sends the first song returned before any song is clicked.
        let play_Song = document.getElementById('music_Here');
        play_Song.src=aud[0].src;
        play_Song.load();

      // This sends the song to the audio element to be played.
      function play_Music(){
          console.log("play_Music Clicked: " + this.id);
          console.log("aud_Number: " + this.id.slice(-1));
          let aud_Number = this.id.slice(-1);
          let play_Song = document.getElementById('music_Here');
          play_Song.src=aud[aud_Number].src;
          play_Song.load();
        }
      search_Count++;
   })
   .catch(function(err) {
    console.log("Fetch Error: ", err);
  });
 });
};
}
