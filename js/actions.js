function allActions(){


  // Get URL parameters
  function getParameterByName(variable)
  {
         let query = window.location.search.substring(1);
         let vars = query.split("&");
         for (let i=0; i<vars.length; i++) {
                 let pair = vars[i].split("=")
                 if(pair[0] == variable){return pair[1]}
         }
         return(false);
  }


  // Getting and cleaning HPP paramet
  let dC_h = getParameterByName('hpp');
  
  if(!dC_h) {
  	dC_h = ""
  }

  dC_h = decodeURIComponent(dC_h)
  
  let dC_h_original = dC_h

  if(String(dC_h).includes(" Find resources and learn")) {
  	dC_h = dC_h.replace(" Find resources", "<br>Find resources")
  }

  // Getting and cleaning Search Name Paramter
  let sn1 = getParameterByName('sn1')
  let sn2 = getParameterByName('sn2')
  
  if(!sn1 || !sn2) {
    sn1 = "Net"
    sn2 = "search"
  } else {
    sn1 = decodeURIComponent(sn1)
    sn2 = decodeURIComponent(sn2)
  }

  // Set HTML content

  // Set search title content
  let elemTitle1 = document.querySelector('#dynamic-title-1')
  elemTitle1.innerHTML = sn1

  let elemTitle2 = document.querySelector('#dynamic-title-2')
  elemTitle2.innerHTML = sn2


  // Set HPP content
  let elem = document.querySelector('#dynamic-content');

  if (dC_h.length > 0) {
    if(String(dC_h) == 'icon'){    
      const img = document.createElement("img")
      img.src = "img/bottle_icon_sm.png"
      elem.appendChild(img).width = "100"
    } else {
      elem.innerHTML = dC_h
    }
  }

  // Get HTML content
  let dispC_h = elem.innerHTML


  // Get Worker ID
  let wid = getParameterByName('w')

  if (!wid) {
    wid = "no_id_provided"
  }


  // Capture click location
  let click_location = "default"

  document.getElementById("search-bar").onkeydown = function (e) {

  	let key = e.which || e.keyCode

    if (key === 13) {
    	e.preventDefault()
    	click_location = "srch-ent"
    	redirectQualtrics()
    }

  }

  document.getElementById("search-button").addEventListener("click", function() {
  	click_location = "srch"
    redirectQualtrics()
  })


  document.getElementById("dynamic-content").addEventListener("click", function() {
  	click_location = "hpp"
    redirectQualtrics()
  })


  // Redirect after 10 seconds, regardless of activity
  // setTimeout(redirectQualtrics, 10000)


  // Combine data and redirect
  function redirectQualtrics() {
    // const urlRedirect= `https://google.qualtrics.com/jfe/form/SV_eeumk4pgZ3aARHT?wr='${wid}'&cl='${click_location}'&dC_h='${dC_h_original}'&dispC_h='${dispC_h}'&v=1`
    // window.location = urlRedirect
    alert(`wr='${wid}'&cl='${click_location}'&dC_h='${dC_h_original}'&dispC_h='${dispC_h}'&v=1`)
  }

}
