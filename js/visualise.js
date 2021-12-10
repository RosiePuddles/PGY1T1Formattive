/**
 * File That's only used for data visualisation using D3
 * Code from https://www.d3-graph-gallery.com/graph/choropleth_basic.html
 */

// The svg
const svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Map and projection
const path = d3.geoPath();
const projection = d3.geoNaturalEarth1()
    .scale(150)
    .center([0,20])
    .translate([width / 2, height / 2]);

// Data and color scale
let data = new Map()
const colorScale = d3.scaleLinear()
    .domain([99, 20, 0])
    .range(d3.schemePiYG[3]);

// Load external data and boot
Promise.all([
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
    d3.csv("assets/data/share-co2-emissions-vs-population.csv", {typed: true}, function(d) {
        if (d.Code) {
            data.set(d.Code, 20 * d.co2 / d.popn)
        }
    })
]).then(function(loadData){
    let topo = loadData[0]

    // Draw the map
    svg.append("g")
        .selectAll("path")
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
        })
})
