
function change_view() {
    var button_value = document.getElementById('changeview').innerHTML;
    console.log(button_value);
    if(button_value == "Referenz Anmelden"){
        document.getElementById('changeview').innerHTML = "Admin Anmelden"
        document.getElementById('login-admin').classList.add("login_hide")
        document.getElementById('login-referenz').classList.remove("login_hide")
    }else{
        document.getElementById('changeview').innerHTML = "Referenz Anmelden"
        document.getElementById('login-referenz').classList.add("login_hide")
        document.getElementById('login-admin').classList.remove("login_hide")
    }
}