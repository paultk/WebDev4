$(document).ready(function(){

    var struktur = {};

    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    $("#inputKalFra").val(today.toISOString().substring(0, 10));
    $("#inputKalTil").val(tomorrow.toISOString().substring(0, 10));

    $("#inputKalFra").prop("min", today);
    $("#inputKalTil").prop("min", tomorrow);

    struktur.fraReise = today;
    struktur.tilReise = tomorrow;

    $("#inputKalFra").on("input", function () {
        struktur.fraReise = document.getElementById("inputKalFra").value;
        var date1 = new Date(struktur.fraReise);
        var date2 = new Date(struktur.tilReise);
        var timeDiff = date2.getTime() - date1.getTime();
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if(diffDays < 0)
            $("#feildato").text("Vennligst velg en dato etter reisedato!");
        else if(diffDays < 3)
            $("#feildato").text("Reisen din er for kort!");
        else
            $("#feildato").text("");
        sessionStorage.setItem("fraReise",struktur.fraReise);
    });

    $("#inputKalTil").on("input", function () {
        struktur.tilReise = document.getElementById("inputKalTil").value;
        var date1 = new Date(struktur.fraReise);
        var date2 = new Date(struktur.tilReise);
        var timeDiff = date2.getTime() - date1.getTime();
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if(diffDays < 0)
            $("#feildato").text("Vennligst velg en dato etter reisedato!");
        else if(diffDays < 3)
            $("#feildato").text("Reisen din er for kort!");
        else
            $("#feildato").text("");
        sessionStorage.setItem("tilReise",struktur.tilReise);
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
                $("#travellerSelector" + (i + 1)).show();
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

    for (var i = 1; i < 7; i++) {
        $("#tab" + i).hide();
    }

    $(".hyttelink").click(function () {
        var tall = this.id.substring(5, 6);
        $("#tab" + tall).show();

        for (var i = 1; i < 7; i++) {
            if (i != tall) {
                $("#tab" + i).hide();
            }
        }
    });

    /*Overnatting, hyttebilder*/

    var imageVariable = 1;


    $(".previousPicture").click(function () {
        if (imageVariable == 1) {
            imageVariable = 6;
        }
        imageVariable--;
        var element = document.getElementById("hytteAlbum");
        var imageUrl = 'js/Images/hytte' + imageVariable + '.jpg';
        element.setAttribute('style', 'background: url(' + imageUrl + ');');
    });

    $(".nextPicture").click(function () {
        if (imageVariable == 6) {
            imageVariable = 1;
        }
        imageVariable++;
        var element = document.getElementById("hytteAlbum");
        var imageUrl = 'js/Images/hytte' + imageVariable + '.jpg';
        element.setAttribute('style', 'background: url(' + imageUrl + ');');
    });

    $(".hyttelink").click(function () {
        var chosenCabin = this.id;
        var txt = "";
        $.ajax({
            type: "GET",
            url: "hytter.xml",
            dataType: "xml",
            success: function (xml) {
                txt += "<div id='hytteValgt'>";
                $(xml).find(chosenCabin).each(function () {
                    txt += "<h1>" + $(this).find("navn").text() +
                        "</h1><div>" + $(this).find("info").text() +
                        "</div>";
                });
                txt += "</div>";
                $(".hytteValgt").html(txt);

            }

        });
    })

    //

    $(function () {
       $("#tabs").tabs();
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
    $("#reisepris").html("Voksne: " + sessionStorage.getItem("voksen") + "<br>Barn: " + sessionStorage.getItem("barn") +
    "<br>Honnører: " + sessionStorage.getItem("honnor") + "<br>Studenter: " + sessionStorage.getItem("student") +
        "<br>Fra: " + sessionStorage.getItem("fraReise") + "<br>Til: " + sessionStorage.getItem("tilReise"));
});

