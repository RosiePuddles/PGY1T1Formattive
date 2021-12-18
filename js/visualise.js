/**
 * File That's only used for data visualisation using D3
 * Code from https://www.d3-graph-gallery.com/graph/choropleth_basic.html
 * Additions and alterations made to allow the svg to be correctly sized upon loading
 */

// The svg
const svg = d3.select("svg"),
    subWidth = 947.47,
    height = +svg.attr("height");

// Map and projection
width = document.getElementById("svg_parent").clientWidth;
const path = d3.geoPath();
const projection = d3.geoNaturalEarth1().center([0,0]);

// Data and color scale
let data = new Map();
const colorScale = d3.scaleLinear()
    .domain([100, 20, 0])
    .range(d3.schemePiYG[3]);

// Load external data and boot
Promise.all([
    // world.geojson is from https://github.com/holtzy/D3-graph-gallery/blob/master/DATA/world.geojson
    d3.json("assets/data/world.geojson"),
    d3.csv("assets/data/share-co2-emissions-vs-population.csv", {typed: true}, function(d) {
        if (d.Code) {
            data.set(d.Code, Math.min(100, 20 * d.co2 / d.popn));
        }
    })
]).then(function(loadData){
    let topo = loadData[0];

    // Draw the map
    let g = svg.append("g")
        .attr("id", "svg_body");
    if (width < subWidth) {
        g = g.attr("transform", "scale(" + width / subWidth + ")");
    } else {
        g = g.attr("transform", "translate(" + (width - subWidth) / 2 + ", 0)");
    }
        g.selectAll("path")
        .data(topo.features)
        .join("path")
        // draw each country
        .attr("d", d3.geoPath()
            .projection(projection)
        )
        // set the color of each country
        .attr("fill", function (d) {
            d.total = data.get(d.id) || 0;
            return colorScale(d.total);
        });
});

if (width < subWidth) {
    document.getElementById("find_me").style.height = "" + 491.02 * width / subWidth;
}
