let resp_quality = pageData.resp_quality;
let token = pageData.session;
let searchText = pageData.search_text;

//get the data from json into the page and load the page
let data = {};
let getJson = async () => {
  response = await fetch(`/media/${pageData.session}/data.json`);
  json = await response.json();
  data = json;
  loadPage(data);
};
getJson();

function loadPage(data) {
  let titles = data.titles.filter(title => {
    if (title!=" next" && title!=" prev") {
      return true;
    }
  });
  titles.forEach(title => videoField(title));
}


function videoField(title) {
  let createdVideoField = createVideoField(title);
  let listContainer = document.querySelector(".video-list");
  listContainer.appendChild(createdVideoField)
}

//page is loaded and elements are setup

let playerSource = document.querySelector(".video-js");
playerSettings = {controls:true,
  preload:"auto",
  fluid:true,
  autoplay:false,
}
let player = videojs(playerSource,playerSettings);

function showVideo(title){
  title.addEventListener("click",showEvent);
}

let videoTitles = Array.from(document.querySelectorAll(".title"));
videoTitles.forEach(title => showVideo(title));

function showEvent(e) {
  let hideField = document.querySelector('.hidden-field-data')
  if (hideField.classList.contains("hidden")){
    hideField.classList.remove("hidden");
  }
  else{
    hideField.classList.add("hidden");
  }
}

function createVideoField(title) {
  let encodedSearchText = encodeURIComponent(searchText)
  let encodedTitle = encodeURIComponent(title)
  let videoField = document.createElement("div");
  videoField.className = "video-field";
  videoField.innerHTML = `<div class="video-field-data">
        <div class="show-data">
          <img src="/media/${token}/stream/${resp_quality}/${encodedSearchText}/${encodedTitle}.jpg" id="video">
          <div class="title">
            <h6><a href="#video">${title}</a></h6>
          </div>
        </div>
      </div>
      <div class="hidden-field-data hidden">
        <hr class="full-hr" >
        <video class="video-js vjs-big-play-centered" poster="/media/${token}/stream/${resp_quality}/${searchText}/${title}.jpg" >
          <source src="/media/${token}/stream/${resp_quality}/${encodedSearchText}/${encodedTitle}.mp4" type="video/mp4">
          <p class="vjs-no-js"> To view this video please enable JavaScript, and consider upgrading to a web browser that
            <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
          </p>
        </video>
        <hr>
        <div class="download-list">
          <a class="btn btn-outline-danger" href="/media/${token}/stream/${resp_quality}/${searchText}/${title}.mp4" download>Download</a>
        </div>
      </div>`
  return videoField;
}
