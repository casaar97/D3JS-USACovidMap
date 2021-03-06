import * as d3 from "d3";
import * as topojson from "topojson-client";
const usajson = require("./us-albers.json");
const d3Composite = require("d3-composite-projections");
import { latLongStates } from "./states";
import { cases, ResultEntry } from "./totalCases";
import { deaths } from "./totalDeaths";

const width = 1024;
const height = 800;

const aProjection = d3Composite
  .geoAlbersUsa()
  .translate([width / 2, height / 2])
  .scale(width); // Let's make the map bigger to fit in our resolution

const geoPath = d3.geoPath().projection(aProjection);
const geojson = topojson.feature(usajson, usajson.objects.us);

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("style", "background-color: #FBFAF0");

const calculateMaxAffected = (dataset: ResultEntry[]) => {
  return dataset.reduce(
    (max, item) => (item.value > max ? item.value : max),
    0
  );
};

const calculateAffectedRadiusScale = (maxAffected: number) => {
  return d3.scaleLinear().domain([0, maxAffected]).range([0, 20]);
};

const calculateRadiusBasedOnAffectedCases = (
  state: string,
  dataset: ResultEntry[]
) => {
  const maxAffected = calculateMaxAffected(dataset);

  const affectedRadiusScale = calculateAffectedRadiusScale(maxAffected);

  const entry = dataset.find((item) => item.name === state);

  const adder = d3
    .scaleThreshold<number, number>()
    .domain([0, 1000, 10000, 100000, 1000000])
    .range([1, 3, 5, 10, 20]);

  return entry ? affectedRadiusScale(entry.value) + adder(maxAffected) : 0;
};

const getScaledColor = (dataset: ResultEntry[]) => {
  const maxValue = calculateMaxAffected(dataset);

  const color = d3
    .scaleThreshold<number, string>()
    .domain([
      0,
      maxValue * 0.1,
      maxValue * 0.25,
      maxValue * 0.5,
      maxValue * 0.75,
      maxValue,
    ])
    .range(["#fcfeff", "#c3d3db", "#80a9bd", "#5089a6", "#227199", "#04364f"]);

  return color;
};

const assignColorToState = (state: string, dataset: ResultEntry[]) => {
  const entry = dataset.find((item) => item.name === state);

  const color = getScaledColor(dataset);

  return entry ? color(entry.value) : color(0);
};

document
  .getElementById("cases")
  .addEventListener("click", function handleCases() {
    updateChart(cases);
  });

document
  .getElementById("deaths")
  .addEventListener("click", function handleDeaths() {
    updateChart(deaths);
  });

const updateChart = (dataset: ResultEntry[]) => {
  svg
    .selectAll("path")
    .data(geojson["features"])
    .attr("class", "state")
    // data loaded from json file
    .attr("d", geoPath as any)
    .transition()
    .duration(800)
    .style("fill", function (d: any) {
      return assignColorToState(d.properties.name, dataset);
    });

  svg
    .selectAll("circle")
    .data(latLongStates)
    .attr("class", "affected-marker")
    .attr("cx", (d) => aProjection([d.long, d.lat])[0])
    .attr("cy", (d) => aProjection([d.long, d.lat])[1])
    .transition()
    .duration(800)
    .attr("r", (d) => calculateRadiusBasedOnAffectedCases(d.name, dataset));
};

// Define the div for the tooltip
const div = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

svg
  .selectAll("path")
  .data(geojson["features"])
  .enter()
  .append("path")
  .attr("class", "state")
  // data loaded from json file
  .attr("d", geoPath as any)
  .style("fill", function (d: any) {
    return assignColorToState(d.properties.name, cases);
  });

svg
  .selectAll("circle")
  .data(latLongStates)
  .enter()
  .append("circle")
  .attr("class", "affected-marker")
  .attr("cx", (d) => aProjection([d.long, d.lat])[0])
  .attr("cy", (d) => aProjection([d.long, d.lat])[1])
  .attr("r", (d) => calculateRadiusBasedOnAffectedCases(d.name, cases));
