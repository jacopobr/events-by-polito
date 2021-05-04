/*Modulo che si occupa della gestione del singolo evento, dall'aprire la scheda alla formattazione
della pagina HTMl*/
var monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
  "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
var monthNames_eng = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

var prenotazioni = []; ///UTILIZZATO PER PRENOTAZIONI IN LOCALE, CAMBIARE CON LETTURA JSON DA GET
var id_evento_global;
var id_ticket_global = [];
var ticket_price_global = [];
var totalPrice = 0;
var selection = []; //selezione finale del numero dei biglietti
var POST_BOOKING_response;



//Tap on card and opening of new event window
// document.addEventListener("tap",function(event) {
//     if (event.target.parentElement.matches(".event") || event.target.matches(".event")){
//       var event_id = event.target.parentElement.id;
//       document.getElementById("navigator").pushPage('evento_singolo.html');
//       event_changed(event_id);
//       init_page_event(event_id);
//     }
//     if (event.target.parentElement.matches(".purchase") || event.target.matches(".purchase")){
//       var purchaseID = event.target.parentElement.id;
//       document.getElementById("navigator").pushPage('SinglePurchase.html');
//       setTimeout(function(){singlePurchase(purchaseID)},100);    
//     }  
//   });     

function touchEvent(event_id){
    document.getElementById("navigator").pushPage('evento_singolo.html');
      event_changed(event_id);
      init_page_event(event_id);
  }
   
function touchPurchase(purchaseID){
    document.getElementById("navigator").pushPage('SinglePurchase.html');
      setTimeout(function(){singlePurchase(purchaseID)},100);
}
  
  

function event_changed(idevento){
  totalPrice = 0;
  // check is the current event is equal to the next one selected to initializiate the global vectors and avoid conflicts
  if (idevento != id_evento_global){
      id_ticket_global = [];
      ticket_price_global = [];
      selection = [];
  }
}

function init_page_event(event_id){
        id_evento_global = event_id;
        $.getJSON("https://homeserverngg.ddns.net/api/events/", function(result){
            $.each(result,function(i,field){
                if (field.id == event_id){
                    //Prendo le informazioni dell'eveto cliccato
                    var idevento = field.id;
                    var title = field.title;
                    var data_evento= field.event_date;
                    var citta = field.city;
                    var descrizione = field.content;
                    var luogo = field.location;
                    var indirizzo = field.address; 
                    var time_from = field. time_from.replace(/(.*)\D\d+/, '$1');
                    var time_to = field. time_to.replace(/(.*)\D\d+/, '$1');
                    var user_id = field.user_id;
                    var day = new Date(data_evento.replace(' ','T')).getDate();
                    var month = new Date(data_evento.replace(' ','T')).getMonth();
                    var year = new Date(data_evento.replace(' ','T')).getFullYear();
                    var complete_date = "" +day+" "+monthNames_eng[month]+" "+year+"";

                    document.getElementById("copertina_evento").setAttribute("src","https://homeserverngg.ddns.net/static/event_pics/"+field.image_file+"");
                    document.getElementById("google_maps_frame").setAttribute("src","https://www.google.com/maps/embed/v1/place?q="+indirizzo+""+citta+"&key=AIzaSyAWEvhjqJOmaokhKxpf4gaMb_2MLORkrtU");
                    document.querySelector("#event_title").innerHTML = title;
                    document.getElementById("description_subtitle").innerHTML ="  "+description_subtitle[lan];
                    document.getElementById("date_time").innerHTML = "  "+date_time[lan];
                    document.querySelector("#descrizione").innerHTML = descrizione;
                    document.querySelector("#shareButton").value = idevento;
                    document.querySelector("#date").innerHTML = "<b>" + day_label[lan] +": </b> " + complete_date +"" ;
                    document.querySelector('#time_from').innerHTML = "<b>"+start_label[lan]+": </b> " + time_from+"";
                    document.querySelector('#time_to').innerHTML = "<b>"+end_label[lan]+": </b> " + time_to+"";
                    document.querySelector('#luogo').innerHTML = "<b>" +location_label[lan]+": </b>"+luogo+"";
                    document.querySelector('#citta').innerHTML = "<b>" +city_label[lan]+": </b>"+citta+"";
                    document.querySelector('#indirizzo').innerHTML = "<b>"+address_label[lan]+": </b>"+indirizzo+"";
                    document.getElementById("where").innerHTML = "  "+where[lan];
                    document.getElementById("tickets_sp_label").innerHTML = "   "+ticket_tabbar_label[lan];
                    document.getElementById("TotalPrice").innerHTML = " " +total_price_label[lan] + "0€";
                    document.getElementById("bookTickets").innerHTML = book_label[lan];
                    document.getElementById("createdby").innerHTML = created_by_label[lan];


                  CreatedBy(user_id,title);
                  tickets(idevento);
                  
                }
            });
  });
}

function CreatedBy(user_id,title){
    $.getJSON("https://homeserverngg.ddns.net/api/users/"+user_id+"/", function(result){
      document.querySelector("#promoter").innerHTML =""+result.username+ "<a style = 'text-decoration:none; color: #CA5116' href='mailto:"+result.email+"?subject="+title+"'><br>"+contact_label[lan]+"</a>";
      });

}
function tickets(idevento){
    id_ticket_global.length = 0;
    ticket_price_global.length = 0;

    $.getJSON("https://homeserverngg.ddns.net/api/event/"+idevento+"/tickets/", function(result){
      console.log(result);
      $.each(result,function(i,field){
        available = field.num_tickets - field.num_bought;
        var ticket = document.createElement("div");
        ticket.innerHTML = " \
        <ons-list-item>\
        <div class='center'>\
          <strong>"+field.ticket_type+"</strong>\
          <span class='list-item__subtitle'>"+disponibilita_label[lan]+":"+available+"<br></span>\
          <span class='list-item__subtitle'>"+price_label[lan]+": "+field.price+"€<br></span>\
        </div>\
        <div class = 'right'>\
          <ons-select class='select' >\
            <select id = 'tick"+field.id+"' onchange = 'UpdateTotalPrice()'>\
              <option value = '0'>0</option>\
              <option value = '1'>1</option>\
              <option value = '2'>2</option>\
              <option value = '3'>3</option>\
              <option value = '4'>4</option>\
            </select>\
          </ons-select>\
        <div>\
        </ons-list-item>\
        "
        id_ticket_global.push(field.id);
        ticket_price_global.push(field.price);
        tickets_list.append(ticket);
        for(i = 0; i < id_ticket_global.length; i++){ //inizializzo a zero il vettore delle selezioni in modo da memorizzare gli ordini e calcolare il prezzo totale
          selection[i] = 0; 
        };
      });
    });
    console.log(id_ticket_global);
    console.log(ticket_price_global);
}

function UpdateTotalPrice(){

  partialPrice = [];

  totalPrice = 0;
  for(i = 0; i < id_ticket_global.length; i++){
    var selected = document.getElementById("tick"+id_ticket_global[i]).value;
    selection[i] = selected;
    partialPrice[i] = selected * ticket_price_global[i];
  }
  console.log(partialPrice);

  for (i = 0; i < partialPrice.length; i++){
    totalPrice = totalPrice + partialPrice[i];
  }
  document.getElementById("TotalPrice").innerHTML = " "+total_price_label[lan]+""+totalPrice+ "€";
  partialPrice.length = 0;
}
//Mettere un JSON anche qui, lo stato pagato deve essere passato quando l'acquisto va a buon fine
function CheckOut(){
  check(); //must be logged-in;
  // var payed = "Payed"; //status 1 means payed
  // bookTickets(payed);
  alert("Prezzo totale da pagare: " + totalPrice + "€ per l'evento: " +id_evento_global);
}

function bookTickets(payed = "not payed"){
  check(); //must be logged-in so I also check if the user_id is correctly inserted.
  var valid = 0;
  if(typeof user_id !== 'undefined'){
    for(i = 0; i < selection.length; i++){
      if (selection[i] != 0){
        valid++;
      }
    };
    if (valid > 0){
      var order = {};
      order.event_id = parseInt(id_evento_global);
      order.user_id = parseInt(user_id);
      order.total_price = parseInt(TotalPrice);
      order.status = payed;
      order.selected_tickets = [];
      for(i = 0; i < selection.length; i++){
      order.selected_tickets[i] = {};
      order.selected_tickets[i].ticket_id = parseInt(id_ticket_global[i]);
      order.selected_tickets[i].quantity = parseInt(selection[i]);
      };
      //DOVREBBE ESSERE UN JSON, FATTO SOLO PER IL TESTING LOCALE DI TICKETPAGE.
    } else {document.getElementById("NoTickets").show()};
  }
  booking = JSON.stringify(order);
  sendJSON(booking);



}
//Nascondi dialogo prenotazione con successo
function hideAlertDialog(){
  document.getElementById("ConfirmBooking").hide();
  document.getElementById("NoTickets").hide();
  document.getElementById("WrongCredentials").hide();

}

function sendJSON(booking){ 
               
  // Creating a XHR object 
  let xhr = new XMLHttpRequest(); 
  let url = "https://homeserverngg.ddns.net/api/create-booking/"; 

  // open a connection 
  xhr.open("POST", url, true); 

  // Set the request header i.e. which type of content you are sending 
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("x-access-token", token);

  // Create a state change callback 
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        POST_BOOKING_response = json.result;
        if (POST_BOOKING_response == "booking completed"){
          document.getElementById("ConfirmBooking").show();
        }
    }
};
  // Sending data with the request 
  xhr.send(booking); 
} 
