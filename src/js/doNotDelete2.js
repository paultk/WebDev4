/**
 * Created by John on 18-Apr-16.
 */

$(document).ready(function(){

    $(".tilleggsvalg").change(function(){
        var sum = 0;
        if ($("#laken").is(':checked')) {
            sum += 40;
        }
        if ($("#instruktor").is(':checked')) {
            sum += 500;
        }
        if ($("#heiskort").is(':checked')) {
            sum += 250;
        }
        $("#sumlabel").text("Sum: " + sum + "kr");
    });
    $(".tilleggsvalg").change(function(){
        var sum = 0;
        if ($("#laken").is(':checked')) {
            sum += 40;
        }
        if ($("#instruktor").is(':checked')) {
            sum += 500;
        }
        if ($("#heiskort").is(':checked')) {
            sum += 250;
        }
        $("#sumlabel").text("Sum: " + sum + "kr");
    });
    $("#sumlabel").replaceWith("Voksne: " + sessionStorage.getItem("voksen") + "<br>Barn: " + sessionStorage.getItem("barn") +
        "<br>Honnører: " + sessionStorage.getItem("honnor") + "<br>Studenter: " + sessionStorage.getItem("student"));
});
$("#okReisende").click(function () {
    originaltAntReisende = antReisende;
    $("#reisende-box-wrapper").slideToggle();
    $(".bestilling-wrapper").toggleClass("disableWindow");
    if (antReisende == 1) {
        $("#reisendeLabel").text("1 person");
    } else {
        $("#reisendeLabel").text(antReisende + " personer");
    }

    struktur.voksen = 0;
    struktur.barn = 0;
    struktur.honnor = 0;
    struktur.student = 0;

    for (var i = 0; i <= antReisende; i++) {
        if ($("#travellerSelector" + (i)).val() == "Voksen") {
            struktur.voksen++;
        } else if ($("#travellerSelector" + i).val() == "Barn") {
            struktur.barn++;
        } else if ($("#travellerSelector" + i).val() == "Honnør") {
            struktur.honnor++;
        } else if ($("#travellerSelector" + i).val() == "Student") {
            struktur.student++;
        }
    }
    sessionStorage.setItem("voksen", struktur.voksen);
    sessionStorage.setItem("barn", struktur.barn);
    sessionStorage.setItem("honnor", struktur.honnor);
    sessionStorage.setItem("student", struktur.student);



    console.log("Voksen: " + struktur.voksen);
    console.log("Barn: " + struktur.barn);
    console.log("Honnør: " + struktur.honnor);
    console.log("Student: " + struktur.student);
});
