$(document).ready(function(){

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

    //Avslutt Input[type=date] endringer

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

    //Kode for å endre antall reisende

    var liste = ["travellerSelector1", "travellerSelector2", "travellerSelector3",
        "travellerSelector4", "travellerSelector5", "travellerSelector6",
        "travellerSelector7", "travellerSelector8", "travellerSelector9"];

    for (var i = 0; i < liste.length; i++) {
        if (i != 0) {
            $("#travellerSelector" + i).hide();
        }
    }

    var antReisende = 0;
    var originaltAntReisende = 0;


    $("#amountOfPassengers:text").val(antReisende + 1);

    $("#amountPlus").click(function () {
        if (antReisende < 8) {
            antReisende++;
            $("#travellerSelector" + antReisende).show();
            $("#amountOfPassengers:text").val(antReisende + 1);
        }
    });

    $("#amountMinus").click(function () {
        if (antReisende > 0) {
            $("#travellerSelector" + antReisende).hide();
            antReisende--;
            $("#amountOfPassengers:text").val(antReisende + 1);
        }
    });

    $("#okReisende").click(function () {
        originaltAntReisende = antReisende;
        $("#reisende-box-wrapper").slideToggle();
        $(".bestilling-wrapper").toggleClass("disableWindow");
        if (antReisende == 0) {
            $("#reisendeLabel").text("1 person");
        } else {
            $("#reisendeLabel").text((antReisende + 1) + " personer");
        }
    });

    $("#avbrytReisende").click(function () {
        antReisende = originaltAntReisende;
        $("#reisende-box-wrapper").slideToggle("medium", function () {
            for (var i = 0; i < liste.length; i++) {
                if (i != 0) {
                    $("#travellerSelector" + i).hide();
                }
            }

            for (var i = -1; i < antReisende; i++) {
                $("#travellerSelector" + (i + 1)).show();
                $("#amountOfPassengers:text").val(i + 2);
            }
        });
        $(".bestilling-wrapper").toggleClass("disableWindow");
    });

    // Avslutt kode for antall reisende

    //Kode for andre behov

    $("#rullestolLabel").hide();
    $("#kjaeledyrlLabel").hide();

    var rChecked = 0;
    var kChecked = 0;

    $("#okBehov").click(function () {
        $("#andre-behov-wrapper").slideToggle();

        if (document.getElementById("cbRullestol").checked) {
            $("#rullestolLabel").show();
            rChecked = 1;
        } else {
            $("#rullestolLabel").hide();
            rChecked = 0;
        }

        if (document.getElementById("cbKjaeledyr").checked) {
            $("#kjaeledyrlLabel").show();
            kChecked = 1;
        } else {
            $("#kjaeledyrlLabel").hide();
            kChecked = 0;
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

