function search(e){
  let inText = document.querySelector('.search_text').value;
  let inQuality = document.querySelector("#quality-text").innerText;

  let hiddenForm = document.getElementById("search-form")
  let hiddenFormText = document.getElementById('send-text');
  let hiddenFormQuality = document.getElementById('send-quality');

  hiddenFormText.value = inText;
  hiddenFormQuality.value = inQuality;

  hiddenForm.submit();
}
document.querySelector('.search-start').addEventListener("click",search);
document.querySelector('.search-start-sm').addEventListener("click",search);


function qualityToggle(e) {
  let inQuality = document.querySelector("#quality-text");
  let inQualitySmall = document.querySelector(".inQualitySmall");
  inQuality.innerText = e.target.innerText;
  inQualitySmall.innerText = e.target.innerText;
}
let toggleList = Array.from(document.querySelectorAll('.dropdown-item'));
toggleList.map(item => item.addEventListener('click',qualityToggle));

//both seachText boxes update each other in navbar
function searchTextUpdateNav(e) {
  document.querySelector('.small-search-input').value = e.target.value;
  document.querySelector('.search_text').value = e.target.value;
}
document.querySelector('.small-search-input').addEventListener('change',searchTextUpdateNav);
document.querySelector('.search_text').addEventListener('change',searchTextUpdateNav);
