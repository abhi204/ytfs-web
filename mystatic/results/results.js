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
  let nxt = document.querySelector("#next") /* next page button*/
  let prev = document.querySelector("#prev") /* previous page button*/

  if (!data.titles.includes(" next")) {
    nxt.classList.remove("btn-danger")
    nxt.classList.add("btn-secondary")
    nxt.setAttribute("disabled","")
  }

  if (!data.titles.includes(" prev")) {
    prev.classList.remove("btn-danger")
    prev.classList.add("btn-secondary")
    prev.setAttribute("disabled","")
  }
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
        <h6 style="overflow:hidden">${title}</h6>
        <div class="video-options">
          <a type="button" class="btn btn-dark" href="/media/${token}/stream/${resp_quality}/${encodedSearchText}/${encodedTitle}.mp4" target="_blank">Stream</a>
          <button type="button" class="btn btn-danger download-btn" onclick="downloadVideo(this)" data-title="${title}" data-quality="360p">Download</button>
        </div>
      </div>
    </div>
    <hr>`
  return videoField;
}

async function downloadVideo(clickElement) {
  let downloadTitle = clickElement.dataset.title
  let downloadQuality = clickElement.dataset.quality
  let downloadUrl = ""
  let parameters = {"session":token,"download_title":downloadTitle,"download_quality":downloadQuality}
  let getRequest = new Request(generateGETUrl(parameters))
  let sendRequest = await fetch(getRequest)
                          .then(response => response.text())
                          .then(txt => {downloadUrl = encodeURIComponent(txt).replace(/%2F/g,"/")})

  console.log(downloadUrl);
  let anchor = document.createElement("a")
  anchor.href = downloadUrl
  anchor.download = downloadTitle+".mp4"
  anchor.style.display = "none"
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
}

function generateGETUrl(params)
{
	query_url = '/download/?'
	for(key in params){
		value = params[key]
		query_url+= encodeURIComponent(key)+'='+encodeURIComponent(value)+'&'
	}
	return query_url.substring(0,query_url.length-1) //remove the last & character
}
