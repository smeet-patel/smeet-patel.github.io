function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2.5,
        center: {
            lat: -10.46044,
            lng: 130.8410469
        },
        styles: [

            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{
                        "saturation": 36
                    },
                    {
                        "color": "#c35a0f"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },

            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{
                        "saturation": 36
                    },
                    {
                        "color": "#2ab4a6"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#0f78c3"
                }]
            },
            {
                "featureType": "administrative.country",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "weight": 2.5
                }]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#7fc8ed"
                }]
            },
            {
                "featureType": "water",
                "elementType": "labels.text",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }

        ]

    });
    setMarkers(map);
    mapTypeId: google.maps.MapTypeId.ROADMAP
}


var locations = [
    ['Wellington (New Zealand)', -41.2924322, 174.7788891, 5, 'wel'],
    ['Singapore', 1.2756818, 103.8546165, 4, 'sing'],
    ['Udaipur (India)', 24.5787228, 73.6862551, 3, 'udai'],
    ['Melbourne (Australia)', -37.8142176, 144.9631608, 2, 'mel'],
    ['Ubud (Indonesia)', -8.5080922, 115.2639576, 1, 'ubud']
];
// Shapes define the clickable region of the icon. The type defines an HTML
// <area> element 'poly' which traces out a polygon as a series of X,Y points.
// The final coordinate closes the poly by connecting to the first coordinate.
function setMarkers(map) {
    var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: 'poly'
    };
    // var map = new google.maps.Map(document.getElementById('map'), {
    //     zoom: 2.5,
    //     center: {
    //         lat: -12.46044,
    //         lng: 130.8410469
    //     },
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    // });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;
    var markerCluster = new MarkerClusterer(map, marker, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });

    // for (i = 0; i < locations.length; i++) {
    //     marker = new google.maps.Marker({
    //         position: new google.maps.LatLng(locations[i][1], locations[i][2]),
    //         map: map
    //     });
    for (var i = 0; i < locations.length; i++) {
        //   var beach = beaches[i];
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
            // icon: 'http://maps.google.com/mapfiles/ms/icons/blue-pushpin.png',
            shape: shape,
            title: locations[0],
            zIndex: locations[3],
            // icon : "spMini1.png"
        });
        markerCluster.addMarker(marker);



        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
                // document.getElementById("demo").innerHTML = locations[i][4];
                if ((locations[i][4] == 'mel')) {
                    document.getElementById("melBlog").style.display = "block";
                    document.getElementById("singBlog").style.display = "none";
                    document.getElementById("baliBlog").style.display = "none";
                } else if ((locations[i][4] == 'ubud')) {
                    document.getElementById("melBlog").style.display = "none";
                    document.getElementById("singBlog").style.display = "none";
                    document.getElementById("baliBlog").style.display = "block";
                }
             else if ((locations[i][4] == 'sing')) {
                document.getElementById("melBlog").style.display = "none";
                document.getElementById("singBlog").style.display = "block";
                document.getElementById("baliBlog").style.display = "none";
            }
            }
        })(marker, i));
    }
}