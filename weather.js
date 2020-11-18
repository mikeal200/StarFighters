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
            //not needed
            console.log(data);
            //outputs weather conditions https://openweathermap.org/weather-conditions#How-to-get-icon-URL 
            console.log(data.weather[0]["main"]);
            weatherCon(data.weather[0]["main"]);
        })
        .catch(function() {

        });
    });
}
else {
    //default map?
}

function weatherCon(con) {
    if(con == "Thunderstorm") {
        //map = thunderstorm;
    }
    else if(con == "Drizzle") {
        //map = drizzle;
    }
    else if(con == "Rain") {
        //map = rain;
    }
    else if(con == "Snow") {
        //map = snow;
    }
    else if(con == "Clear") {
        //map = clear;
        console.log("a");
    }
    else if(con == "Clouds") {
        //map = clouds;
    }
    else {
        //map = fog;
    }
}

