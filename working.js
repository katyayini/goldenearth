// Store locations

var store1Latitude = 43.7184326880091;
var store1Longitude = -79.34886869632147;
var store2Latitude = 43.85509799628743;
var store2Longitude = -79.24747458784368;
var store3Latitude = 43.65648313580146;
var store3Longitude = -79.58210;

var storeLatitude = [store1Latitude, store2Latitude, store3Latitude];
var storeLongitude = [store1Longitude, store2Longitude, store3Longitude];

var store1Address = "1077 Leslie St, North York, ON M3C 2J7";
var store2Address = "44 Havelock Gate, Markham, ON L3S 3X6";
var store3Address = "630 Renforth Dr, Etobicoke, ON M9C 2N6";

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

  // Calculate the smallest distance

function calculateDistance(userLatitude, userLongitude) {
    
    console.log("user lattitude is of type of" + typeof userLatitude);
    console.log("user latitude is" + userLatitude + "deg");
    console.log("user longitude is" + userLongitude + "deg");

    // Write a for loop (not completed)
    
    console.log("store latitude is " + storeLatitude);
    console.log("store Longitude is " + storeLongitude);
    console.log("length is " + storeLatitude.length);
    console.log("First item " + storeLatitude[0]);


    console.log(store2Latitude);

    for (let i = 0; i < userLatitude.length; i++) {
        console.log("store" + i + "latitude is: " + storeLatitude[0]);
        
    }
  
    // Store 1
    //toRadians which converts from degrees to radians.
    var userLatitude = degToRad(userLatitude);
    var userLongitude = degToRad(userLongitude);

    console.log("user latitude is" + userLatitude + "rad");
    console.log("user longitude is" + userLongitude + "rad");


    // Haversine formula
    let dlon1 = store1Longitude - userLongitude;
    let dlat1 = store1Latitude - userLatitude;
    let a1 = Math.pow(Math.sin(dlat1 / 2), 2)
    + Math.cos(userLatitude) * Math.cos(store1Latitude)
    * Math.pow(Math.sin(dlon1 / 2),2);
    
    let c1 = 2 * Math.asin(Math.sqrt(a1));
    
    // Radius of earth in kilometers. Use 3956 for miles
    let r1 = 6371;
    
    // calculate the result
    var distance1 = (c1 * r1);
    console.log("Store #1 is " + distance1 + " km away.");





    // Store 2
    //toRadians which converts from degrees to radians.
    store2Longitude = store2Longitude * Math.PI / 180;
    store2Latitude = store2Latitude * Math.PI / 180;
    
    // Haversine formula
    let dlon2 = store2Longitude - userLongitude;
    let dlat2 = store2Latitude - userLatitude;
    let a2 = Math.pow(Math.sin(dlat2 / 2), 2)
    + Math.cos(userLatitude) * Math.cos(store2Latitude)
    * Math.pow(Math.sin(dlon2 / 2),2);
    
    let c2 = 2 * Math.asin(Math.sqrt(a2));
    
    // Radius of earth in kilometers. Use 3956 for miles
    let r2 = 6371;
    
    // calculate the result
    var distance2 = (c2 * r2);
    console.log("Store #2 is " + distance2 + " km away.");

    // Store 3
    //toRadians which converts from degrees to radians.
    store3Longitude = store3Longitude * Math.PI / 180;
    store3Latitude = store3Latitude * Math.PI / 180;
    
    // Haversine formula
    let dlon3 = store3Longitude - userLongitude;
    let dlat3 = store3Latitude - userLatitude;
    let a3 = Math.pow(Math.sin(dlat3 / 2), 2)
    + Math.cos(userLatitude) * Math.cos(store3Latitude)
    * Math.pow(Math.sin(dlon3 / 2),2);
    
    let c3 = 2 * Math.asin(Math.sqrt(a3));
    
    // Radius of earth in kilometers. Use 3956 for miles
    let r3 = 6371;
    
    // calculate the result
    var distance3 = (c3 * r3);
    console.log("Store #3 is " + distance3 + " km away.");
    shortestDistance(distance1, distance2, distance3);
}

// Determine the shortest distance

function shortestDistance(store1, store2, store3) {
    let minArr = Object.entries({store1, store2, store3}).sort((arr1, arr2) => {
        return arr1[1] - arr2[1];
    }).shift();

    var closestStore = minArr[0];

    var closestDistance = minArr[1];

    var closestDistance = closestDistance.toFixed(1);

    console.log(`The closest store is "${minArr[0]}", which is ${minArr[1]} km away.`);

    displayResult(closestStore, closestDistance);

}

// Output distance on the screen

function displayResult(storeName, storeDistance){

  if (storeName == "distance1") {
    document.getElementById('distance').innerHTML = `The closest store is at ${store1Address}, which is ${storeDistance} km away.`;

  }
  else if (storeName == "distance2") {
    document.getElementById('distance').innerHTML = `The closest store is at ${store2Address}, which is ${storeDistance} km away.`;
  }

  else {
    document.getElementById('distance').innerHTML = `The closest store is at ${store3Address}, which is ${storeDistance} km away.`;
  }

    console.log(typeof storeName);
    console.log(storeName);

}



