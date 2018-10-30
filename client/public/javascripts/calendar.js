function validateForm() {
    var x = document.forms["myForm"]["date_selected"].value;
    if (x == "") {
        alert("Datum muss ausgewählt sein");
        return false;
    }
}