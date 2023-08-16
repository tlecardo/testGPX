import * as L from "leaflet-gpx";

async function renderMap() {
  const map = L.map(document.querySelector(".map"));

  L.tileLayer(
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  ).addTo(map);

  const gpxString = await fetch("demo.gpx").then((res) =>
    res.text()
  );
  // Guck hier Papa, bzw rechts in die Console
  console.log(gpxString.slice(0, 50));
  new L.GPX(gpxString, {
    async: true
  })
    .on("loaded", (e) => {
      var gpx = e.target;
      map.fitBounds(gpx.getBounds());
    })
    .addTo(map);
}

renderMap().catch(console.error);
