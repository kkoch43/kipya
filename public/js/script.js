var map;
var myLatLng;

$(document).ready(function(){

    geolocationInit();

    function geolocationInit(){
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, fail);
        }
            else{
            alert("Browser not supported");
        }
    }

    function success(position){
        console.log(position);
        var latval = position.coords.latitude;
        var lngval = position.coords.longitude;

         myLatLng = new google.maps.LatLng(latval, lngval);

        createMap(myLatLng);
        nearbySearch(myLatLng,"church");
    }

    function fail(){
        alert("it fails");
    }



    //create map
    function createMap(myLatLng) {
         map = new google.maps.Map(document.getElementById('map'), {
            center: myLatLng,
            scrollwheel: true,
            zoom: 14
        });

         var marker = new google.maps.Marker({

                 position: myLatLng,
                 map: map

         });
    }

    //marker

    function createMarker(latlng) {
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon:icn,
            title: ttl
        });
    }


// nearby search
    function nearbySearch(myLatLang, type) {
        var request = {
            location: myLatLng,
            radius: '10500',
            types: [type]
        };

        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);

        function callback(results, status) {

            //console.log(results);
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    var place = results[i];
                    latlng = place.geometry.location;
                    icn = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
                    ttl = place.name;
                    createMarker(latlng, icn);
                }
            }
        }

    }

});