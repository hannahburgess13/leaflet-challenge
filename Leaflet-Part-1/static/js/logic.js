//earthquake data last 7 days
queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// d3 data
d3.json(queryUrl).then(function (data) {
createFeatures(data.features);
});

// create the function for earthquake marker
function createFeatures(earthquakemarker) {

  // use data from each faeture to create a an earthquake
  for (let i = 0; i < earthquakemarker.length; i++) {
    let earthquake = earthquakemarker[i];
    let geo = earthquake.geometry;
    let location = [geo.coordinates[1], geo.coordinates[0]];

    // color marker
    let color = "";
    if (geo.coordinates[2] >= 90) {
        color = "#ff6062";
    }
    else if (geo.coordinates[2] >= 70) {
        color = "#ffa25c";
    }
    else if (geo.coordinates[2] >= 50) {
        color = "#fdb72d";
    }
    else if (geo.coordinates[2] >= 30) {
        color = "#f4da18";
    }
    else if (geo.coordinates[2] >= 10) {
        color = "#ddf500";
    }
    else {
        color = "#a3f600";
    }

    //circles
    L.circle(location, {
      fillColor: color,
        fillOpacity: 0.9,
        color: "Black",
        weight: 0.5,
        //adjust radius,
        radius: (earthquake.properties.mag) * 20000
    }).bindPopup(`<h3>${earthquake.properties.place}</h3><hr><p>Magnitude: ${earthquake.properties.mag}</p><p>Depth: ${geo.coordinates[2]} km</p>`).addTo(myMap); 
  };


};

// layer
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// baseMaps
let baseMaps = {
  "Street Map": street,
  "Topographic Map": topo
};


let myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 5,
  layers: [street]
});

L.control.layers(baseMaps).addTo(myMap);

// legend
let color_legend = L.control({
  position: "bottomright"
});


// add color to map
color_legend.onAdd = function () {
  let div = L.DomUtil.create("div", "depth_legend");
  let depth_colors = ["#a3f600", "#ddf500", "#f4da18", "#fdb72d", "#ffa25c", "#ff6062"];
  let depth_labels = ["-10-10", "10-30", "30-50", "50-70", "70-90", "90+"]

  //Update the legend to include the desired color squares and information
  div.innerHTML =
    `<h3> Depth (km)</h3>
    <div class='depth_info'>
      <input type='text' value=${depth_labels[0]} />
      <div class='depth_color' style='background-color: ${depth_colors[0]};'></div>
    </div>
    <div class='depth_info'>
      <input type='text' value=${depth_labels[1]} />
      <div class='depth_color' style='background-color: ${depth_colors[1]};'></div>
    </div>
    <div class='depth_info'>
      <input type='text' value=${depth_labels[2]} />
      <div class='depth_color' style='background-color: ${depth_colors[2]};'></div>
    </div>
    <div class='depth_info'>
      <input type='text' value=${depth_labels[3]} />
      <div class='depth_color' style='background-color: ${depth_colors[3]};'></div>
    </div>
    <div class='depth_info'>
      <input type='text' value=${depth_labels[4]} />
      <div class='depth_color' style='background-color: ${depth_colors[4]};'></div>
    </div>
    <div class='depth_info'>
      <input type='text' value=${depth_labels[5]} />
      <div class='depth_color' style='background-color: ${depth_colors[5]};'></div>
    </div>`
 
  return div;
};
color_legend.addTo(myMap);
