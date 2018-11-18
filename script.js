// Configurable Variables
var team2Watch = ["Liverpool", "Wolves"];
var rectWidth = 160
var spacer = 3
var numWeeks = 4



var slide8Sorted = false;
var slide8x;
var slide8svg;
var slide8xAxis;
var scrollComplete = false;

var datax = [{
  "id": 1,
  "team": "Liverpool",
  "value1": 2,
  "value2": 1,
  "value3": 1,
  "value4": 2,
  "value5": 1,
  "value6": 2
 },
 {
  "id": 2,
  "team": "Chelsea",
  "value1": 3,
  "value2": 3,
  "value3": 2,
  "value4": 1,
  "value5": 3,
  "value6": 3
 },
 {
  "id": 3,
  "team": "AFC Bournemouth",
  "value1": 6,
  "value2": 6,
  "value3": 6,
  "value4": 5,
  "value5": 8,
  "value6": 7
 },
 {
  "id": 4,
  "team": "Crystal Palace",
  "value1": 10,
  "value2": 10,
  "value3": 15,
  "value4": 12,
  "value5": 11,
  "value6": 13
 },
 {
  "id": 5,
  "team": "Manchester City",
  "value1": 1,
  "value2": 5,
  "value3": 4,
  "value4": 3,
  "value5": 2,
  "value6": 1
 },
 {
  "id": 6,
  "team": "Watford",
  "value1": 4,
  "value2": 4,
  "value3": 3,
  "value4": 4,
  "value5": 4,
  "value6": 6
 },
 {
  "id": 7,
  "team": "Manchester Utd",
  "value1": 9,
  "value2": 13,
  "value3": 10,
  "value4": 8,
  "value5": 7,
  "value6": 10
 },
 {
  "id": 8,
  "team": "Tottenham Hotspur",
  "value1": 5,
  "value2": 2,
  "value3": 5,
  "value4": 6,
  "value5": 5,
  "value6": 4
 },
 {
  "id": 9,
  "team": "Everton",
  "value1": 7,
  "value2": 8,
  "value3": 7,
  "value4": 10,
  "value5": 12,
  "value6": 11
 },
 {
  "id": 10,
  "team": "Wolves",
  "value1": 14,
  "value2": 14,
  "value3": 11,
  "value4": 9,
  "value5": 10,
  "value6": 9
 },
 {
  "id": 11,
  "team": "Burnley",
  "value1": 15,
  "value2": 18,
  "value3": 19,
  "value4": 20,
  "value5": 16,
  "value6": 12
 },
 {
  "id": 12,
  "team": "Southampton",
  "value1": 13,
  "value2": 17,
  "value3": 12,
  "value4": 13,
  "value5": 14,
  "value6": 16
 },
 {
  "id": 13,
  "team": "Leicester City",
  "value1": 8,
  "value2": 7,
  "value3": 8,
  "value4": 11,
  "value5": 9,
  "value6": 8
 },
 {
  "id": 14,
  "team": "Newcastle Utd",
  "value1": 12,
  "value2": 16,
  "value3": 18,
  "value4": 19,
  "value5": 18,
  "value6": 18
 },
 {
  "id": 15,
  "team": "Arsenal",
  "value1": 17,
  "value2": 9,
  "value3": 9,
  "value4": 7,
  "value5": 6,
  "value6": 5
 },
 {
  "id": 16,
  "team": "Brighton",
  "value1": 11,
  "value2": 12,
  "value3": 14,
  "value4": 14,
  "value5": 13,
  "value6": 15
 },
 {
  "id": 17,
  "team": "Cardiff City",
  "value1": 16,
  "value2": 15,
  "value3": 16,
  "value4": 17,
  "value5": 19,
  "value6": 19
 },
 {
  "id": 18,
  "team": "Fulham",
  "value1": 18,
  "value2": 11,
  "value3": 13,
  "value4": 15,
  "value5": 15,
  "value6": 17
 },
 {
  "id": 19,
  "team": "Huddersfield Town",
  "value1": 20,
  "value2": 19,
  "value3": 17,
  "value4": 18,
  "value5": 20,
  "value6": 20
 },
 {
  "id": 20,
  "team": "West Ham Utd",
  "value1": 19,
  "value2": 20,
  "value3": 20,
  "value4": 16,
  "value5": 17,
  "value6": 14
 }
]

// Reverse the initial order to present correctly on layout
var data = datax.reverse();

var numTeams = data.length;

var svg = d3.select("svg"),
 margin = {
  top: 20,
  right: 20,
  bottom: 10,
  left: 40
 },
 width = +svg.attr("width") - margin.left - margin.right,
 height = +svg.attr("height") - margin.top - margin.bottom - 20;

slide8svg = svg;

var tooltip = d3.select("body").append("div").attr("class", "toolTip");

var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleBand().range([height, 0]);
slide8x = y;

var g = svg.append("g")
 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


x.domain([0, d3.max(data, function(d) {
 return d.value1;
})]);
y.domain(data.map(function(d) {
 return d.id;
})).padding(0.1);


//g.append("g")
//  .attr("class", "x axis")
//  .attr("transform", "translate(0," + rectWidth * numWeeks + ")")
//  .call(d3.axisBottom(x).ticks(4,"s").tickFormat(function(d) { return parseInt(d); }).tickSizeInner([-height]));

// Add the Y-axis
g.append("g")
 .attr("class", "y axis")
 .call(d3.axisLeft(y));

// Add the background bars for the initial league positions
g.selectAll(".bar")
 .data(data)
 .enter()
 .append("rect")
 .attr("class", "bar")
 .attr("x", 0)
 .attr("height", y.bandwidth())
 .attr("y", function(d) {
  return y(d.id);
 })
 .attr("width", rectWidth)
 //.attr("fill", "blue")
 .attr("fill", function(d) {
  if (team2Watch.includes(d.team)) return "rgb(0,255,135, 0.8)";
  else {
   return "rgb(233,0,82,0.8)";
  }
 })

// Add teamnames to the initial league positions
g.selectAll(".text")
 .data(data)
 .enter()
 .append("text")
 .attr("class", "text")
 .text(function(d) {
  console.log(d.team);
  return d.team;
 })
 .attr("x", 35)
 .attr("y", function(d) {
  return y(d.id) + (y.bandwidth() / 2) + 5;
 })
 .attr("text-anchor", "left")
 .attr("font-family", "sans-serif")
 .attr("font-size", "14px")
 .attr("fill", function(d) {
  if (team2Watch.includes(d.team)) {
   return "black";
  } else {
   return "white";
  }
 });

// Add images to the initial league positions
g.selectAll(".image")
 .data(data)
 .enter()
 .append("image")
 .attr("class", "image")
 .attr("xlink:href", function(d) {
  return "file:" + d.team + ".png"
 })
 .attr("x", "5")
 .attr("y", function(d) {
  return y(d.id) + (y.bandwidth() / 2) - 10;
 })
 .attr("width", "20")
 .attr("height", "20");

// Add the text for the initial Week No.
g.append("text")
 .attr("class", "textWeekNum")
 .text("Week-1")
 .attr("x", 55)
 .attr("y", 505)
 .attr("font-family", "sans-serif")
 .attr("fill", "white")
 .attr("font-size", "12px");

var selector = d3.select("#selector");

selector
 .selectAll("option")
 .data(data)
 .enter()
 .append("option")
 .text(function(d) {
  return d.team;
 })
//.attr("value", function(d) {
//  return d.team;
// })

selector
 .on("change", function() {
  d3.select(this)
   .selectAll("option")
   .filter(function(d, i) {
    console.log(this.selected)
    var aaa = this.selected;
    //console.log(aaa)
   })

 })

d3.select("#SelectBtn")
 .on('click', function(d) {
  console.log("clicked")
  var v = selector.filter(function(d) {
   return this.selected;
  }).data();
  alert(v);
 });

//------------------------------------------------------------------------------------------
function changeSort(z, col) {

 var svg = d3.select("svg"),
  margin = {
   top: 20,
   right: 20,
   bottom: 10,
   left: 40
  },
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom - 20;

 var y = d3.scaleBand().range([height, 0]);

 y.domain(data.map(function(d) {
  return d.id;
 })).padding(0.1);

 g.selectAll(".bar" + col)
  .data(data)
  .enter()
  .append("rect")
  .attr("class", "bar" + col)
  .attr("x", rectWidth * (col - 1) + ((col - 1) * spacer))
  .attr("height", y.bandwidth())
  .attr("y", function(d) {
   return y(d.id);
  })
  .attr("width", rectWidth)
  .attr("fill", function(d) {
   if (team2Watch.includes(d.team)) return "rgb(0,255,135, 0.5)";
   else {
    return "rgb(233,0,82,0.5)";
   }
  });


 g.selectAll(".text" + col)
  .data(data)
  .enter()
  .append("text")
  .attr("class", "text" + col)
  .text(function(d) {
   return d.team;
  })
  .attr("x", rectWidth * (col - 1) + ((col - 1) * spacer) + 35)
  .attr("y", function(d) {
   return y(d.id) + (y.bandwidth() / 2) + 5;
  })
  .attr("text-anchor", "left")
  .attr("font-family", "sans-serif")
  .attr("font-size", "14px")
  .attr("fill", function(d) {
   if (team2Watch.includes(d.team)) {
    return "black";
   } else {
    return "white";
   }
  });

 g.selectAll(".image" + col)
  .data(data)
  .enter()
  .append("image")
  .attr("class", "image" + col)
  .attr("xlink:href", function(d) {
   return "file:" + d.team + ".png"
  })
  .attr("x", rectWidth * (col - 1) + ((col - 1) * spacer) + 5)
  .attr("y", function(d) {
   return y(d.id) + (y.bandwidth() / 2) - 10;
  })
  .attr("width", "20")
  .attr("height", "20");

 // Sort and copy the array
 var x0 = y.domain(data.sort(slide8Sorted ?
    function(a, b) {
     return b[z] - a[z];
    } :
    function(a, b) {
     return d3.descending(a[z], b[z]);
    })
   .map(function(d) {
    return d.id;
   }))
  .copy();

 //Define the transition speeds
 var transition = slide8svg.transition().duration(1750),
  delay = function(d, i) {
   return i * 50;
  };


 //Move the bars
 transition.selectAll(".bar")
  .delay(delay)
  .attr("x", (rectWidth * col) + (col * spacer))
  .attr("y", function(d) {
   return x0(d.id);
  });

 // Move the text
 transition.selectAll(".text")
  .delay(delay)
  .attr("x", (rectWidth * col) + (col * spacer) + 35)
  .attr("y", function(d) {
   return x0(d.id) + (y.bandwidth() / 2) + 5;
  });

 // Move the images
 transition.selectAll(".image")
  .delay(delay)
  .attr("x", (rectWidth * col) + (col * spacer) + 5)
  .attr("y", function(d) {
   return x0(d.id) + (y.bandwidth() / 2) - 10;
  });

 // Add the text for the initial Week No.
 g.append("text")
  .attr("class", "textWeekNum")
  .text("Week-" + (col + 1).toString())
  .attr("x", (rectWidth * col) + (col * spacer) + 55)
  .attr("y", 505)
  .attr("font-family", "sans-serif")
  .attr("font-size", "12px");

}

d3.select("#weekBtn").on("click", function() {
 var wNum = parseInt(d3.select(this).text().split('-')[1]);
 d3.select(this).text("Week-" + (wNum + 1).toString())
 if (wNum >= 4) {
  changeSort("value" + wNum, wNum);
  //}
 } else {
  changeSort("value" + wNum, wNum);
 }

});
