function initMap() {
    var location = { lat: 18.2760334014893, lng: -93.2258262 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: location
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}