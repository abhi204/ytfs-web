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
  let videoFieldsContainer = document.querySelector(".video-fields-list");
  videoFieldsContainer.appendChild(createdVideoField)
}

//

function createVideoField(title) {
  let encodedSearchText = encodeURIComponent(searchText)
  let encodedTitle = encodeURIComponent(title)
  let videoField = document.createElement("div");
  videoField.className = "video-field";
  videoField.innerHTML = `<div class="video-field-data">
    <div class="show-data">
      <img src="/media/${token}/stream/${resp_quality}/${encodedSearchText}/${encodedTitle}.jpg">
      <div class="title">
        <h6>${title}</h6>
        <div class="video-options">
          <a type="button" class="btn btn-dark" href="/media/${token}/stream/${resp_quality}/${encodedSearchText}/${encodedTitle}.mp4" target="_blank">Stream</a>
          <a type="button" class="btn btn-danger" href="/media/${token}/stream/${resp_quality}/${encodedSearchText}/${encodedTitle}.mp4" download>Download</a>
        </div>
      </div>
    </div>
    <hr>`
  return videoField;
}
