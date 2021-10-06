$("#city-input").keypress(function(e){
    if (e.which == 13){
        $("#search-button").click();
    }
});

$("#search-button").click(function(){
    cityName = $("#city-input").val().trim().toLowerCase().replace(/\b[a-z]/g, function(txtVal) {
        return txtVal.toUpperCase();
    });    
    apiKey = "c5f2523844ee1178a0e74a7c87427cf4";
    apiURL = "https://api.openweathermap.org/data/2.5/weather?q="
    + cityName + "&units=imperial&appid=" + apiKey;
    console.log(cityName)

    fetch(apiURL).then(function(response){
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                logSearchHistory();
            });

            $("#city-input").focus(function(){
                $(this).val("");
            });
        } else {
            alert("You may have entered an invalid city name or weather services may be down. Please try again.");
        }
    });
});

function logSearchHistory() {
    searchHistoryEl = '<div class="forecast col text-center bg-primary text-white mx-0 my-3 rounded">' + cityName + '</div>';
    $("#search-history").append(searchHistoryEl);
    
}