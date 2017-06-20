$(document).ready(function(){

    var myLatLng = new google.maps.LatLng(-0.3031, 36.0800);
    var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        scrollwheel: true,
        zoom: 14
    });

    //marker

    function createMarker(latlng) {
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon:icn,
            title: ttl
        });
    }

    var request ={
        location: myLatLng,
        radius: '10500',
        types: ['restaurant']
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

});