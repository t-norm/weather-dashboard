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

                $("#temperature").text("Temperature: " + data.main.temp + " °F");
                $("#humidity").text("Humidity: " + data.main.humidity + "%");
                $("#wind-speed").text("Wind Speed: " + data.wind.speed + " MPH");

                let lat = data.coord.lat;
                let lon = data.coord.lon;
                let UVindexURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&cnt=1";
                fetch(UVindexURL).then(function(response) {
                    response.json().then(function(data) {
                        console.log(data);
                        $("#UV-index").text(data[0].value);
                        switch (true){
                            case (data[0].value < 3):
                                $("#UV-index").attr("class", "low");
                                break;
                            case (data[0].value < 6 && data[0].value >= 3):
                                $("#UV-index").attr("class", "moderate");
                                break;
                            case (data[0].value < 8 && data[0].value >= 6):
                                $("#UV-index").attr("class", "high");
                                break;
                            case (data[0].value < 11 && data[0].value >= 8):
                                $("#UV-index").attr("class", "very-high");
                                break;
                            case (data[0].value >= 11):
                                $("#UV-index").attr("class", "extreme");
                                break;
                        }
                    });
                });

                let fiveDayForecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon="+ lon + "&exclude=current,minutely,hourly,alerts&units=imperial&appid=" + apiKey;
                fetch(fiveDayForecastURL).then(function(response) {
                    response.json().then(function(data) {
                        console.log(data);
                        for (let i = 1; i < 6; i++) {
                            $("#forecast-icon" + i).attr("class", "d-none");
                            $("#day" + i + "icon").attr("class", "cloud col").attr("src", "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png").attr("alt", data.daily[i].weather[0].description);
                            $("#day" + i + "temp").attr("class", "").text("Temp: " + data.daily[i].temp.day + " °F");
                            $("#day" + i + "humidity").attr("class", "").text("Temp: " + data.daily[i].humidity + "%");
                            $("#day" + i + "wind").attr("class", "").text("Wind: " + data.daily[i].wind_speed + " MPH");
                        } 
                    });
                });
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