$("#city-input").keypress(function(e){
    if (e.which == 13){
        $("#search-button").click();
    }
});

$("#search-button").click(function(){
    cityName = $("#city-input").val().trim().toLowerCase().replace(/\b[a-z]/g, function(txtVal) {
        return txtVal.toUpperCase();
    });    
    let apiKey = "c5f2523844ee1178a0e74a7c87427cf4";
    let apiURL = "https://api.openweathermap.org/data/2.5/weather?q="
    + cityName + "&units=imperial&appid=" + apiKey;

    fetch(apiURL).then(function(response){
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                logSearchHistory();
                
                const date = new Date(data.dt*1000);
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const year = date.getFullYear();
                let currentWeatherIcon = data.weather[0].icon;

                $("#city-name").text(data.name + " | " + month + "/" + day + "/" + year);
                $("#current-weather-icon").attr("src", "https://openweathermap.org/img/wn/" + currentWeatherIcon + "@2x.png");
                $("#current-weather-icon").attr("alt", data.weather[0].description);

                $("#temperature").text(data.main.temp + " °F");
                $("#humidity").text(data.main.humidity + "%");
                $("#wind-speed").text(data.wind.speed + " MPH")
            });
        } else {
            alert("You may have entered an invalid city name or weather services may be down. Please try again.");
        }
    });

    $("#city-input").val("");
});

$(document).on('click',"#history-delete",function() {
    $(this).parents("#history-container").remove();
});

function logSearchHistory() {
    searchHistoryEl = `<div class="forecast row bg-primary text-white mx-0 my-3 rounded" id="history-container">
    <div class="col d-flex justify-content-center"> ${cityName} </div>
    <div class="col-1 d-flex justify-content-end pt-1">
    <i class="fas fa-minus-circle" id="history-delete"></i></div></div>`
    $("#search-history").prepend(searchHistoryEl);
}