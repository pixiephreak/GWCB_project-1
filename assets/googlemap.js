    //locations populated by snapshot in app.js
    //FB always returns nested objects, not arrays, so locations is an object now.
    //https://firebase.googleblog.com/2014/04/best-practices-arrays-in-firebase.html
    //save nested objects in array locally or rewrite maps code in order to access data in objects
    var locations;

    var map = new google.maps.Map(document.getElementById('googleMap'), {
      zoom: 10,
      //based on the user zip code and we will need to geo code to take the lat long
      center: new google.maps.LatLng(-33.92, 151.25),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: locations[i].location,
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {

          return function() {
            console.log(this);
            //update how to navigate to this string
            var address = locations.location.address
            var addressArray = address.split(' ');
            var addressParam = addressArray.join('+')
            queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address;
            $.ajax({
                  url: queryURL,
                  method: "GET"
                })
                .done(function(response) {
                  console.log(response);
                })//html
        }
      })(marker, i));
    }

    // function showInfo(photo,weather,etc){
    //   //hide map
    //   // show weather div
    //   // show photo
    // }

$(document).ready(function(){
  $('#myModal').on('shown.bs.modal', function(){
    google.maps.event.trigger(map, 'resize');
    map.setCenter(new google.maps.LatLng(-33.8688, 151.2195));
  });
});