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
            console.log(data);
            console.log(data.weather[0]["main"]);
        })
        .catch(function() {

        });
    });
}
else {
    //default map?
}

