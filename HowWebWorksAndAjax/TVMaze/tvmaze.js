"use strict";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");
const noImage = "https://tinyurl.com/tv-missing";
const $episodesList = $("#episodesList");

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  const url = `https://api.tvmaze.com/search/shows?q=${term}`;
  const result = await axios.get(url);
  console.log(result);
  return result.data.map((result) => {
    const returnedShows = result.show;
    return {
      id: returnedShows.id,
      name: returnedShows.name,
      summary: returnedShows.summary,
      image: returnedShows.image ? returnedShows.image.medium : noImage,
    };
  });
}
/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src="${show.image}"
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `
    );

    $showsList.append($show);
  }
}

/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});

/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) {
  const url = `http://api.tvmaze.com/shows/${id}/episodes`;
  const result = await axios.get(url);
  console.log(result);
  return result.data.map((episode) => ({
    id: episode.id,
    name: episode.name,
    season: episode.season,
    number: episode.number,
  }));
}

//Write a clear doc string for this function

/**Given an array of episodes, this function will add those episodes as a list to the DOM and then the episodes area will no longer be hidden*/

function populateEpisodes(episodes) {
  $episodesList.empty();
  for (let episode of episodes) {
    const $episodeLI = $(
      `<li>${episode.name}(season ${episode.season}, number ${episode.number})</li>`
    );
    $episodesArea.append($episodeLI);
    //   const $episodeModal = $(`<div class="modal" tabindex="-1" role="dialog">
    //   <div class="modal-dialog" role="document">
    //     <div class="modal-content">
    //       <div class="modal-header">
    //         <h5 class="modal-title">Episode Information</h5>
    //         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    //           <span aria-hidden="true">&times;</span>
    //         </button>
    //       </div>
    //       <div class="modal-body">
    //         <p>${episode.name}, (season ${episode.season}, number ${episode.number})</p>
    //       </div>
    //       <div class="modal-footer">
    //         <button type="button" class="btn btn-primary">Save changes</button>
    //         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>`);
    //   $episodesList.append($episodeModal);
  }
  $episodesArea.show();
}

async function episodeDisplay(event) {
  const showID = $(event.target).closest(".Show").data("show-id");
  const myEpisodes = await getEpisodesOfShow(showID);
  populateEpisodes(myEpisodes);
}
$showsList.on("click", ".Show-getEpisodes", episodeDisplay);
