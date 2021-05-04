//Changes navbar title according to pressed tab
document.addEventListener('prechange', function(event) {
    document.querySelector('#change .center')
      .innerHTML = event.tabItem.getAttribute('label');
    
      if (event.tabItem.getAttribute("id") == "UserLabel"){
        document.querySelector("#itabutton").innerHTML = "";
        document.querySelector("#engbutton").innerHTML = "";
      }
      if (event.tabItem.getAttribute("id") == "tickets_page"){
        document.querySelector("#itabutton").innerHTML = "";
        document.querySelector("#engbutton").innerHTML = "";
      }
      if(event.tabItem.getAttribute("id") == "EventsLabel"){
        document.querySelector("#itabutton").innerHTML = '<ons-button id = "ita" modifier = "quiet" style ="color:#ffffff" onclick="SetLanguage(this.id)">ITA</ons-button>';
        document.querySelector("#engbutton").innerHTML = '<ons-button id = "eng" modifier = "quiet" style ="color:#ffffff" onclick="SetLanguage(this.id)">ENG</ons-button>';

      }

      // var active = event.tabItem.getAttribute('id');
      
      // if (active == "EventsLabel"){
      //   console.log("Active" + active);
      //   document.querySelector('#itabutton').innertHTML = '\
      //   <ons-button id = "ita" modifier = "quiet" style ="color:#ffffff" onclick="SetLanguage(this.id)">ITA</ons-button>';
      //   document.querySelector('#engbutton').innerHTML = '\
      //   <ons-button id = "eng" modifier = "quiet" style ="color:#ffffff" onclick="SetLanguage(this.id)">ENG</ons-button>';
      //  } 
      // if (active == "UserLabel") {
      //   try{
      //   document.querySelector('#itabutton').innertHTML = "";
      //   console.log("Active 2" + active);
      //   document.querySelector('#engbutton').innertHTML = "";
      //   }catch(e){console.log(e);}
      // }
      // if (active == "tickets_page"){
        
      // }
  });


  // 