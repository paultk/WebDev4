$(document).ready(function () {


    var traveller1 = null;
    var traveller2 = null;
    var traveller3 = null;
    var traveller4 = null;
    var traveller5 = null;
    var traveller6 = null;
    var traveller7 = null;
    var traveller8 = null;
    var traveller9 = null;

    var travellerSelector = document.getElementById("travellerSelector");


    var firstDiv = document.getElementById("reisende");

    var amountOfTravellersVariable = 1;
    $("#amountPlus").click(function () {
        if (amountOfTravellersVariable == 9) {
        } else {
            amountOfTravellersVariable++;
            $("#amountOfPassengers:text").val(amountOfTravellersVariable);
            $("#travellerSelector" + amountOfTravellersVariable).show();
            console.log(amountOfTravellersVariable);

        }
        ;
    });

    $("#amountMinus").click(function () {
        if (amountOfTravellersVariable == 1) {
        } else {
            console.log(amountOfTravellersVariable);
            amountOfTravellersVariable--;
            $("#amountOfPassengers:text").val(amountOfTravellersVariable);
            $("#travellerSelector" + amountOfTravellersVariable).hide();
            console.log(amountOfTravellersVariable);
        }
        ;
    });

    /*Overnatting, hyttebilder*/

    var imageVariable = 1;


    $("#previousPicture").click(function () {
        if (imageVariable == 1) {
            imageVariable = 5
        }
        imageVariable--;
        var element = document.getElementById("hytteAlbum");
        var imageUrl = 'js/Images/hytte' + imageVariable + '.jpg';
        element.setAttribute('style', 'background: url(' + imageUrl + ');');
    });

    $("#nextPicture").click(function () {
        imageVariable++;
        var element = document.getElementById("hytteAlbum");
        var imageUrl = 'js/Images/hytte' + imageVariable + '.jpg';
        element.setAttribute('style', 'background: url(' + imageUrl + ');');
    });

    $(".hytteBilderClicked").click(function () {
        console.log(this.id);
        var chosenCabin = this.id;
        var txt = "";
        $.ajax({
            type: "GET",
            url: "hytter.xml",
            dataType: "xml",
            success: function (xml) {
                txt += "<div id='hytteValgt'><table border=1>";
                $(xml).find(chosenCabin).each(function () {
                    txt += "<h1>" + $(this).find("navn").text() +
                        "</h1><div>" + $(this).find("info").text() +
                        "</div></div>";
                });
                txt += "</table>";
                console.log(txt);
                $("#hytteValgt").replaceWith(txt);

            }

        });


    })
});




