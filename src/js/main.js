$(document).ready(function(){

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

    var amountOfTravellersVariable =  1;
    $("#amountPlus").click(function(){
        if(amountOfTravellersVariable == 9){
        }else {
            amountOfTravellersVariable++;
            $("#amountOfPassengers:text").val(amountOfTravellersVariable);
            $("#travellerSelector" + amountOfTravellersVariable).show();
            console.log(amountOfTravellersVariable);

        }
        ;
    });

    $("#amountMinus").click(function(){
        if(amountOfTravellersVariable == 1){
        }else {
            console.log(amountOfTravellersVariable);
            amountOfTravellersVariable--;
            $("#amountOfPassengers:text").val(amountOfTravellersVariable);
            $("#travellerSelector" + amountOfTravellersVariable).hide();
            console.log(amountOfTravellersVariable);
        }
        ;
    });
});

