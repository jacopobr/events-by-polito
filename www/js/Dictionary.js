var lan = 1;
var nav_bar_title = ["Eventi", "Events"];
var events_tabbar_label = ["Eventi", "Events"];
var ticket_tabbar_label = ["Biglietti", "Tickets"];
var user_ticket_label = ["Utente","User"];
var category_name = ["Tutti","All"];
var music_list_exp = ["Musica", "Music"];
var theatre_list_exp = ["Teatro", "Theatre"];
var culture_list_exp = ["Cultura", "Culture"];
var cinema_list_exp = ["Cinema", "Movies"];
var others_list_exp = ["Altro", "Other"];
var description_subtitle = ["Descrizione", "Content"];
var date_time = ["Data e ora", "Date and time:"];
var day_label = ["Giorno", "Day"];
var start_label = ["Ora inizio","Starting time"];
var end_label = ["Ora fine", "End time"];
var location_label = ["Luogo", "Location"];
var city_label = ["Città", "City"];
var address_label = ["Indirizzo", "Address"];
var where = ["Dove", "Where"];
var total_price_label = ["Prezzo totale:", "Total price: "];
var check_out_label = ["Paga ora!", "Pay now!"];
var book_label = ["Prenota ora, paga dopo!", "Book now, pay later!"];
var created_by_label = ["Creato da: ", "Created by:"];
var contact_label = ["(Contatta)", "(Get in touch)"];
var disponibilita_label = ["Disponibilità", "Available"];
var price_label = ["Prezzo","Price"];
var sign_up_label = ["Registrati", "Sign up"];
var password_forgotten = ["Hai dimenticato la password?", "Did you forget your password?"];
var jump_label = ["Salta" , "Not now"];
var status_label = ["Non ancora pagato","Not payed yet"];
var not_payed_reservation = ["La prenotazione non è ancora stata pagata! Ricordati di passare in cassa prima di avviarti verso il gate!", "You still have not payed. Pay at the register before going to the gate."];
var payed_reservation = ["La tua prenotazione è già stata pagata, dirigiti direttamente verso il gate","You have already payed. Go to the access gate and scan your ticket"];
var wrong_credential_dialog = ["Credenziali sbagliate!", "Wrong credentials!"];
var type_label = ["TIPOLOGIA", "TYPE"];
var quantity_label = ["QUANTITA'","QUANTITY"];
var validity_label = ["Il biglietto sarà valido a partire da mezz'ora prima dell'inizio dell'evento.", " Ticket will be valid from half an hour before the start of the event."];
var start_label_2 = ["ORARIO INIZIO", "STARTING TIME"];
var day_label_2 = ["DATA", "DATE"];
var where_2 = ["DOVE", "WHERE"];
var contact_us_label = ["Contattaci", "Contact us"];

function SetLanguage(id){
    if (id == "ita"){
        lan = 0;
    }
    if (id == "eng"){
        lan = 1;
    }
    all_events();

    //Setting Elements
    document.querySelector("#EventsLabel").setAttribute('label', events_tabbar_label[lan]);
    document.querySelector("#tickets_page").setAttribute("label", ticket_tabbar_label[lan]);
    document.querySelector("#UserLabel").setAttribute("label", user_ticket_label[lan]);
    document.getElementById("category_name").innerHTML = category_name[lan];
    document.getElementById("all").innerHTML = category_name[lan];
    document.getElementById("music").innerHTML = music_list_exp[lan];
    document.getElementById("theatre").innerHTML = theatre_list_exp[lan];
    document.getElementById("culture").innerHTML = culture_list_exp[lan];
    document.getElementById("cinema").innerHTML = cinema_list_exp[lan];
    document.getElementById("others").innerHTML = others_list_exp[lan];
    document.getElementById("ContactUs").innerHTML = contact_us_label[lan];

}

document.addEventListener('init', function(event) {
  
    var page = event.target;
    if (page.matches('#login')) {
      page.querySelector('#Signup').innerHTML = sign_up_label[lan];
      page.querySelector('#ForgotPassword').innerHTML = password_forgotten [lan];
      page.querySelector('#Jump').innerHTML = jump_label[lan];
    }

    if (page.matches('#tickets')){
        
    }

    if (page.matches('#user')){
        document.querySelector('#ita').innertHTML = "prova";
        document.getElementById('eng').innertHTML = "prova";
    }
  });