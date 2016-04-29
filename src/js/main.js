$(document).ready(function(){

    var struktur = {};

    $(".submit").addClass("disableWindow");

    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    $("#inputKalFra").val(today.toISOString().substring(0, 10));
    $("#inputKalTil").val(tomorrow.toISOString().substring(0, 10));

    $("#inputKalFra").prop("min", today);
    $("#inputKalTil").prop("min", tomorrow);

    struktur.fraReise = today.toISOString().substring(0, 10);
    struktur.tilReise = tomorrow.toISOString().substring(0, 10);

    sessionStorage.setItem("fraReise",struktur.fraReise);
    sessionStorage.setItem("tilReise",struktur.tilReise);

    $("#inputKalFra").on("input", function () {
        struktur.fraReise = document.getElementById("inputKalFra").value;
        var date1 = new Date(struktur.fraReise);
        var date2 = new Date(struktur.tilReise);
        var timeDiff = date2.getTime() - date1.getTime();
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        console.log(diffDays);
        if(diffDays < 0) {
            console.log("hei");
            $("#feilDato").text("Vennligst velg en dato etter reisedato!");
        }
        else if(diffDays < 3)
            $("#feilDato").text("Reisen din er for kort!");
        else
            $("#feilDato").text("");
        sessionStorage.setItem("fraReise",struktur.fraReise);
        validerInfo();
    });

    $("#inputKalTil").on("input", function () {
        struktur.tilReise = document.getElementById("inputKalTil").value;
        var date1 = new Date(struktur.fraReise);
        var date2 = new Date(struktur.tilReise);
        var timeDiff = date2.getTime() - date1.getTime();
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        console.log(diffDays);
        if(diffDays < 0) {
            console.log("hei");
            $("#feilDato").text("Vennligst velg en dato etter reisedato!");
        } else if(diffDays < 3)
            $("#feilDato").text("Reisen din er for kort!");
        else
            $("#feilDato").text("");
        sessionStorage.setItem("tilReise",struktur.tilReise);
        validerInfo();
    });

    //Avslutt Input[type=date] endringer

    //Lagre destinasjonsinput

    struktur.dest = "";

    $("#inputDest").change(function () {
        struktur.dest = $(this).val();
        console.log(struktur.dest);
        validerInfo();
    });

    //Avslutt destinasjonsinput

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
        $(".bestilling-wrapper").toggleClass("disableWindow");
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
        validerInfo();
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

    /*Overnatting, hyttebilder*/

    $(".previousPicture, .nextPicture, .hytteAlbum, .velgHytte").hide();
    var imageVariable = 4;

    $(".previousPicture").click(function () {
        if (imageVariable == 4) {
            imageVariable = 6;
            var element = document.getElementById("slider");
            var imageUrl = 'js/Images/hytte' + imageVariable + '.jpg';
            $(element).prop("src", imageUrl);
        } else {
            imageVariable--;
            var element = document.getElementById("slider");
            var imageUrl = 'js/Images/hytte' + imageVariable + '.jpg';
            $(element).prop("src", imageUrl);
        }
    });

    $(".nextPicture").click(function () {
        if (imageVariable == 6) {
            imageVariable = 3;
        }
        imageVariable++;
        var element = document.getElementById("slider");
        var imageUrl = 'js/Images/hytte' + imageVariable + '.jpg';
        $(element).prop("src", imageUrl);
    });

    var currentCabin;
    var valgtHytte = "";
    var hyttePrisen = 0;
    struktur.hytte = "";
    struktur.hyttePris = 0;

    $(".hyttelink").click(function () {
        $(".previousPicture, .nextPicture, .hytteAlbum, .velgHytte, #hytteValgt").show();
        console.log(this.id);
        currentCabin = this.id;
        var txt = "";
        $.ajax({
            type: "GET",
            url: "hytter.xml",
            dataType: "xml",
            success: function (xml) {
                txt += "<div id='hytteValgt'>";
                $(xml).find(currentCabin).each(function () {
                    txt += "<h1>" + $(this).find("navn").text() +
                        "</h1><h3>" + $(this).find("bakkeplassering").text() + "</h3><div><p>" + $(this).find("info").text() +
                        "</p></div>";
                    hyttePrisen = parseInt($(this).find("pris").text());
                });
                txt += "</div>";
                console.log(txt);
                $(".hytteValgt").html(txt);

            }
        });
    });

    $("#avbrytOvernatting").click(function () {
        $("#overnatting-box-wrapper").slideToggle("medium", function () {
            if (valgtHytte == "") {
                $(".previousPicture, .nextPicture, .hytteAlbum, .velgHytte, #hytteValgt").hide();
            } else if (currentCabin != valgtHytte) {
                currentCabin = valgtHytte;
                var txt = "";
                $.ajax({
                    type: "GET",
                    url: "hytter.xml",
                    dataType: "xml",
                    success: function (xml) {
                        txt += "<div id='hytteValgt'>";
                        $(xml).find(valgtHytte).each(function () {
                            txt += "<h1>" + $(this).find("navn").text() +
                                "</h1><h3>" + $(this).find("bakkeplassering").text() + "</h3><div><p>" + $(this).find("info").text() +
                                "</p></div>";
                        });
                        txt += "</div>";
                        console.log(txt);
                        $(".hytteValgt").html(txt);

                    }
                });
            }
        });
        $(".bestilling-wrapper").toggleClass("disableWindow");
    });

    $("#velgHytteKnapp").click(function () {
        valgtHytte = currentCabin;

        $("#overnatting-box-wrapper").slideToggle();
        $(".bestilling-wrapper").toggleClass("disableWindow");
        $("#overnattingLabel").text("Luksushytte - type " + valgtHytte.substring(5, 6));
        struktur.hytte = "Luksushytte - type " + valgtHytte.substring(5, 6);
        struktur.hyttePris = hyttePrisen;
        sessionStorage.setItem("hytte",struktur.hytte);
        sessionStorage.setItem("hyttePris",struktur.hyttePris);

        validerInfo();
    });

    //Funksjon som sjekker om nødvendig info er fylt ut før man kan gå til betaling

    function validerInfo() {
        if (struktur.fraReise == "" || struktur.tilReise == "" || struktur.dest == "default" ||
            struktur.dest == "" || struktur.barn == 0 && struktur.honnor == 0 &&
            struktur.student == 0 && struktur.voksen == 0 || struktur.hytte == "" ||
            $("#feilDato").val() != "") {
            $(".submit").addClass("disableWindow");
        } else {
            $(".submit").removeClass("disableWindow");
        }
    }

    //

    var sum = 0;
    var faktor = 1;
    var reisende = parseInt(sessionStorage.getItem("voksen")) + parseInt(sessionStorage.getItem("barn")) + parseInt(sessionStorage.getItem("honnor")) +
        parseInt(sessionStorage.getItem("student"));
    var reisendePris = parseInt(sessionStorage.getItem("voksen"))*500 + parseInt(sessionStorage.getItem("barn"))*300 + parseInt(sessionStorage.getItem("honnor")*350) +
        parseInt(sessionStorage.getItem("student"))*340;

    $("#reiseDatoLabel").text(sessionStorage.getItem("fraReise") + " til " + sessionStorage.getItem("tilReise"));
    $("#kvitReise").text(reisende + " person(er):");
    $("#kvitHytte").text(sessionStorage.getItem("hytte") + ": ");

    $("#kvitReisePris").text(reisendePris + " kr");
    $("#kvitHyttePris").text(sessionStorage.getItem("hyttePris") + " kr");

    sum += reisendePris;
    sum += parseInt(sessionStorage.getItem("hyttePris"));
    $("#sumlabel").text(sum + " kr");

    $("#medlem").change(function () {
        if ($("#medlem").is(':checked')) {
            $("#laken, #instruktor, #heiskort").addClass("disableWindow");
            $("#sumlabel").text(Math.round(sum*0.8) + " kr");
        } else {
            $("#laken, #instruktor, #heiskort").removeClass("disableWindow");
            $("#sumlabel").text(sum + " kr");
        }
    })

    $("#laken").change(function () {
        if ($("#laken").is(':checked')) {
            $("#kvitLaken").text("Laken: ");
            $("#kvitLakenPris").text("40,-");
            sum += 40;
        } else if (!$("#laken").is(':checked')) {
            $("#kvitLaken").text("");
            $("#kvitLakenPris").text("");
            sum -= 40;
        }
        $("#sumlabel").text(sum + " kr");
    });

    $("#instruktor").change(function () {
        if ($("#instruktor").is(':checked')) {
            $("#kvitInstruktor").text("Instruktør: ");
            $("#kvitInstruktorPris").text("500,-");
            sum += 500;
        } else if (!$("#instruktor").is(':checked')) {
            $("#kvitInstruktor").text("");
            $("#kvitInstruktorPris").text("");
            sum -= 500;
        }
        $("#sumlabel").text(sum + " kr");
    });

    $("#heiskort").change(function () {
        if ($("#heiskort").is(':checked')) {
            $("#kvitHeiskort").text("Heiskort: ");
            $("#kvitHeiskortPris").text("250,-");
            sum += 250;
        } else if (!$("#heiskort").is(':checked')) {
            $("#kvitHeiskort").text("");
            $("#kvitHeiskortPris").text("");
            sum -= 250;
        }
        $("#sumlabel").text(sum + " kr");
    });
});

