let username = document.getElementById("usn") ;
let password = document.getElementById("pswd") ;
let connexion = document.getElementById("cnx") ;

let error = document.getElementById("error") ;

connexion.addEventListener("click" , function(){
    if(username.value == "admin" && password.value == "admin"){
        error.innerHTML = "" ;
        window.location.href = "dashboard.html" ;
    }
    else if(username.value != "admin" && password.value != "admin")
        error.innerHTML = "the username and password are incorrect !!!" ;
    else if(username.value != "admin")
        error.innerHTML = "the username is incorrect !!!" ;
    else
        error.innerHTML = "the password is incorrect !!!" ;
})