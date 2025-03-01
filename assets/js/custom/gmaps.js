let GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = 'AIzaSyC7tSjhQyqDfDkKWmiemLdrrKFMTymkqgM';
GoogleMapsLoader.load(function (google) {
  if (document.getElementById("map")) {
    let api = pageParams.root + '/wp-json/wp/v2/locations?per_page=100';
    fetch(api).then((resp) => resp.json()).then(function (data) {
      parse(data);
    });
    let el = document.querySelector("#map");
    let myLatLng = { lat: 29.76328, lng: -95.36327 };
    let currentTemp;
    let currentHumidity;
    let currentPrecipitation;
    let currentWind;
    let currentTime;
    let d = new Date();
    let dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let currentDay = dayNames[d.getDay() - 1];
    let locationsModule = document.querySelector(".location__module.locations");
    let localModule = document.querySelector(".location__module.local");
    let contactModule = document.querySelector(".location__module.contact");
    let loader = document.querySelector(".location__module .loader");
    let weatherModule = document.querySelector(".weather__container");
    let icon = {
      url: '/wp-content/themes/gyro/assets/images/raw/not_pulsating.svg',
      scaledSize: new google.maps.Size(5, 5), // scaled size
    };
    let map = new google.maps.Map(el, {
      center: myLatLng,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false,
      zoom: 3,
      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#6b767f"
            }
          ]
        },
        {
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#757575"
            },
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.country",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "administrative.neighborhood",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#181818"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1b1b1b"
            }
          ]
        },
        {
          "featureType": "road",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#2c2c2c"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8a8a8a"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#373737"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#3c3c3c"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#4e4e4e"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#000000"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#5a6771"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#3d3d3d"
            }
          ]
        }
      ]
    });
    function parse(locations) {
      let markers = [];
      for (let location of locations) {
        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(location.acf.location.latitude, location.acf.location.longitude),
          map: map,
          icon: icon,
          title: location.acf.location.city_name,
          state: location.acf.location.state,
          region: location.acf.location.city_region,
          latitude: location.acf.location.latitude,
          longitude: location.acf.location.longitude,
          optimized: false
        });
        let infoWindow = new google.maps.InfoWindow({
          content: location.acf.location.city_name
        });
        markers.push(marker);
        marker.addListener("click", function () {
          for (let i = 0; i < markers.length; i++) {
            if (markers[i].icon.url === '/wp-content/themes/gyro/assets/images/raw/pulsating.svg') {
              markers[i].setIcon({
                url: '/wp-content/themes/gyro/assets/images/raw/not_pulsating.svg',
                scaledSize: new google.maps.Size(5, 5)
              });
            }
          }

          marker.setIcon({
            url: '/wp-content/themes/gyro/assets/images/raw/pulsating.svg',
            scaledSize: new google.maps.Size(50, 50),
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(25, 25) // anchor
          });

          map.setZoom(5);
          map.setCenter(marker.getPosition());
          setTemp(parseInt(marker.getPosition().lat()), parseInt(marker.getPosition().lng()), marker.title, marker.region);
          TweenMax.to(locationsModule, 0.2, {
            opacity: 1,
            y: 0
          });
          document.querySelector(".region__title h1 span").innerHTML = marker.region;
          loadLocations(marker.region, marker.title, marker.state, marker.latitude, marker.longitude);
          TweenMax.to(localModule, 0.2, {
            opacity: 1,
            y: 0
          });
        });
      }

      function loadLocations(region, city, state, latitude, longitude) {
        let buttonsWrap = document.querySelector(".locations__button__wrap.cities");
        buttonsWrap.innerHTML = "";
        buttonsWrap.innerHTML += `
                ${
          locations.map(location => (location.acf.location.country_region === region ? `<button class="location__button maps__button" data-name="${location.acf.location.contact.city}" data-region="${location.acf.location.city_region}" data-lat="${location.acf.location.latitude}" data-lng="${location.acf.location.longitude}" data-state="${location.acf.location.country_name}">${location.acf.location.contact.city}</button>` : '')).join(' ')}`;

        let locationButtons = document.querySelectorAll(".location__button");
        for (let locationButton of locationButtons) {
          locationButton.addEventListener("click", (e) => {
            let longitude = e.target.dataset.lng;
            let latitude = e.target.dataset.lat;
            let location = e.target.dataset.name;
            let region = e.target.dataset.region;
            let country = e.target.dataset.state;
            map.setZoom(3);
            map.setCenter({ lat: parseInt(latitude), lng: parseInt(longitude) });
            setTemp(parseInt(latitude), parseInt(longitude), location, country);
            setContact(e.target.dataset.name);
            TweenMax.to(localModule, 0.2, {
              opacity: 1,
              y: 0
            });
          });
        }
        if (city) {
          console.log(region);
          console.log(city);
          console.log(state);
          console.log(latitude);
          console.log(longitude);
          map.setZoom(3);
          map.setCenter({ lat: parseInt(latitude), lng: parseInt(longitude) });
          setTemp(parseInt(latitude), parseInt(longitude), city, state);
          setContact(city);
          TweenMax.to(localModule, 0.2, {
            opacity: 1,
            y: 0
          });
        }
        // locationButtons[0].click();
      }

      let regions = [
        { name: "North America", latitude: 54.525961, longitude: -105.255119 },
        { name: "Latin America", latitude: -4.442039, longitude: -61.326854 },
        { name: "Middle East & Asia Pacific", latitude: 34.047863, longitude: 100.619655 },
        { name: "Europe, Africa & Caspian Sea", latitude: 54.525961, longitude: 15.255119 }
      ];

      let regionsModule = document.querySelector(".location__module.regions .regions__wrap");

      regionsModule.innerHTML = `<div class="locations__button__wrap">
        ${regions.map(region => `<button class="region__button maps__button" data-name="${region.name}" data-lat="${region.latitude}" data-lng="${region.longitude}">${region.name}</button>`).join(' ')}
    </div>`;

      let regionButtons = document.querySelectorAll(".region__button");
      for (let regionButton of regionButtons) {
        regionButton.addEventListener("click", (e) => {
          if (!regionButton.classList.contains('active')) {
            let weatherModuleContent = weatherModule.querySelectorAll("span");
            let longitude = e.target.dataset.lng;
            let latitude = e.target.dataset.lat;
            let region = e.target.dataset.name;
            map.setZoom(3);
            map.setCenter({ lat: parseInt(latitude), lng: parseInt(longitude) });
            let prevActiveRegion = document.querySelector(".region__button.active");
            (prevActiveRegion !== null) ? prevActiveRegion.classList.remove("active") : "";
            e.target.classList.add("active");
            if (!document.querySelector(".location__button[data-region='" + region + "']")) {
              loadLocations(region);
              TweenMax.to(locationsModule, 0.2, {
                opacity: 0,
                y: 5,
                onComplete: function () {
                  TweenMax.to(locationsModule, 0.2, {
                    opacity: 1,
                    y: 0
                  });
                }
              });
              let regionTitle = document.querySelector(".region__title h1 span");
              regionTitle.innerHTML = region;
            }
          }
        })
      }

      let setTemp = (lat, lng, location, region) => {
        weatherModule.classList.remove("active");
        loader.classList.remove("inactive");
        document.querySelector("span.temperature").innerHTML = "";
        document.querySelector("span.humidity").innerHTML = "";
        document.querySelector("span.precipitation").innerHTML = "";
        document.querySelector("span.wind").innerHTML = "";
        document.querySelector("span.day").innerHTML = "";
        document.querySelector("span.city").innerHTML = "";
        document.querySelector("span.region").innerHTML = "";
        fetch(`${pageParams.themeDirectory}/api/weather.php?lat=${lat}&lng=${lng}`)
          .then(function (response) {
            return response.json();
          }).then(function (myJSON) {
            TweenMax.to(weatherModule, 0.2, {
              opacity: 1,
              y: 0
            });
            loader.classList.add("inactive");
            currentTemp = Math.round(myJSON.temp);
            currentHumidity = myJSON.humidity + "%";
            currentHumidity = currentHumidity.replace(/^[0\.]+/, "");
            currentPrecipitation = Math.round(myJSON.precipitation) + "%";
            currentWind = Math.round(myJSON.wind) + " mph";
            currentTime = myJSON.time;
            document.querySelector("span.temperature").innerHTML = currentTemp + "<sup>&#8457;</sup>";
            document.querySelector("span.humidity").innerHTML = 'Humidity: ' + currentHumidity;
            document.querySelector("span.precipitation").innerHTML = 'Precipitation: ' + currentPrecipitation;
            document.querySelector("span.wind").innerHTML = 'Wind: ' + currentWind;
            document.querySelector("span.day").innerHTML = currentDay + " " + myJSON.time;
            document.querySelector("span.city").innerHTML = location;
            document.querySelector("span.region").innerHTML = region;
          });
      };

      let setContact = (city) => {
        let module = document.querySelector(".location__module.contact .col");
        module.innerHTML = `${locations.map(location => (location.acf.location.city_name === city ? `<h4>${location.acf.location.contact.name}</h4><address><p>${location.acf.location.contact.street}</p><p>${location.acf.location.contact.city}, ${location.acf.location.contact.zip}</p><p>Tel: ${location.acf.location.contact.telephone}</p><p>Fax: ${location.acf.location.contact.fax}</p><p>Email: <a href="${location.acf.location.contact.email}}">${location.acf.location.contact.email}</a> </p></address>` : '')).join(' ')}`;
        TweenMax.to(contactModule, 0.2, {
          opacity: 1,
          y: 0
        });
      };
    }

  }
});
