import { LatLng, LatLngBounds } from "leaflet";
import * as L from "leaflet-gpx";

async function renderMap() {
  const map = L.map(document.querySelector(".map"));

  L.tileLayer(
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  ).addTo(map);

  L.marker([42.641298, -73.741554]).bindTooltip(`<div class="city title">Albany</div>`, { direction: 'right' }).addTo(map);
  L.marker([41.878773, -87.638622]).bindTooltip(`<div class="city title">Chicago</div>`, { direction: 'right' }).addTo(map);
  L.marker([47.597811, -122.329564]).bindTooltip(`<div class="city title">Seattle</div>`, { direction: 'right' }).addTo(map);
  L.marker([37.840341, -122.292293]).bindTooltip(`<div class="city title">San Francisco</div>`, { direction: 'right' }).addTo(map);
  L.marker([40.944502, -90.363511]).bindTooltip(`<div class="city title">Galesburg</div>`, { direction: 'right' }).addTo(map);
  L.marker([34.055863, -118.234245]).bindTooltip(`<div class="city title">Los Angeles</div>`, { direction: 'right' }).addTo(map);
  L.marker([29.946275, -90.078913]).bindTooltip(`<div class="city title">La Nouvelle-Orléans</div>`, { direction: 'right' }).addTo(map);
  L.marker([40.750262, -73.992824]).bindTooltip(`<div class="city title">New York</div>`, { direction: 'right' }).addTo(map);
  L.marker([45.500295, -73.567149]).bindTooltip(`<div class="city title">Montréal</div>`, { direction: 'right' }).addTo(map);

  map.fitBounds(new LatLngBounds(new LatLng(32, -122.292293), new LatLng(45.500295, -73.567149)));

  let tracks = {}
  let namesTracks = ['Lake_Shore_Limited', 'Empire_Builder', 'California_Zephyr', 'Texas_Eagle',
    'Sunset_Limited', 'Adirondack', 'Crescent', 'Coast_Starlight']

  for await (let name of namesTracks) {
    await fetch(`https://raw.githubusercontent.com/tlecardo/testGPX/main/files/${name}.gpx`)
      .then(res => res.text())
      .then(res => {

        let time = res.match(/time = [0-9]*h [0-9]*m/)[0]
          .replace("time = ", "")

        let dist = res.match(/track-length = [0-9]* filtered/)[0]
          .replace("track-length = ", "")
          .replace(" filtered", "")

        dist = Math.round(dist / 100) / 10
        dist = parseInt(dist).toLocaleString()

        tracks[name] = res.match(/<trkpt lat="[\-0-9.]*" lon="[\-0-9.]*">/gm).map(x => x.match(/[\-0-9]+.[0-9]+/gm))

        new L.GPX(res, {
          async: true,
          marker_options: { startIconUrl: '', endIconUrl: '', shadowUrl: '' }
        }).bindTooltip(`<div class="track title">${name.replaceAll("_", " ")}</div><div class="track info">${dist} kms</div><div class="track info">${time}</div>`).addTo(map);
      })
  }

  /*
  let localPts = tracks["Empire_Builder"]
  let i = 20
  var myPositionMarker = L.marker(localPts[i]).addTo(map);

  function myLoop() {
    setTimeout(function () {
      myPositionMarker.setLatLng(localPts[i])
      i += 20;
      myLoop();
    }, 100)
  }
  myLoop();
  */
}

renderMap().catch(console.error)