/**
 * Created by paul thomas on 18.04.2016.
 */

$(document).ready(function () {
    

    var travellers = [];

    var travellerSelector = document.getElementById("travellerSelector");


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
    })
});
