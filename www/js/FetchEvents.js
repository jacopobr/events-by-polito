var category;
var CompleteEventsList;

document.addEventListener("backbutton",onBackbutton,false);

function onBackbutton() {
	let active_page = document.getElementById("navigator").topPage.id;
	if (active_page == "login") {
		event.stopPropagation();
	}
}


function get_events(category){
  document.querySelector('#expandable').hideExpansion();
  $('#eventi_lista').empty();
  $.getJSON("https://homeserverngg.ddns.net/api/events/"+category+"/", function(result){
    $.each(result, function(i, field) {
      var idevento = field.id;
      var nome = field.title;
      var data = field.event_date;
      var citta = field.city;
      var luogo = field.location;
      var day = new Date(data.replace(' ','T')).getDate();
      var month = new Date(data.replace(' ','T')).getMonth();
      var year = new Date(data.replace(' ','T')).getFullYear();
      var complete_date = "" +day+" "+monthNames_eng[month]+" "+year+"";
        
      var evento = document.createElement("div")
      evento.id = idevento;
      evento.innerHTML = "\
      <ons-gesture-detector>\
        <ons-list-item id ="+idevento+" class = 'event' tappable onclick='touchEvent(this.id)'>\
          <div class = 'left'>\
             <div class = 'thumbnail'>\
               <img class = 'img_prova' src = 'https://homeserverngg.ddns.net/static/event_pics/"+field.image_file+"'>\
              </div>\
           </div>\
           <div class = 'center'>\
             <span class='list-item__title'>\
               <strong>"+nome+"</strong></span>\
                <span class='list-item__subtitle'><ons-icon icon ='md-alarm'></ons-icon> "+complete_date+"</span>\
                <span class='list-item__subtitle'><ons-icon icon ='md-navigation'></ons-icon> "+luogo+"</span>\
                <span class='list-item__subtitle'><ons-icon icon ='md-pin-drop'></ons-icon> "+citta+"</span>\
            </div>\
               <ons-list-item>\
      <ons-gesture-detector>"
      eventi_lista.append(evento);
      });
    }); 
}

function music(){
  category = "0";
  document.querySelector("#category_name").innerHTML= music_list_exp[lan];
  get_events(category);
}

function sport(){
  category = "2";
  document.querySelector("#category_name").innerHTML= "Sport";
  get_events(category);
}

function theatre(){
  category = "1";
  document.querySelector("#category_name").innerHTML= theatre_list_exp[lan];
  get_events(category);
}

function culture(){
  category = "4";
  document.querySelector("#category_name").innerHTML= culture_list_exp[lan];
  get_events(category);
}

function cinema(){
  category = "3";
  document.querySelector("#category_name").innerHTML= cinema_list_exp[lan];
  get_events(category);
}

function others(){
  category = "5";
  document.querySelector("#category_name").innerHTML= others_list_exp[lan];
  get_events(category);
}

function all_events(){
  document.querySelector("#category_name").innerHTML= category_name[lan];
            document.querySelector('#expandable').hideExpansion();
            $('#eventi_lista').empty();
            $.getJSON("https://homeserverngg.ddns.net/api/events/", function(result){
                CompleteEventsList = result;
                console.log(result);
                $.each(result, function(i, field) {
                  var idevento = field.id;
                  var nome = field.title;
                  var data = field.event_date;
                  var citta = field.city;
                  var luogo = field.location;
                  var day = new Date(data.replace(' ','T')).getDate();
                  var month = new Date(data.replace(' ','T')).getMonth();
                  var year = new Date(data.replace(' ','T')).getFullYear();
                  var complete_date = "" +day+" "+monthNames_eng[month]+" "+year+"";
        
                  var evento = document.createElement("div")
                  evento.id = idevento;
                  evento.innerHTML = "\
                  <ons-gesture-detector>\
                  <ons-list-item id ="+idevento+" class = 'event' tappable onclick='touchEvent(this.id)'>\
                    <div class = 'left'>\
                      <div class = 'thumbnail'>\
                        <img class = 'img_prova' src = 'https://homeserverngg.ddns.net/static/event_pics/"+field.image_file+"'>\
                      </div>\
                    </div>\
                    <div class = 'center'>\
                      <span class='list-item__title'>\
                          <strong>"+nome+"</strong></span>\
                      <span class='list-item__subtitle'><ons-icon icon ='md-alarm'></ons-icon> "+complete_date+"</span>\
                      <span class='list-item__subtitle'><ons-icon icon ='md-navigation'></ons-icon> "+luogo+"</span>\
                      <span class='list-item__subtitle'><ons-icon icon ='md-pin-drop'></ons-icon> "+citta+"</span>\
                    </div>\
                    <ons-list-item>\
                    <ons-gesture-detector>"
                  eventi_lista.append(evento);
                });
            });
  

}
