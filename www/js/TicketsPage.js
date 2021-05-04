//funzione per prendere i biglietti acquistati e le prenotazioni effettuate da 
//un utente. Attualmente funziona il locale senza il fetch di JSON

//Scaricare il JSON, salvarlo in un vettore in modo da non dover richiamare la api ogni volta che
//tocco un evento singolo

//Create the list of all the purchase of a single user
function fetchSoldList(){
    prenotazioni = [];
    let xhr = new XMLHttpRequest();
    let url = "https://homeserverngg.ddns.net/api/user-bookings/"; 
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("x-access-token", token);
    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            var JSONBooking = JSON.parse(xhr.responseText);
            console.log("Prenotazioni JSON" + JSON.parse(xhr.responseText));
            JSONBooking.forEach(function(item){
                prenotazioni.push(item);
                var title;
                var date; 
                CompleteEventsList.forEach(function(evento){
                    if (evento.id == item.event_id){
                        title = evento.title;
                        var data = evento.event_date;
                        var day = new Date(data.replace(' ','T')).getDate();
                        var month = new Date(data.replace(' ','T')).getMonth();
                        var year = new Date(data.replace(' ','T')).getFullYear();
                        date = "" +day+" "+monthNames[month]+" "+year+"";
                    }
                });
                var stato;
                var status_nowhitespace = item.status.replace(/\s/g, "");
                if (item.status == "not payed"){
                    stato = status_label[lan];
                } else {stato = "Pagato"};
                var purchase= document.createElement("div");
                purchase.innerHTML = "\
                <ons-gesture-detector>\
                <ons-list-item id ="+item.event_id+user_id+status_nowhitespace+" class='purchase' tappable onclick='touchPurchase(this.id)'>\
                <div class = 'right'>\
                    <p>"+item.total_price+"€</p>\
                </div>\
                <span class='list-item__title'><strong>"+title+"</strong></span>\
                <span class='list-item__subtitle'>"+date+"</span>\
                <span class='list-item__subtitle'>"+stato+"</span>\
                </ons-list-item>\
                </ons-gesture-detector>";
                sold_list.append(purchase);
            });
        }
      } 
    data = '{ "user_id": '+user_id+'}'; 
    console.log(data);
    xhr.send(data); 
 } 






function singlePurchase(purchaseID){

    prenotazioni.forEach(function(item){
        var status_nowhitespace = item.status.replace(/\s/g, "");

        var ID = item.event_id + user_id + status_nowhitespace;

        if (purchaseID == ID){
            var biglietti_validi = 0;
            item.selected_tickets.forEach(function(selected_tickets){
                if (selected_tickets.quantity > 1){
                    biglietti_validi = biglietti_validi + 1;
                }
            });
            if (biglietti_validi > 1){
                document.getElementById("altribiglietti").innerHTML = "Scorri per altri biglietti";
            };

            item.selected_tickets.forEach(function(ticket){
                if (ticket.quantity != 0){
                    //Fetch del nome del biglitto
                    $.getJSON("https://homeserverngg.ddns.net/api/ticket/"+ticket.ticket_id+"/",function(result){
                        var ticket_type = result.ticket_type;
                        qrcode_id = item.event_id + user_id + ticket.ticket_id;
                        setTicketsPage(item, ticket, qrcode_id, ticket_type); //create the page with the carousel and the qr code
                        var qrcode_content = {"event_id": item.event_id, "user_id":user_id,"ticket_id":ticket.ticket_id, "status": item.status};
                        qrcode_content = JSON.stringify(qrcode_content);
                        drawQRCode(qrcode_content,qrcode_id);
                    });
                }
            })
        }
    });
}

function setTicketsPage(item,ticket, qrcode_id, ticket_type){

    var status;
    if(item.status == "not payed"){
        var status = not_payed_reservation[lan];
    }
    if(item.status == "payed"){
        var status = payed_reservation[lan];
    }
    //Fetch dei dettagli dell'evento
    var title;
    var luogo;
    var date;
    var time_from;
    CompleteEventsList.forEach(function(evento){
        if (evento.id == item.event_id){
            title = evento.title;
            var data = evento.event_date;
            var day = new Date(data.replace(' ','T')).getDate();
            var month = new Date(data.replace(' ','T')).getMonth();
            var year = new Date(data.replace(' ','T')).getFullYear();
            time_from = evento.time_from.replace(/(.*)\D\d+/, '$1');
            date = "" +day+" "+monthNames_eng[month]+" "+year+"";
            luogo = evento.location;
        }
    });

    var qrcodepage = document.createElement("ons-carousel-item");
    qrcodepage.innerHTML="\
    <ons-card>\
    <div class = 'section_title'>\
        <p style = 'font-size:30;text-transform: uppercase;'><b>"+title+"</b></p>\
    </div>\
    <div><p></p></div>\
    <div>\
    <div style = 'float:left;width:50%' class = 'div_ticket'>\
        <p><b>"+where_2[lan]+":</b></p>\
        <p2>"+luogo+"</p2>\
    </div>\
    <div style = 'float:right;width:50%' class = 'div_ticket'>\
        <p><b>"+day_label_2[lan]+":</b></p>\
        <p2>"+date+"</p2>\
    </div>\
    </div><div style = 'clear:both;'></div>\
    <p></p>\
    <div>\
    <div style = 'float:left;width:50%' class = 'div_ticket'>\
        <p><b>"+type_label[lan]+":</b></p>\
        <p2>"+ticket_type+"</p2>\
    </div>\
    <div style = 'float:left;width:40%' class = 'div_ticket'>\
        <p><b>"+quantity_label[lan]+":</b></p>\
        <p2>"+ticket.quantity+"</p2>\
    </div>\
    </div><div style = 'clear:both;'></div>\
    <p></p>\
    <div style = 'float:left;width:100%' class = 'div_ticket'>\
        <p><b>"+start_label_2[lan]+": </b>"+time_from+"</p>\
        <p3>"+validity_label[lan]+"</p3>\
    </div>\
    <p></p>\
    <div style = 'clear:both;'></div>\
        <p style='color:#581c0c;text-align: center;'>"+status+"</p>\
    <div class = 'qrcode' id = "+qrcode_id+"></div>\
    <div class = 'wrapper'><img src='img/icon_tickets.png' width = '20%' alt='' /></div>\
    </ons-card>";
    carouselTickets.append(qrcodepage);
}

function drawQRCode(content, output_id){
        qrcode = new QRCode(output_id, {
        text: content,
        width: 177,
        height: 177,
        colorDark : "#581c0c",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.L
    });

}


