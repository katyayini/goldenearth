// Please note that the source of the code in this file is https://developers.google.com/maps/documentation/javascript/examples/map-geolocation

// Store locations and addresses

var store1Latitude = 43.7184326880091;
var store1Longitude = -79.34886869632147;
var store2Latitude = 43.85509799628743;
var store2Longitude = -79.24747458784368;
var store3Latitude = 43.65648313580146;
var store3Longitude = -79.58210;

var storeLatitudeArray = [store1Latitude, store2Latitude, store3Latitude];
var storeLongitudeArray = [store1Longitude, store2Longitude, store3Longitude];

var store1Address = "1077 Leslie St, North York, ON M3C 2J7";
var store2Address = "44 Havelock Gate, Markham, ON L3S 3X6";
var store3Address = "630 Renforth Dr, Etobicoke, ON M9C 2N6";

console.log(storeLatitudeArray);

// Initiate map window

let map, infoWindow;
  
function initMap() {
    const store1 = { lat: store1Latitude, lng: store1Longitude };
    const store2 = { lat: store2Latitude, lng: store2Longitude };
    const store3 = { lat: store3Latitude, lng: store3Longitude };
    map = new google.maps.Map(document.getElementById("map"), {
        center: store1,
        zoom: 9,
    });
    infoWindow = new google.maps.InfoWindow();

    // Create markers for store locations
    const marker1 = new google.maps.Marker({
        position: store1,
        map: map,
    });
    const marker2 = new google.maps.Marker({
        position: store2,
        map: map,
    });
    const marker3 = new google.maps.Marker({
        position: store3,
        map: map,
    });

    // Add geolocate button

    const locationButton = document.createElement("button");

    locationButton.textContent = "Find location near me";

    locationButton.classList.add("custom-map-control-button");

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

    // Get current position
    locationButton.addEventListener("click", () => {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent("You are here.");
            infoWindow.open(map);
            map.setCenter(pos);
            console.log(pos);
            var myLatitude = position.coords.latitude;
            var myLongitude = position.coords.longitude;
            calculateDistance(myLatitude, myLongitude);

        },
        () => {
            handleLocationError(true, infoWindow, map.getCenter());
        }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    });
}

// Handle location error

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

window.initMap = initMap;

// Change degree to radian

function degToRad(degrees) {
    return degrees * (Math.PI / 180);
  };

  // Calculate the shortest distance

function calculateDistance(userLatitude, userLongitude) {

    var storeLatitude = storeLatitudeArray;
    var storeLongitude = storeLongitudeArray;
    
    console.log("user lattitude is of type of" + typeof userLatitude);
    console.log("user latitude is" + userLatitude + "deg");
    console.log("user longitude is" + userLongitude + "deg");
    
    console.log("store latitude is " + storeLatitude);
    console.log("store Longitude is " + storeLongitude);
    console.log("length is " + storeLatitude.length);
    console.log("First item " + storeLatitude[0]);


    console.log(store2Latitude);

    //toRadians which converts from degrees to radians.
    var userLatitude = degToRad(userLatitude);
    var userLongitude = degToRad(userLongitude);
    // Radius of earth in kilometers. Use 3956 for miles
    var r1 = 6371;
    distanceArray = [];
    
    for (let i = 0; i < storeLatitude.length; i++) {
        console.log("store " + i + "latitude is: " + storeLatitude[i]);
        storeLatitude[i] = degToRad(storeLatitude[i]);
        storeLongitude[i] = degToRad(storeLongitude[i]);

        let dlon = storeLongitude[i] - userLongitude;
        let dlat = storeLatitude[i] - userLatitude;
        let a1 = Math.pow(Math.sin(dlat / 2), 2)
        + Math.cos(userLatitude) * Math.cos(storeLatitude[i])
        * Math.pow(Math.sin(dlon / 2),2);
        let c1 = 2 * Math.asin(Math.sqrt(a1));
        var distance = (c1 * r1);
        distanceArray.push(distance);
        // distance = [distance];
        // distanceArray = distanceArrary.concat(distance);


        console.log("Store " + i + " is " + distance + " km away.");
        
    }
    console.log(distanceArray);
    console.log(distanceArray[0]);
    console.log(distanceArray[1]);
    console.log(distanceArray[2]);


    var closestDistance = Math.min(...distanceArray);

    console.log(closestDistance);

    displayDistance(distanceArray, closestDistance);

  }  

// Display the closest store and distance

function displayDistance(storeD, closestD) {
    
    if (storeD[0] == closestD) {
        closestStore = store1Address;
    }
    else if (storeD[1] == closestD) {
        closestStore = store2Address;
    }
    else if (storeD[2] == closestD) {
        closestStore = store3Address;
    }
    var closestD = closestD.toFixed(1);
    console.log (closestStore + closestD);
    document.getElementById('distance').innerHTML = `The closest store is at ${closestStore}, which is ${closestD} km away.`;

}
