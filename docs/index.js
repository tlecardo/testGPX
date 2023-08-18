import { LatLng, LatLngBounds } from "leaflet";
import * as L from "leaflet-gpx";

async function renderMap() {
  const map = L.map(document.querySelector(".map"));

  L.tileLayer(
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  ).addTo(map);

  L.marker([42.641298, -73.741554]).bindTooltip("Albany", { direction: 'right' }).addTo(map);
  L.marker([41.875152, -87.632273]).bindTooltip("Chicago", { direction: 'right' }).addTo(map);
  L.marker([47.597811, -122.329564]).bindTooltip("Seattle", { direction: 'right' }).addTo(map);
  L.marker([37.840341, -122.292293]).bindTooltip("San Francisco", { direction: 'right' }).addTo(map);
  L.marker([40.944502, -90.363511]).bindTooltip("Galesburg", { direction: 'right' }).addTo(map);
  L.marker([34.055863, -118.234245]).bindTooltip("Los Angeles", { direction: 'right' }).addTo(map);
  L.marker([29.946275, -90.078913]).bindTooltip("La Nouvelle-Orléans", { direction: 'right' }).addTo(map);
  L.marker([40.750262, -73.992824]).bindTooltip("New York", { direction: 'right' }).addTo(map);
  L.marker([45.500295, -73.567149]).bindTooltip("Montréal", { direction: 'right' }).addTo(map);

  map.fitBounds(new LatLngBounds(new LatLng(32, -122.292293), new LatLng(45.500295, -73.567149)));

  ['Lake_Shore_Limited', 'Empire_Builder',
    'California_Zephyr', 'Texas_Eagle',
    'Sunset_Limited', 'Adirondack',
    'Crescent', 'Coast_Starlight']
    .forEach(
      (name) => {
        fetch(`https://raw.githubusercontent.com/tlecardo/testGPX/main/files/${name}.gpx`)
          .then(res => res.text())
          .then(async res => {
            new L.GPX(res, {
              async: true,
              marker_options: { startIconUrl: '', endIconUrl: '', shadowUrl: '' }
            }).bindTooltip(`${name.replaceAll("_", " ")}`, { direction: 'right' }).addTo(map);
          })
      }
    )

  console.log(map)

}


renderMap().catch(console.error);
