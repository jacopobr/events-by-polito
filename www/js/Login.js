var logged_in = 0;
var user_id;
var token;


function check(page_id){
  if (logged_in == 0){
    document.getElementById("navigator").pushPage('login.html').then(SetLanguageLogin());
  }
  if (page_id == "tickets_page"){
    $('#sold_list').empty();
    fetchSoldList();
  }
}

function login() {
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  $.ajax({
		type:"POST",
		url: "https://homeserverngg.ddns.net/api/login/",
		dataType: 'json',
		headers: {
			"Authorization" : "Basic " + btoa(username + ":" + password)
		},
		success: function(result){
      token = result.token;
      //avrei voluto memorizzarli in locale per non dover loggare ogni volta che apro l'applicazione -- #NON FUNZIONA
      window.localStorage.setItem("user_id", result.user_id);
      window.localStorage.setItem("logged_in", 1);
      logged_in = window.localStorage.getItem("logged_in");
      user_id = window.localStorage.getItem("user_id");
      setUserPage(user_id);
      document.getElementById("navigator").popPage();
      $('#sold_list').empty();
      fetchSoldList();
      document.getElementById("WrongCredentialDialog").innerHTML = "";
		},
		error: function(request){
      document.getElementById("WrongCredentials").show();
      document.getElementById("WrongCredentialsDialog").innerHTML = wrong_credential_dialog[lan];
		}
  });
 }

 
function logout(){
  logged_in = 0;
  window.localStorage.clear();
  document.getElementById("navigator").resetToPage("template.html");
  all_events();
}

function forgetPassword(){
  alert(username_a);
}

function skip() {
  document.getElementById("navigator").resetToPage("template.html");
  all_events();
}

function Register(){
  var url = "https://homeserverngg.ddns.net/register/";
  OpenUrlExt.open(url, function(){console.log("ok")}, function(){console.log("not ok")});
}

function forgetPassword(){
  var url = "https://homeserverngg.ddns.net/reset_password";
  OpenUrlExt.open(url, function(){console.log("ok")}, function(){console.log("not ok")});

}


function setUserPage(id_user){
  document.getElementById("ContactUs").innerHTML = contact_us_label[lan];
  $.getJSON("https://homeserverngg.ddns.net/api/users/"+id_user+"/", function(result){
    document.querySelector("#FirstName").innerHTML = result.username;
    document.querySelector("#Email").innerHTML = result.email;
    document.querySelector("#ProfilePic").src = "https://homeserverngg.ddns.net/static/profile_pics/"+result.image_file+"";
    


});}


function SetLanguageLogin(){
  document.getElementById("Signup").innerHTML = sign_up_label[lan];
  document.getElementById("ForgotPassword").innerHTML = passoword_forgotten[lan];
  document.getElementById("Jump").innerHTML = jump_label[lan];
}