$("#city-input").keypress(function(e){
    if (e.which == 13){
        $("#search-button").click();
    }
});

$("#search-button").click(function(){
    cityName = $("#city-input").val().trim();
    apiKey = "c5f2523844ee1178a0e74a7c87427cf4";
    apiURL = "https://api.openweathermap.org/data/2.5/weather?q="
    + cityName + "&units=imperial&appid=" + apiKey;
    console.log(cityName)

    fetch(apiURL).then(function(response){
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            });

            $("#city-input").focus(function(){
                $(this).val("");
            });
        } else {
            alert("There was an error. Please refresh the page and try again.");
        }
    });
});