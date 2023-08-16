import * as L from "leaflet-gpx";

async function renderMap() {
  const map = L.map(document.querySelector(".map"));

  L.tileLayer(
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  ).addTo(map);

  ['Albany_Chicago', 'Chicago_Seattle', 'Galesburg_SF', 'LA_Galesburg', 'LA_NO', 'MTL_NYC', 'NO_NYC', 'Seattle_LA'].forEach(
    async (name) => {
      const gpxString = await fetch(`https://raw.githubusercontent.com/tlecardo/testGPX/main/${name}.gpx`).then((res) =>
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
  )
}

renderMap().catch(console.error);
