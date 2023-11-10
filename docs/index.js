async function renderMap() {
  const map = L.map(document.querySelector(".map"));

  L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  L.control.scale().addTo(map);

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

  map.fitBounds(new L.LatLngBounds(new L.LatLng(32, -122.292293), new L.LatLng(45.500295, -73.567149)));

  var legend = L.control({ position: "bottomleft" });

  legend.onAdd = function (map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Légende</h4>";
    div.innerHTML += '<i style="background-color: rgba(0, 0, 255, 0.7)"></i><span>Train</span><br>';
    div.innerHTML += '<i style="background-color: rgba(255, 0, 0, 0.5)"></i><span>Ferry</span><br>';
    div.innerHTML += '<i style="background-color: rgba(0, 0, 0, 0.5)"></i><span>Bus</span><br>';
    div.innerHTML += '<i style="background-color: rgba(0, 255, 0, 0.5)"></i><span>Vélo</span><br>';
    //div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span>Grænse</span><br>';
    return div;
  };

  legend.addTo(map);

  let namesTracks = ['Lake_Shore_Limited', 'Empire_Builder', 'California_Zephyr', 'Southwest_Chief',
    'Sunset_Limited', 'Adirondack', 'Crescent', 'Coast_Starlight']
  
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
          polyline_options: { color: "blue", opacity: 0.5, dashArray:"10 10"},
        }).bindTooltip(
          `<div class="track title">${name.replaceAll("_", " ")}</div><div class="track info">${dist} kms</div><div class="track info">${time}</div>`,
          { sticky: true, }
        ).addTo(map);
      })
  }

  let histTracks = ['BE', 'UK', 'FR', 'CA']
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

  let projTracks = ['Exo_1', 'Project', 'Toronto']
  for await (let name of projTracks) {
    await fetch(`https://raw.githubusercontent.com/tlecardo/testGPX/main/files/Projected/${name}.gpx`)
      .then(res => res.text())
      .then(res => {
        new L.GPX(res, {
          async: true,
          marker_options: { startIconUrl: '', endIconUrl: '', shadowUrl: '' },
          gpx_options: { joinTrackSegments: false },
          polyline_options: { color: "blue", opacity: 0.5, dashArray:"10 10"},
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
        polyline_options: { color: "red", opacity: 0.5},
      }).addTo(map);
    })

    await fetch(`https://raw.githubusercontent.com/tlecardo/testGPX/main/files/Bus.gpx`)
    .then(res => res.text())
    .then(res => {
      new L.GPX(res, {
        async: true,
        marker_options: { startIconUrl: '', endIconUrl: '', shadowUrl: '' },
        gpx_options: { joinTrackSegments: false },
        polyline_options: { color: "black", opacity: 0.3},
      }).addTo(map);
    })

    await fetch(`https://raw.githubusercontent.com/tlecardo/testGPX/main/files/Velo.gpx`)
    .then(res => res.text())
    .then(res => {
      new L.GPX(res, {
        async: true,
        marker_options: { startIconUrl: '', endIconUrl: '', shadowUrl: '' },
        gpx_options: { joinTrackSegments: false },
        polyline_options: { color: "green", opacity: 0.4},
      }).addTo(map);
    })
}

renderMap().catch(console.error)
