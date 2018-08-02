//particlesJS code
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 40,
      "density": {
        "enable": true,
        "value_area": 500
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 3
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.17331451632870348,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 75.2615338300594,
        "size": 20.905981619460945,
        "duration": 0.5017435588670627,
        "opacity": 0.3846700617980814,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

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
