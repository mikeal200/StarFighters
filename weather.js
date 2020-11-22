//default map
var map = "clear";

function getMap(_callback) {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
            var lat = pos.coords.latitude;
            var lng = pos.coords.longitude;
            var key = "c8b5444b16d070009eec44413d876405";
            var url = "https://api.openweathermap.org/data/2.5/weather?lat=" 
            + lat + "&lon=" + lng + "&appid=" + key;

            fetch(url)
            .then(function(resp) { return resp.json() })
            .then(function(data) {
                //outputs weather conditions https://openweathermap.org/weather-conditions#How-to-get-icon-URL 
                console.log(data.weather[0]["main"]);
                let con = data.weather[0]["main"];
                weatherCon(con, _callback);
            })
            .catch(function() {

            });
        });
    }
    else {
        //default map
        _callback(map);
    }
}

function weatherCon(con, _callback) {
    switch(con) {
        case "Thunderstorm":
            map = "thunderstorm";
            break;
        case "Drizzle":
            map = "drizzle";
            break;
        case "Rain":
            map = "rain";
            break;
        case "Snow":
            map = "snow";
            break;
        case "Clear":
            map = "clear";
            break;
        case "Clouds":
            map = "clouds";
            break;
        default: 
            map = "fog"
            break;
    }
    _callback(map);
}