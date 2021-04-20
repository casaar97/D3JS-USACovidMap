# Map of COVID cases in USA

![animated map](./content/animatedMap.gif "Animated Map")

This time, we will reuse the code from: https://github.com/casaar97/D3JS-SpainCovidMap-V2

We have to face two challenges here:

- Change the map from Spain to USA.
- Get data about COVID-19 total cases in each of the USA state.
- Get data about COVID-19 total deaths in each of the USA state.
- Get data about each state location.
- Set a color scale for the number of cases and deaths.
- Set a color for each state depending of it's number of cases and deaths using the color scale.

# Objective

We will compare the situation of COVID cases in the different states of USA. In addition, we wll also show the sates in different colors. The darker the color, the greater is the number of cases/deaths. In order to do this, we will compare the total accumulated cases/deaths of each state, taking as a reference the state with most cases/deaths.

# Data

- Longitude and latitude of each state: https://www.latlong.net/category/states-236-14.html
- Number of COVID-19 total cases and deaths per state: https://www.worldometers.info/coronavirus/country/us/

# Try the project

If you want to try the project, you just have to type the following into the terminal:

```bash
npm start
```

- Note that the steps below must be completed or the repository must be cloned before.

# Steps

The first thing you have to do is to create a project folder containing the following files and directories:

- src/ (directory)
- package.json (npm configuration file)
- tsconfig.json (typescript configuration file)

The second thing we need to do is to install npm and the following modules:

```bash
npm install
```

When you deal with maps you can use two map formats GeoJSON or TopoJSON, topoJSON is lightweight and offers some extra features, let's install the needed package to work with:

```bash
npm install topojson-client --save
```

```bash
npm install @types/topojson-client --save-dev
```

Let's install the library that contains this projections:

```bash
npm install d3-composite-projections --save
```

Let's install the node typings to get require typing:

```bash
npm install @types/node --save-dev
```

Once we have everything we needed installed, let´s create the required files in the src/ directory:

- src/index.ts: Business logic.
- src/states.ts: Contains information about the latitude and longitude of each state of USA.
- src/totalCases.ts: Contains information about COVID-19 cases per state.
- src/totalDeaths.ts: Contains information about COVID-19 deaths per state.
- src/index.html: HTML code of the project.
- src/map.css: CSS code of the project.

### src/index.html:

```diff
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="./map.css" />
  </head>
  <body>
    <div>
      <button id="cases">Total Cases</button>
      <button id="deaths">Total Deaths</button>
    </div>
    <script src="./index.ts"></script>
  </body>
</html>
```

### src/states.ts:

```typescript
export const latLongStates = [
  {
    name: "Wisconsin",
    long: -89.5,
    lat: 44.5,
  },
  {
    name: "West Virginia",
    long: -80.5,
    lat: 39.0,
  },
  {
    name: "Vermont",
    long: -72.699997,
    lat: 44.0,
  },
  {
    name: "Texas",
    long: -100.0,
    lat: 31.0,
  },
  {
    name: "South Dakota",
    long: -100.0,
    lat: 44.5,
  },
  {
    name: "Rhode Island",
    long: -71.5,
    lat: 41.700001,
  },
  {
    name: "Oregon",
    long: -120.5,
    lat: 44.0,
  },
  {
    name: "New York",
    long: -75.0,
    lat: 43.0,
  },
  {
    name: "New Hampshire",
    long: -71.5,
    lat: 44.0,
  },
  {
    name: "Nebraska",
    long: -100.0,
    lat: 41.5,
  },
  {
    name: "Kansas",
    long: -98.0,
    lat: 38.5,
  },
  {
    name: "Mississippi",
    long: -90.0,
    lat: 33.0,
  },
  {
    name: "Illinois",
    long: -89.0,
    lat: 40.0,
  },
  {
    name: "Delaware",
    long: -75.5,
    lat: 39.0,
  },
  {
    name: "Connecticut",
    long: -72.699997,
    lat: 41.599998,
  },
  {
    name: "Arkansas",
    long: -92.199997,
    lat: 34.799999,
  },
  {
    name: "Indiana",
    long: -86.126976,
    lat: 40.273502,
  },
  {
    name: "Missouri",
    long: -92.603760,
    lat: 38.573936,
  },
  {
    name: "Florida",
    long: -81.760254,
    lat: 27.994402,
  },
  {
    name: "Nevada",
    long: -117.224121,
    lat: 39.876019,
  },
  {
    name: "Maine",
    long: -68.972168,
    lat: 45.367584,
  },
  {
    name: "Michigan",
    long: -84.506836,
    lat: 44.182205,
  },
  {
    name: "Georgia",
    long: -83.441162,
    lat: 33.247875,
  },
  {
    name: "Hawaii",
    long: -155.844437,
    lat: 19.741755,
  },
  {
    name: "Alaska",
    long: -153.369141,
    lat: 66.160507,
  },
  {
    name: "Tennessee",
    long: -86.660156,
    lat: 35.860119,
  },
  {
    name: "Virginia",
    long: -78.024902,
    lat: 37.926868,
  },
  {
    name: "New Jersey",
    long: -74.871826,
    lat: 39.833851,
  },
  {
    name: "Kentucky",
    long: -84.270020,
    lat: 37.839333,
  },
  {
    name: "North Dakota",
    long: -100.437012,
    lat: 47.650589,
  },
  {
    name: "Minnesota",
    long: -94.636230,
    lat: 46.392410,
  },
  {
    name: "Oklahoma",
    long: -96.921387,
    lat: 36.084621,
  },
  {
    name: "Montana",
    long: -109.533691,
    lat: 46.965260,
  },
  {
    name: "Washington State",
    long: -120.740135,
    lat: 47.751076,
  },
  {
    name: "Utah",
    long: -111.950684,
    lat: 39.419220,
  },
  {
    name: "Colorado",
    long: -105.358887,
    lat: 39.113014,
  },
  {
    name: "Ohio",
    long: -82.996216,
    lat: 40.367474,
  },
  {
    name: "Alabama",
    long: -86.902298,
    lat: 32.318230,
  },
  {
    name: "Iowa",
    long: -93.581543,
    lat: 42.032974,
  },
  {
    name: "New Mexico",
    long: -106.018066,
    lat: 34.307144,
  },
  {
    name: "South Carolina",
    long: -81.163727,
    lat: 33.836082,
  },
  {
    name: "Pennsylvania",
    long: -77.194527,
    lat: 41.203323,
  },
  {
    name: "Arizona",
    long: -111.093735,
    lat: 34.048927,
  },
  {
    name: "Maryland",
    long: -76.641273,
    lat: 39.045753,
  },
  {
    name: "Massachusetts",
    long: -71.382439,
    lat: 42.407211,
  },
  {
    name: "California",
    long: -119.417931,
    lat: 36.778259,
  },
  {
    name: "Idaho",
    long: -114.742043,
    lat:	44.068203,
  },
  {
    name: "Wyoming",
    long: -107.290283,
    lat: 43.075970,
  },
  {
    name: "North Carolina",
    long: -80.793457,
    lat: 35.782169,
  },
  {
    name: "Louisiana",
    long: -92.329102,
    lat:	30.391830,
  }
];
```

### src/totalCases.ts:

```typescript
export interface ResultEntry {
    name: string;
    value: number;
  }
  
  export const cases: ResultEntry[] = [
    {
      name: "Wisconsin",
      value: 590831
    },
    {
      name: "West Virginia",
      value: 149147
    },
    {
      name: "Vermont",
      value: 22112
    },
    {
      name: "Texas",
      value: 2859452
    },
    {
      name: "South Dakota",
      value: 121189 
    },
    {
      name: "Rhode Island",
      value: 144966
    },
    {
      name: "Oregon",
      value: 175592
    },
    {
      name: "New York",
      value: 2049527
    },
    {
      name: "New Hampshire",
      value: 91783
    },
    {
      name: "Nebraska",
      value: 216613
    },
    {
      name: "Kansas",
      value: 307729
    },
    {
      name: "Mississippi",
      value: 309223
    },
    {
      name: "Illinois",
      value: 1304200
    },
    {
      name: "Delaware",
      value: 101547
    },
    {
      name: "Connecticut",
      value: 331401
    },
    {
      name: "Arkansas",
      value: 333511
    },
    {
      name: "Indiana",
      value: 708779
    },
    {
      name: "Missouri",
      value: 577317
    },
    {
      name: "Florida",
      value: 2173138
    },
    {
      name: "Nevada",
      value: 310933
    },
    {
      name: "Maine",
      value: 57965
    },
    {
      name: "Michigan",
      value: 882871
    },
    {
      name: "Georgia",
      value: 1085161
    },
    {
      name: "Hawaii",
      value: 31446
    },
    {
      name: "Alaska",
      value: 63675
    },
    {
      name: "Tennessee",
      value: 835842
    },
    {
      name: "Virginia",
      value: 648347
    },
    {
      name: "New Jersey",
      value: 981036
    },
    {
      name: "Kentucky",
      value: 437543
    },
    {
      name: "North Dakota",
      value: 105805
    },
    {
      name: "Minnesota",
      value: 557665
    },
    {
      name: "Oklahoma",
      value: 445650
    },
    {
      name: "Montana",
      value: 107202
    },
    {
      name: "Washington State",
      value: 389143
    },
    {
      name: "Utah",
      value: 392957
    },
    {
      name: "Colorado",
      value: 491066
    },
    {
      name: "Ohio",
      value: 18991
    },
    {
      name: "Alabama",
      value: 522512
    },
    {
      name: "Iowa",
      value: 389542
    },
    {
      name: "New Mexico",
      value: 195478
    },
    {
      name: "South Carolina",
      value: 570032 
    },
    {
      name: "Pennsylvania",
      value: 1114473
    },
    {
      name: "Arizona",
      value: 854453
    },
    {
      name: "Maryland",
      value: 436659
    },
    {
      name: "Massachusetts",
      value: 673974
    },
    {
      name: "California",
      value: 3721390
    },
    {
      name: "Idaho",
      value: 185227
    },
    {
      name: "Wyoming",
      value: 57378 
    },
    {
      name: "North Carolina",
      value: 949366
    },
    {
      name: "Louisiana",
      value: 453351 
    }
  ];
```

### src/totalCases.ts:

```typescript
export interface ResultEntry {
    name: string;
    value: number;
  }

  export const deaths: ResultEntry[] = [
    {
      name: "Wisconsin",
      value: 6710
    },
    {
      name: "West Virginia",
      value: 2785
    },
    {
      name: "Vermont",
      value: 242
    },
    {
      name: "Texas",
      value: 49837
    },
    {
      name: "South Dakota",
      value: 1953
    },
    {
      name: "Rhode Island",
      value: 2651
    },
    {
      name: "Oregon",
      value: 2460
    },
    {
      name: "New York",
      value: 51900
    },
    {
      name: "New Hampshire",
      value: 1270
    },
    {
      name: "Nebraska",
      value: 2215
    },
    {
      name: "Kansas",
      value: 4987
    },
    {
      name: "Mississippi",
      value: 7153
    },
    {
      name: "Illinois",
      value: 23976
    },
    {
      name: "Delaware",
      value: 1602
    },
    {
      name: "Connecticut",
      value: 8014
    },
    {
      name: "Arkansas",
      value: 5699
    },
    {
      name: "Indiana",
      value: 13226
    },
    {
      name: "Missouri",
      value: 9326
    },
    {
      name: "Florida",
      value: 34479
    },
    {
      name: "Nevada",
      value: 5368
    },
    {
      name: "Maine",
      value: 767
    },
    {
      name: "Michigan",
      value: 17996
    },
    {
      name: "Georgia",
      value: 19784
    },
    {
      name: "Hawaii",
      value: 474
    },
    {
      name: "Alaska",
      value: 329 
    },
    {
      name: "Tennessee",
      value: 12081
    },
    {
      name: "Virginia",
      value: 10625
    },
    {
      name: "New Jersey",
      value: 25161
    },
    {
      name: "Kentucky",
      value: 6347
    },
    {
      name: "North Dakota",
      value: 1479
    },
    {
      name: "Minnesota",
      value: 7094
    },
    {
      name: "Oklahoma",
      value: 6697
    },
    {
      name: "Montana",
      value: 1546
    },
    {
      name: "Washington State",
      value: 5443
    },
    {
      name: "Utah",
      value: 2166
    },
    {
      name: "Colorado",
      value: 6344
    },
    {
      name: "Ohio",
      value: 1054807
    },
    {
      name: "Alabama",
      value: 10790
    },
    {
      name: "Iowa",
      value: 5886
    },
    {
      name: "New Mexico",
      value: 4007 
    },
    {
      name: "South Carolina",
      value: 9352
    },
    {
      name: "Pennsylvania",
      value: 25800
    },
    {
      name: "Arizona",
      value: 17153
    },
    {
      name: "Maryland",
      value: 8574
    },
    {
      name: "Massachusetts",
      value: 17481
    },
    {
      name: "California",
      value: 61038
    },
    {
      name: "Idaho",
      value: 2202
    },
    {
      name: "Wyoming",
      value: 703
    },
    {
      name: "North Carolina",
      value: 12418
    },
    {
      name: "Louisiana",
      value: 10293
    }
  ];
```

### src/map.css:

We will create two classes:

- state: Class for the state color and state lines.
- affected-marker: Class for the orange circles.

```typescript
.state {
  stroke-width: 1;
  stroke: #c3d3db;
  fill: #008c86;
}

.affected-marker {
  stroke-width: 1;
  stroke: #bc5b40;
  fill: #f88f70;
  fill-opacity: 0.7;
}
```

We will use USA topojson info: https://github.com/deldersveld/topojson/blob/master/countries/united-states/us-albers.json

Let's copy it under the following route _./src/us-albers.json_

- Now we will import all the required dependencies into _index.ts_:

_./src/index.ts_

```diff
import * as d3 from "d3";
import * as topojson from "topojson-client";
const usajson = require("./us-albers.json");
const d3Composite = require("d3-composite-projections");
import { latLongStates } from "./states";
import { cases, ResultEntry } from "./totalCases";
import { deaths } from "./totalDeaths";
```

- Let's build the USA map:

_./src/index.ts_

```typescript
const width = 1024;
const height = 800;

const aProjection = d3Composite
  .geoAlbersUsa()
  .translate([width / 2, height / 2])
  .scale(width); // Let's make the map bigger to fit in our resolution

const geoPath = d3.geoPath().projection(aProjection);
const geojson = topojson.feature(usajson, usajson.objects.us);

```

Now let's create the map:

```typescript
const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("style", "background-color: #FBFAF0");

svg
  .selectAll("path")
  .data(geojson["features"])
  .enter()
  .append("path")
  .attr("class", "state")
  // data loaded from json file
  .attr("d", geoPath as any);
```

At this point, the map has been created. Now we will create some functions in order to make everything work as we desire:

### Get the number of cases of the most affected state:

```typescript
const calculateMaxAffected = (dataset: ResultEntry[]) => {
  return dataset.reduce(
    (max, item) => (item.value > max ? item.value : max),
    0
  );
};
```

### Create a radius scale for the radius of each state circunference depending on the number of cases of the most affected state:

```typescript
const calculateAffectedRadiusScale = (maxAffected: number) => {
  return d3.scaleLinear().domain([0, maxAffected]).range([0, 50]);
};
```

### Scale the radius of each circunference depending on the number of cases:

```typescript
const calculateRadiusBasedOnAffectedCases = (
  comunidad: string,
  dataset: ResultEntry[]
) => {
  const maxAffected = calculateMaxAffected(dataset);

  const affectedRadiusScale = calculateAffectedRadiusScale(maxAffected);

  const entry = dataset.find((item) => item.name === comunidad);

  return entry ? affectedRadiusScale(entry.value) + 5 : 0;
};
```

### Create a color scale in order to assign a color for each state depending on it's COVID-19 number of cases:

```typescript
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
```

### Assing a color to each state depending on it's COVID-19 number of cases:

```typescript
const assignColorToState = (comunidad: string, dataset: ResultEntry[]) => {
  const entry = dataset.find((item) => item.name === comunidad);

  const color = getScaledColor(dataset);

  return entry ? color(entry.value) : color(0);
};
```

### Update chart when buttons are clicked

We now that we have to pass d.properties.NAME_1 as a parameter for assignColorToState function because when we inspect spain.json, we can see that the property NAME_1 refers to the state name.

```typescript
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
```

### Add button logic

```typescript
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
```


### Add initial stats to the map by default

```typescript
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
```
