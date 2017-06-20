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
       // nearbySearch(myLatLng,"church");

        searchGirls(latval, lngval);
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

    function createMarker(latlng, icn, name) {
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon:icn,
            title: name
        });
    }


// nearby search
   /* function nearbySearch(myLatLang, type) {
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

    } */


   function searchGirls(lat,lng){
       $.post('http://localhost/kipya/public/api/searchGirls',{lat:lat, lng:lng},function(match){
           //console.log(match);

           $.each(match,function(i,val){
               var glatval = val.lat;
               var glngval = val.lng;
               var gname = val.name;

               var GLatLng = new google.maps.LatLng(glatval, glngval);
               var gicn = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

               createMarker(GLatLng,gicn,gname);
           });

       });
   }

});