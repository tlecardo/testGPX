async function renderMap() {
  const map = L.map(document.querySelector(".map"));

  L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  L.control.scale().addTo(map);

  let iconPlane = L.divIcon({
    className: 'custom-div-icon',
    html: '<div class="dot_plane"></div>',
    iconAnchor: [4, 12.3]
  });

  /*
  L.marker([42.641298, -73.741554]).bindTooltip(`<div class="city title">Albany</div>`).addTo(map);
  L.marker([41.878773, -87.638622]).bindTooltip(`<div class="city title">Chicago</div>`).addTo(map);
  L.marker([47.597811, -122.329564]).bindTooltip(`<div class="city title">Seattle</div>`).addTo(map);
  L.marker([37.840341, -122.292293]).bindTooltip(`<div class="city title">San Francisco</div>`).addTo(map);
  L.marker([40.944502, -90.363511]).bindTooltip(`<div class="city title">Galesburg</div>`).addTo(map);
  L.marker([34.055863, -118.234245]).bindTooltip(`<div class="city title">Los Angeles</div>`).addTo(map);
  L.marker([29.946275, -90.078913]).bindTooltip(`<div class="city title">La Nouvelle-Orléans</div>`).addTo(map);
  L.marker([40.750262, -73.992824]).bindTooltip(`<div class="city title">New York</div>`).addTo(map);
  L.marker([45.500295, -73.567149]).bindTooltip(`<div class="city title">Montréal</div>`).addTo(map);
  L.marker([38.898487, -77.005291]).bindTooltip(`<div class="city title">Washington</div>`).addTo(map);
  */
  var pointCDG = new L.LatLng(48.9645519, 2.438448005);
  var pointYUL = new L.LatLng(45.4680288, -73.7276389);
  var pointOrly = new L.LatLng(48.723210, 2.379579320);
  var pointLOA = new L.LatLng(38.7811952, -9.13600751);
  var pointNLI = new L.LatLng(40.6896186, -74.1665474);
  var pointHLX = new L.LatLng(44.8769224, -63.5163199);
  var pointBCN = new L.LatLng(41.2983098, 2.081902809);
  var pointBVA = new L.LatLng(49.4533346, 2.116162099);

  var pointYMH = new L.LatLng(43.1737220, -79.9232869);
  var pointKEF = new L.LatLng(63.9851196, -22.6056430);

  var pointFLL = new L.LatLng(26.076756, -80.150874);
  var pointMIA = new L.LatLng(25.794470, -80.290558);
  var pointSJU = new L.LatLng(18.442935, -66.002363);


  // Tor <-> Reyk
  var planeMarker = L.Marker.movingMarker(
    [pointYMH, pointKEF, pointCDG, pointKEF, pointYMH],
    [5000, 3000, 3000, 5000],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();
  //L.polyline([pointYYZ, pointKEF, pointCDG, pointKEF, pointYYZ], { color: 'black', weight: 5, opacity: 0.03}).addTo(map);


  // MTL <-> Fort Laudernale
  var planeMarker = L.Marker.movingMarker(
    [pointYUL, pointFLL, pointYUL],
    [3000, 3000],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();
  //L.polyline([pointYUL, pointFLL, pointYUL], { color: 'black', weight: 5, opacity: 0.03}).addTo(map);

  // Miami <-> San Juan
  var planeMarker = L.Marker.movingMarker(
    [pointMIA, pointSJU, pointMIA],
    [2500, 2500],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();
  //L.polyline([pointMIA, pointSJU, pointMIA], { color: 'black', weight: 5, opacity: 0.03}).addTo(map);

  // Paris -> MTL
  var planeMarker = L.Marker.movingMarker(
    [pointCDG, pointYUL],
    [4500],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();
  //L.polyline([pointCDG, pointYUL], { color: 'black', weight: 5, opacity: 0.03}).addTo(map);

  // Paris <-> Lisbonne <-> MTL
  var planeMarker = L.Marker.movingMarker(
    [pointOrly, pointLOA, pointYUL, pointLOA, pointOrly],
    [2000, 4500, 4500, 2000],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();
  //L.polyline([pointOrly, pointLOA, pointYUL], { color: 'black',  weight: 5, opacity: 0.03 }).addTo(map);

  // NYC -> Paris
  var planeMarker = L.Marker.movingMarker(
    [pointNLI, pointOrly],
    [4500],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();
  //L.polyline([pointNLI, pointOrly], { color: 'black', weight: 5, opacity: 0.03 }).addTo(map);

  // MTL <-> HLX
  var planeMarker = L.Marker.movingMarker(
    [pointYUL, pointHLX, pointYUL],
    [1500, 1500],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();
  //L.polyline([pointYUL, pointHLX], { color: 'black', weight: 5, opacity: 0.03 }).addTo(map);

  // Barcelone -> Beauvais
  var planeMarker = L.Marker.movingMarker(
    [pointBCN, pointBVA],
    [2000],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();
  //L.polyline([pointBCN, pointBVA], { color: 'black', weight: 5, opacity: 0.03 }).addTo(map);


  map.fitBounds(new L.LatLngBounds(new L.LatLng(32, -122.292293), new L.LatLng(45.500295, -73.567149)));

  var legend = L.control({ position: "bottomleft" });

  legend.onAdd = function (map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Légende</h4>";
    div.innerHTML += '<i style="background-color: rgba(0, 0, 255, 0.7)"></i><span>Train</span><br>';
    div.innerHTML += '<i style="background-color: rgba(255, 0, 0, 0.5)"></i><span>Ferry</span><br>';
    div.innerHTML += '<i style="background-color: rgba(0, 0, 0, 0.5)"></i><span>Route</span><br>';
    div.innerHTML += '<i style="background-color: rgba(0, 255, 0, 0.5)"></i><span>Vélo</span><br>';
    //div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span>Grænse</span><br>';
    return div;
  };

  legend.addTo(map);

  let namesTracks = ['Lake_Shore_Limited_W', 'Empire_Builder', 'California_Zephyr', 'Southwest_Chief',
    'Sunset_Limited', 'Adirondack_S', 'Crescent_S', 'Coast_Starlight']

  for await (let name of namesTracks) {
    await fetch(`https://raw.githubusercontent.com/tlecardo/testGPX/main/files/USTracks/${name}.gpx`)
      .then(res => res.text())
      .then(res => {

        let time = res.match(/time = [0-9]*h [0-9]*m/)[0]
          .replace("time = ", "")

        let dist = res.match(/track-length = [0-9]* filtered/)[0]
          .replace("track-length = ", "")
          .replace(" filtered", "")

        dist = Math.round(dist / 100) / 10
        dist = parseInt(dist).toLocaleString()

        new L.GPX(res, {
          async: true,
          marker_options: { startIconUrl: '', endIconUrl: '', shadowUrl: '' },
          polyline_options: { color: "blue", opacity: 0.5, dashArray: "10 10" },
        }).bindTooltip(
          `<div class="track title">${name.replaceAll("_", " ")}</div><div class="track info">${dist} kms</div><div class="track info">${time}</div>`,
          { sticky: true, }
        ).addTo(map);
      })
  }


  for await (let name of ['Adirondack_N', 'Lake_Shore_Limited_E', 'Crescent_N', 'Northeast_Regional_N', 'TriRail']) {
    await fetch(`https://raw.githubusercontent.com/tlecardo/testGPX/main/files/USTracks/${name}.gpx`)
      .then(res => res.text())
      .then(res => {

        let time = res.match(/time = [0-9]*h [0-9]*m/)[0]
          .replace("time = ", "")

        let dist = res.match(/track-length = [0-9]* filtered/)[0]
          .replace("track-length = ", "")
          .replace(" filtered", "")

        dist = Math.round(dist / 100) / 10
        dist = parseInt(dist).toLocaleString()

        new L.GPX(res, {
          async: true,
          marker_options: { startIconUrl: '', endIconUrl: '', shadowUrl: '' },
          polyline_options: { color: "blue", opacity: 0.5 },
        }).bindTooltip(
          `<div class="track title">${name.replaceAll("_", " ")}</div><div class="track info">${dist} kms</div><div class="track info">${time}</div>`,
          { sticky: true, }
        ).addTo(map);
      })
  }

  let histTracks = ['BE', 'UK', 'FR', 'CA', 'ES']
  for await (let name of histTracks) {
    await fetch(`https://raw.githubusercontent.com/tlecardo/testGPX/main/files/${name}.gpx`)
      .then(res => res.text())
      .then(res => {
        new L.GPX(res, {
          async: true,
          marker_options: { startIconUrl: '', endIconUrl: '', shadowUrl: '' },
          gpx_options: { joinTrackSegments: false },
          polyline_options: { color: "blue", opacity: 0.5 },
        }).addTo(map);
      })
  }

  let projTracks = ['Exo_1', 'Ottawa']
  for await (let name of projTracks) {
    await fetch(`https://raw.githubusercontent.com/tlecardo/testGPX/main/files/Projected/${name}.gpx`)
      .then(res => res.text())
      .then(res => {
        new L.GPX(res, {
          async: true,
          marker_options: { startIconUrl: '', endIconUrl: '', shadowUrl: '' },
          gpx_options: { joinTrackSegments: false },
          polyline_options: { color: "blue", opacity: 0.5, dashArray: "10 10" },
        }).addTo(map);
      })
  }

  await fetch(`https://raw.githubusercontent.com/tlecardo/testGPX/main/files/Ferry.gpx`)
    .then(res => res.text())
    .then(res => {
      new L.GPX(res, {
        async: true,
        marker_options: { startIconUrl: '', endIconUrl: '', shadowUrl: '' },
        gpx_options: { joinTrackSegments: false },
        polyline_options: { color: "red", opacity: 0.5 },
      }).addTo(map);
    })

  await fetch(`https://raw.githubusercontent.com/tlecardo/testGPX/main/files/Bus.gpx`)
    .then(res => res.text())
    .then(res => {
      new L.GPX(res, {
        async: true,
        marker_options: { startIconUrl: '', endIconUrl: '', shadowUrl: '' },
        gpx_options: { joinTrackSegments: false },
        polyline_options: { color: "black", opacity: 0.3 },
      }).addTo(map);
    })


  await fetch(`https://raw.githubusercontent.com/tlecardo/testGPX/main/files/Voiture.gpx`)
    .then(res => res.text())
    .then(res => {
      new L.GPX(res, {
        async: true,
        marker_options: { startIconUrl: '', endIconUrl: '', shadowUrl: '' },
        gpx_options: { joinTrackSegments: false },
        polyline_options: { color: "black", opacity: 0.3 },
      }).addTo(map);
    })

  await fetch(`https://raw.githubusercontent.com/tlecardo/testGPX/main/files/Velo.gpx`)
    .then(res => res.text())
    .then(res => {
      new L.GPX(res, {
        async: true,
        marker_options: { startIconUrl: '', endIconUrl: '', shadowUrl: '' },
        gpx_options: { joinTrackSegments: false },
        polyline_options: { color: "green", opacity: 0.4 },
      }).addTo(map);
    })
}

renderMap().catch(console.error)
