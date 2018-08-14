let resp_quality = pageData.resp_quality
let token = pageData.session

//get the data from json into the page and load the page
let data = {}
let getJson = async () => {
  response = await fetch(`/media/${pageData.session}/data.json`)
  json = await response.json()
  data = json
  loadPage(data)
}
getJson();

function loadPage(data){
  return
}

//page is loaded and elements are setup
