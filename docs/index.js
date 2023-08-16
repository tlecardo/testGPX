import * as L from "leaflet-gpx";

async function renderMap() {
  const map = L.map(document.querySelector(".map"));

  L.tileLayer(
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  ).addTo(map);

  const gpxString = await fetch("https://raw.githubusercontent.com/tlecardo/testGPX/main/MTL_NYC.gpx").then((res) =>
    res.text()
  );
  
  new L.GPX(gpxString, {
    async: true,
    marker_options: {
      startIconUrl: '',
      endIconUrl: '',
      shadowUrl: ''
    }
  })
    .on("loaded", (e) => {
      var gpx = e.target;
      map.fitBounds(gpx.getBounds());
    })
    .addTo(map);
}

renderMap().catch(console.error);
