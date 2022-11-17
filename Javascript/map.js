function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
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
    ['Dunedin (New Zealand)', -45.8739282, 170.503488, 5, 'dun'],
    ['Singapore', 1.2756818, 103.8546165, 4, 'sing'],
    ['Udaipur (India)', 24.5787228, 73.6862551, 3, 'udai'],
    ['Melbourne (Australia)', -37.8142176, 144.9631608, 2, 'mel'],
    ['Ubud (Indonesia)', -8.5080922, 115.2639576, 1, 'ubud'],
    ['Macau', 22.1987, 113.5439, 6, 'macau'],
    ['Hong Kong', 22.3193, 114.1694, 7, 'hk'],
    ['Shenzhen', 22.5431, 114.0579, 8, 'shen'],
    ['Bangkok (Thailand)', 13.7563, 100.5018, 9, 'bangkok'],
    ['Penang (Malaysia)', 5.4356, 100.3091, 10, 'penang'],
    ['Kuala Lumpur (Malaysia)', 3.1390, 101.6869, 11, 'kl'],
    ['New York',40.71068349421534, -73.98383283694741,12,'ny'],
    ['Bridgewater Township', 40.58622827036225, -74.65305820611546,13,'bw'],
    ['Bear Mountain State Park',41.31082160898316, -73.98888623275812,14,'bm'],
    ['Watkins Glen State Park',42.37137967140468, -76.88352377570472,15,'wg'],
    ['Letchworth State Park', 42.65686143368283, -77.97043884586859, 16],
    ['Niagara Falls ',43.078342090223764, -79.07976292923736,17],
    ['Toronto',43.64392100670397, -79.38721520407347,18],
    ['Montreal',45.49405743952284, -73.61658889625328],
    ['Lincoln',43.92676734974695, -72.84135174856218],
    ['Lower Falls',44.01534297905774, -71.24422628723411],
    ['Manchester',43.0008977038334, -71.45333256773284],
    ['Boston',42.354615820720035, -71.07039146734914],
    ['Kingston',41.99373540189895, -70.72978888090958],
    ['Newark',40.69076791477037, -74.17723044164039],
    ["Salt Lake City",40.777529445806984, -111.8881451155813],
    ["YellowStone NP",44.43948886592301, -110.58833303185511],
    ["Grand Teton",43.79841401688186, -110.70090439789955],
    ["Victor",43.60387104603761, -111.11071981747176],
    ["Arches NP",38.726395021883945, -109.58221646684652],
    ["Canyonlands NP", 38.209753402185086, -109.89532681605661],
    ["Capitol Reef NP",38.02040161865314, -111.03172509752704],
    ["Black Canyon of the Gunnison NP",38.57337842627612, -107.74427152125284],
    ["Bryce Canyon NP",37.58962173253152, -112.18999488593302],
    ["Zion", 37.293609718220765, -113.01646416491774],
    ["Horseshoe Bend", 36.87974693902293, -111.51083480219089],
    ["Grand Canyon", 36.10076785798798, -112.11269921041841],
    ['William', 35.25538677102868, -112.19026528593436],
    ["Hoover Dam",36.01625639681323, -114.73777541754122],
    ["Valley of Fire State Park",36.50740116903572, -114.53516540034033],
    ["Las Vegas",36.10728161735956, -115.17062301166234],
    ["Death Valley NP", 36.51093509467306, -117.07843046479692],
    ["Lake Tahoe",38.94452038777339, -119.98580077773333],
    ["Mammoth Lakes",37.65158033178441, -118.9747222167606],
    ["Bishop",37.36103819034709, -118.39785603270374],
    ["Yosemite NP",37.856669954202786, -119.56812104969934],
    ["Mariposa",37.48284449354291, -119.96313936435455],
    ["Point Reyes National Seashore",38.06019332534199, -122.8772413320526],
    ["San Francisco",37.822000327776166, -122.47835959438844],
    ["Cupertino",37.33205950062378, -122.03014045145174],
    ["Santa Cruz Beach Boardwalk",36.97306631003445, -122.02002270538694],
    ["Point Lobos State Natural Reserve",36.51564249840336, -121.9403080005968],
    ["Big Sur",36.263891068115065, -121.82930251730893], 
    ["Santa Barbara",34.3997535329191, -119.73726445702209],
    ["Solvang",34.59606084953656, -120.13690120210508],
    ["Malibu",34.01972428191569, -118.8149967726938],
    ["Santa Monica",34.00919073601035, -118.49854719574525],
    ["Hollywood, LA", 34.10493586590407, -118.32547312274164],
    ["Beverly Hills", 34.07455110068964, -118.40337856687965],
    ["San Diego", 32.56188560074195, -117.06483940277293],
    ["Atlanta",33.64057224816607, -84.41975300269473],
    ["Columbus",39.99633258999799, -82.95250652889814],
    ["Yorktown",40.193097722917486, -85.4732022093693],
    ["Indianapolis",39.82274980284474, -86.14935958832034],
    ["Chicago",41.908045920680145, -87.63321274846832]











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
    const svgMarker = {
        path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
        fillColor: "green",
        fillOpacity: 0.6,
        strokeWeight: 0,
        rotation: 0,
        scale: 1,
        anchor: new google.maps.Point(10, 25),
      };
    for (var i = 0; i < locations.length; i++) {
        //   var beach = beaches[i];
        var marker = new google.maps.Marker({

            
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
            //draggable: true,
            animation: google.maps.Animation.DROP,
             //icon: 'http://maps.google.com/mapfiles/ms/icons/blue-pushpin.png',
             icon : svgMarker,
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
                    document.getElementById("udaiBlog").style.display = "none";
                    document.getElementById("dunBlog").style.display = "none";
                } else if ((locations[i][4] == 'ubud')) {
                    document.getElementById("melBlog").style.display = "none";
                    document.getElementById("singBlog").style.display = "none";
                    document.getElementById("baliBlog").style.display = "block";
                    document.getElementById("udaiBlog").style.display = "none";
                    document.getElementById("dunBlog").style.display = "none";
                } else if ((locations[i][4] == 'sing')) {
                    document.getElementById("melBlog").style.display = "none";
                    document.getElementById("singBlog").style.display = "block";
                    document.getElementById("baliBlog").style.display = "none";
                    document.getElementById("udaiBlog").style.display = "none";
                    document.getElementById("dunBlog").style.display = "none";
                } else if ((locations[i][4] == 'udai')) {
                    document.getElementById("melBlog").style.display = "none";
                    document.getElementById("singBlog").style.display = "none";
                    document.getElementById("baliBlog").style.display = "none";
                    document.getElementById("udaiBlog").style.display = "block";
                    document.getElementById("dunBlog").style.display = "none";
                }
                else if ((locations[i][4] == 'dun')) {
                    document.getElementById("melBlog").style.display = "none";
                    document.getElementById("singBlog").style.display = "none";
                    document.getElementById("baliBlog").style.display = "none";
                    document.getElementById("udaiBlog").style.display = "none";
                    document.getElementById("dunBlog").style.display = "block";
                }
            }
        })(marker, i));
    }
}