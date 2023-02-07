console.log("Let's get this party started!");

async function addUserGif(searchTerm) {
  try {
    let userInput = document.getElementById("searchTerm").value;
    const url = `https://api.giphy.com/v1/gifs/search?api_key=7z096b2lN6OOU1C2WEEAUetOmH39wmUw&q=${userInput}&limit=1`;
    const res = await axios.get(url);
    console.log(res.data.data[0].images.original.url);
    const img = document.createElement("img");
    img.src = res.data.data[0].images.original.url;
    const imageContainer = document.getElementById("imageContainer");
    imageContainer.appendChild(img);
  } catch (err) {
    alert("GIF not found!");
  }
}
const searchButton = document.getElementById("searchButton");
const input = document.getElementById("searchTerm");
searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  addUserGif(input.value);
  input.value = "";
});

$("#remove").on("click", function () {
  const $imageContainer = $("#imageContainer");
  $imageContainer.empty();
});
