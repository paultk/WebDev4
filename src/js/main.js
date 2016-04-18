$(document).ready(function(){

    var struktur = {};

    //Input[type=date] endringer

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //Januar er 0
    var yyyy = today.getFullYear();
    if(dd<10){dd='0'+dd}
    if(mm<10){mm='0'+mm}

    today = yyyy+'-'+mm+'-'+dd;

    var tomorrow = new Date();
    tomorrow = yyyy+'-'+mm+'-'+(dd + 1);

    $("#inputKalFra").val(today);
    $("#inputKalTil").val(tomorrow);

    $("#inputKalFra").prop("min", today);
    $("#inputKalTil").prop("min", tomorrow);

    struktur.fraReise = today;
    struktur.tilReise = tomorrow;

    $("#inputKalFra").on("input", function () {
        struktur.fraReise = document.getElementById("inputKalFra").value;
        console.log(struktur.fraReise + ", " + struktur.tilReise);
    });

    $("#inputKalTil").on("input", function () {
        struktur.tilReise = document.getElementById("inputKalTil").value;
        console.log(struktur.fraReise + ", " + struktur.tilReise);
    });

    //Avslutt Input[type=date] endringer

    //Vise/skjule endre-vinduer

    $(".content-shower").hide();

    $("#endreReisende").click(function () {
        $("#reisende-box-wrapper").slideToggle();
        $(".bestilling-wrapper").toggleClass("disableWindow");
    });

    $("#endreAndreBehov").click(function () {
        $("#andre-behov-wrapper").slideToggle();
        $(".bestilling-wrapper").toggleClass("disableWindow");
    });

    $("#endreOvernatting").click(function () {
        $("#overnatting-box-wrapper").slideToggle();
        //$(".bestilling-wrapper").toggleClass("disableWindow");
    });

    //Avslutt kode for vise/skjule endre-vinduer

    //Kode for å endre antall reisende

    struktur.voksen = 0;
    struktur.barn = 0;
    struktur.honnor = 0;
    struktur.student = 0;

    var liste = ["travellerSelector1", "travellerSelector2", "travellerSelector3",
        "travellerSelector4", "travellerSelector5", "travellerSelector6",
        "travellerSelector7", "travellerSelector8", "travellerSelector9"];

    for (var i = 0; i < liste.length; i++) {
        if (i != 0) {
            $("#travellerSelector" + (i+1)).hide();
            console.log(i);
        }
    }

    var antReisende = 1;
    var originaltAntReisende = 1;


    $("#amountOfPassengers:text").val(antReisende);

    $("#amountPlus").click(function () {
        if (antReisende < 9) {
            antReisende++;
            $("#travellerSelector" + (antReisende)).show();
            $("#amountOfPassengers:text").val(antReisende);
        }
    });

    $("#amountMinus").click(function () {
        if (antReisende > 1) {
            $("#travellerSelector" + antReisende).hide();
            antReisende--;
            $("#amountOfPassengers:text").val(antReisende);
        }
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
            } else if ($("#travellerSelector" + (i)).val() == "Barn") {
                struktur.barn++;
            } else if ($("#travellerSelector" + (i)).val() == "Honnør") {
                struktur.honnor++;
            } else if ($("#travellerSelector" + (i)).val() == "Student") {
                struktur.student++;
            }
        }
        console.log("Voksen: " + struktur.voksen);
        console.log("Barn: " + struktur.barn);
        console.log("Honnør: " + struktur.honnor);
        console.log("Student: " + struktur.student);
    });

    $("#avbrytReisende").click(function () {
        antReisende = originaltAntReisende;
        $("#reisende-box-wrapper").slideToggle("medium", function () {
            for (var i = 0; i < liste.length; i++) {
                if (i != 0) {
                    $("#travellerSelector" + i).hide();
                }
            }

            for (var i = 0; i < antReisende; i++) {
                $("#travellerSelector" + (i)).show();
                $("#amountOfPassengers:text").val(i + 1);
            }
        });
        $(".bestilling-wrapper").toggleClass("disableWindow");
    });

    // Avslutt kode for antall reisende

    //Kode for andre behov

    $("#rullestolLabel").hide();
    $("#kjaeledyrlLabel").hide();

    var rChecked = false;
    var kChecked = false;
    
    struktur.rullestol = false;
    struktur.kjaeledyr = false;

    $("#okBehov").click(function () {
        $("#andre-behov-wrapper").slideToggle();

        if (document.getElementById("cbRullestol").checked) {
            $("#rullestolLabel").show();
            rChecked = true;
            struktur.rullestol = true;
        } else {
            $("#rullestolLabel").hide();
            rChecked = false;
            struktur.rullestol = false;
        }

        if (document.getElementById("cbKjaeledyr").checked) {
            $("#kjaeledyrlLabel").show();
            kChecked = true;
            struktur.kjaeledyr = true;
        } else {
            $("#kjaeledyrlLabel").hide();
            kChecked = false;
            struktur.kjaeledyr = false;
        }

        $(".bestilling-wrapper").toggleClass("disableWindow");
    });

    $("#avbrytBehov").click(function () {
        $("#andre-behov-wrapper").slideToggle("medium", function () {
            if (rChecked == 1) {
                $("#cbRullestol").prop("checked", true);
            } else {
                $("#cbRullestol").prop("checked", false);
            }

            if (kChecked == 1) {
                $("#cbKjaeledyr").prop("checked", true);
            } else {
                $("#cbKjaeledyr").prop("checked", false);
            }
        });
        $(".bestilling-wrapper").toggleClass("disableWindow");
    });

    //Avslutt kode for andre behov
});

