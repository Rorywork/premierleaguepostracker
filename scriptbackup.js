// Check for Browser - Chrome is best option
// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;

// Configurable Variables
var team2Watch = ["Arsenal", "AFC Bournemouth"];     // Initial teams to be tracked
if (isChrome) {
 var t2WBarColour = "rgb(0,255,135, 0.7)"            // Box colour for tracked teams
 //var regBarColour = "rgb(233,0,82,0.6)"            // Box colour for nontracked teams
 var regBarColour = "rgb(0,0,0,0.6)"                 // Box colour for nontracked teams
} else {
  var t2WBarColour = "lightgreen"                    // Box colour for tracked teams
  var regBarColour = "grey"                           // Box colour for nontracked teams 
}
var rectWidth = 160                                  // Width of team boxes
var spacer = 3                                       // Horizontal spacer between team boxes
var maxTeams2Track = 5                               // Max no. of teams that can be selected to track
var numValues = 40                                   // Potential total number of possible values ( weeks )            
var totalWeeks = 15                                  // Number of weeks data currently loaded ("team" contains week 1 ordering.). !!!! Increase when adding more data !!!!



var slide8Sorted = false;
var slide8x;
var slide8svg;
var slide8xAxis;
var scrollComplete = false;

var datax = [
    {"id": 1, 	"team": "Liverpool", 		       "value1": 2,	 "value2": 1,	 "value3": 1,  "value4": 2,   "value5": 1,  "value6": 2,  "value7": 3,  "value8": 2,  "value9": 2,  "value10": 3,   "value11": 2,  "value12": 2,  "value13": 2,  "value14": 2},
    {"id": 2, 	"team": "Chelsea", 		         "value1": 3,	 "value2": 3,	 "value3": 2,  "value4": 1,   "value5": 3,  "value6": 3,  "value7": 2,  "value8": 3,  "value9": 3,  "value10": 2,   "value11": 3,  "value12": 4,  "value13": 3,  "value14": 4},
    {"id": 3, 	"team": "AFC Bournemouth", 		 "value1": 6,	 "value2": 6,	 "value3": 6,  "value4": 5,   "value5": 8,  "value6": 7,  "value7": 6,  "value8": 6,  "value9": 6,  "value10": 6,   "value11": 6,  "value12": 8,  "value13": 9,  "value14": 7},
    {"id": 4, 	"team": "Crystal Palace", 	   "value1": 10, "value2": 10, "value3": 15, "value4": 12,  "value5": 11, "value6": 13, "value7": 14, "value8": 15, "value9": 14, "value10": 14,  "value11": 16, "value12": 16, "value13": 14, "value14": 15},
    {"id": 5, 	"team": "Manchester City", 		 "value1": 1,	 "value2": 5,	 "value3": 4,  "value4": 3,   "value5": 2,  "value6": 1,  "value7": 1,  "value8": 1,  "value9": 1,  "value10": 1,   "value11": 1,  "value12": 1,  "value13": 1,  "value14": 1},
    {"id": 6, 	"team": "Watford", 		         "value1": 4,	 "value2": 4,  "value3": 3,  "value4": 4,   "value5": 4,  "value6": 6,  "value7": 9,  "value8": 7,  "value9": 7,  "value10": 8,   "value11": 7,  "value12": 9,  "value13": 10, "value14": 11},
    {"id": 7, 	"team": "Manchester Utd", 		  "value1": 9,	 "value2": 13, "value3": 10, "value4": 8,   "value5": 7,  "value6": 10, "value7": 8,  "value8": 10, "value9": 8,  "value10": 7,   "value11": 8,  "value12": 7,  "value13": 7,  "value14": 8},
    {"id": 8, 	"team": "Tottenham Hotspur",  "value1": 5,	 "value2": 2,	 "value3": 5,  "value4": 6,   "value5": 5,  "value6": 4,  "value7": 5,  "value8": 5,  "value9": 5,  "value10": 4,   "value11": 4,  "value12": 3,  "value13": 5,  "value14": 3},
    {"id": 9, 	"team": "Everton",	           "value1": 7,  "value2": 8,	 "value3": 7,  "value4": 10,  "value5": 12, "value6": 11, "value7": 11, "value8": 8,  "value9": 9,  "value10": 9,   "value11": 9,  "value12": 6,  "value13": 6,  "value14": 6},
    {"id": 10, 	"team": "Wolves",            "value1": 14, "value2": 14, "value3": 11, "value4": 9,   "value5": 10, "value6": 9,  "value7": 7,  "value8": 9,  "value9": 10, "value10": 11,  "value11": 11, "value12": 11, "value13": 12, "value14": 12},
    {"id": 11, 	"team": "Burnley",           "value1": 15, "value2": 18, "value3": 19, "value4": 20,  "value5": 16, "value6": 12, "value7": 12, "value8": 13, "value9": 15, "value10": 15,  "value11": 15, "value12": 17, "value13": 19, "value14": 19},
    {"id": 12, 	"team": "Southampton", 		    "value1": 13, "value2": 17, "value3": 12, "value4": 13,  "value5": 14, "value6": 16, "value7": 16, "value8": 16, "value9": 16, "value10": 16,  "value11": 17, "value12": 18, "value13": 18, "value14": 18},
    {"id": 13, 	"team": "Leicester City", 	  "value1": 8,	 "value2": 7,	 "value3": 8,  "value4": 11,  "value5": 9,  "value6": 8,  "value7": 10, "value8": 11, "value9": 12, "value10": 10,  "value11": 10, "value12": 10, "value13": 8,  "value14": 9},
    {"id": 14, 	"team": "Newcastle Utd", 		  "value1": 12, "value2": 16, "value3": 18, "value4": 19,  "value5": 18, "value6": 18, "value7": 19, "value8": 20, "value9": 19, "value10": 17,  "value11": 14, "value12": 13, "value13": 15, "value14": 14},
    {"id": 15, 	"team": "Arsenal", 		        "value1": 17, "value2": 9,	 "value3": 9,  "value4": 7,   "value5": 6,  "value6": 5,  "value7": 4,  "value8": 4,  "value9": 4,  "value10": 5,   "value11": 5,  "value12": 5,  "value13": 4,  "value14": 5},
    {"id": 16, 	"team": "Brighton", 		       "value1": 11, "value2": 12, "value3": 14, "value4": 14,  "value5": 13, "value6": 15, "value7": 13, "value8": 12, "value9": 11, "value10": 12,  "value11": 12, "value12": 12, "value13": 11, "value14": 10},
    {"id": 17, 	"team": "Cardiff City", 		   "value1": 16, "value2": 15, "value3": 16, "value4": 17,  "value5": 19, "value6": 19, "value7": 20, "value8": 17, "value9": 17, "value10": 19,  "value11": 18, "value12": 19, "value13": 16, "value14": 16},
    {"id": 18, 	"team": "Fulham", 		         "value1": 18, "value2": 11, "value3": 13, "value4": 15,  "value5": 15, "value6": 17, "value7": 17, "value8": 18, "value9": 18, "value10": 20,  "value11": 20, "value12": 20, "value13": 20, "value14": 20},
    {"id": 19, 	"team": "Huddersfield Town", "value1": 20, "value2": 19, "value3": 17, "value4": 18,  "value5": 20, "value6": 20, "value7": 18, "value8": 19, "value9": 20, "value10": 18,  "value11": 19, "value12": 15, "value13": 17, "value14": 17},
    {"id": 20, 	"team": "West Ham Utd", 		   "value1": 19, "value2": 20, "value3": 20, "value4": 16,  "value5": 17, "value6": 14, "value7": 15, "value8": 14, "value9": 13, "value10": 13,  "value11": 13, "value12": 14, "value13": 13, "value14": 13}
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
  if (team2Watch.includes(d.team)) return t2WBarColour;
  else {
   return regBarColour;
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
  return "images/" + d.team + ".PNG"
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
 .attr("font-size", "14px");

// Handle the team2watch selection
var selector = d3.select('#selector');

var teamNames = data.map(function(d){
    return d.team;
}).reverse();
var teamSelect = selector
  .append('select')
  .attr('class', 'select')
  .attr('multiple', '')
  .attr("size", "20")
  .on('change', function(d) {
    var s = teamOptions.filter(function(d) {
      return this.selected;
      });
    if (s.nodes().length >= maxTeams2Track) {
      teamOptions.filter(function() {
        return !this.selected
      })
    .property('disabled', true);
      } else {
        teamOptions.property('disabled', false);
      }
  });


var selectedValues = [];
var teamOptions = teamSelect
    .selectAll('option')
    .data(teamNames)
    .enter()
    .append('option')
    .text(function(d) {
      return d;
    })
    .attr("selected", function(d) {
      if (team2Watch.includes(d)) {
          console.log(d)
          return "selected";
      }
    })

d3.select('#SelectBtn')
  .on('click', function(d) {
    var v = teamOptions.filter(function(d) {
      return this.selected;
    }).data();
    team2Watch = v;
    updateTeam2Watch();
    });
    
function updateTeam2Watch() {


 g.selectAll(".bar")
  .attr("fill", function(d) {
   if (team2Watch.includes(d.team)) {
    return t2WBarColour;
   }
   else { return regBarColour; }
  });

 g.selectAll(".text")
  .attr("fill", function(d) {
   if (team2Watch.includes(d.team)) {
    return "black";
   }
   else { return "white"; }
  });


 var i;
 for (i = 1; i <= numValues; i++) {
  g.selectAll(".bar" + i)
   .attr("fill", function(d) {
    if (team2Watch.includes(d.team)) {
     return t2WBarColour;
    }
    else { return regBarColour; }
   });
  g.selectAll(".text" + i)
   .attr("fill", function(d) {
    if (team2Watch.includes(d.team)) {
     return "black";
    }
    else { return "white"; }
   });
 }

}   

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
   if (team2Watch.includes(d.team)) return t2WBarColour;
   else {
    return regBarColour;
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
   return "images/" + d.team + ".PNG"
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

 // Add the text for the current Week No.
 g.append("text")
  .attr("class", "textWeekNum")
  .text("Week-" + (col + 1).toString())
  .attr("x", (rectWidth * col) + (col * spacer) + 55)
  .attr("y", 505)
  .attr("font-family", "sans-serif")
  .attr("fill", "white")  
  .attr("font-size", "14px");

}

function BestAndWorstPerformers(z) {

 var x0 = data.sort(function(a, b) { return d3.ascending(a.id - a[z], b.id - b[z]); })
  .map(function(d) { return d.team; });

 var retArray = [];
 retArray.push(x0[x0.length - 1]); // Best improvement team array pos [0]
 retArray.push(x0[0]); // Worst deterioration team array pos[1]

 return retArray;

}

function TeamProgress(type, z) {

 switch (type) {
  case "Improved":
   var x0 = data.sort(function(a, b) { return d3.ascending(a.id - a[z], b.id - b[z]); })
    .filter(function(d) { return (d.id - d[z]) > 0 })
    .map(function(d) { return d.team; });
   break;
  case "Deteriorated":
   var x0 = data.sort(function(a, b) { return d3.ascending(a.id - a[z], b.id - b[z]); })
    .filter(function(d) { return (d.id - d[z]) < 0 })
    .map(function(d) { return d.team; });
   break;
  case "RemainedSame":
   var x0 = data.sort(function(a, b) { return d3.ascending(a.id - a[z], b.id - b[z]); })
    .filter(function(d) { return (d.id - d[z]) == 0 })
    .map(function(d) { return d.team; });
 }

 // Populate the return array with the teams for each case "Improved","Deteriorated" and "RemainSame" 
 var retArray = [];
 var i;
 for (i = 0; i < x0.length; i++) {
  retArray.push(x0[i]);
 }

 return retArray;

}

d3.select("#weekBtn").on("click", function() {
 var wNum = parseInt(d3.select(this).text().split('-')[1]);
 if (wNum >= totalWeeks) {
  var BestWorst = BestAndWorstPerformers("value" +( totalWeeks - 1).toString());
  var TeamsImproved = TeamProgress("Improved","value" +( totalWeeks - 1).toString());
  var TeamsDeteriorated = TeamProgress("Deteriorated","value" +( totalWeeks - 1).toString());
  var TeamsSame = TeamProgress("RemainedSame","value" +( totalWeeks - 1).toString());
  
  alert(totalWeeks + " weeks in is the table as it stands now, the 2018-19 season is still in progress.\n\n" 
  + "The following teams have improved their position since the start of the season: " + TeamsImproved + ".\n\n"
  + "The following teams have worsened their position since the start of the season: " + TeamsDeteriorated + ".\n\n"
  + "The following teams are in the same position as they started the season: " + TeamsSame + ".\n\n"
  + "Overall " + BestWorst[0] + " have been the best improvers since the start of the season and " 
  + BestWorst[1] + " have deteriorated the most." );
 } else {
  d3.select(this).text("Week-" + (wNum + 1).toString())
  changeSort("value" + wNum, wNum);
 }

});


//--------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------
// Check for Browser - Chrome is best option
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;    // Opera 8.0+

var isFirefox = typeof InstallTrigger !== 'undefined';  // Firefox 1.0+

var isSafari = /constructor/i.test(window.HTMLElement) || (function(p) {
    return p.toString() === "[object SafariRemoteNotification]";
})(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)); // Safari 3.0+ "[object HTMLElementConstructor]" 

var isIE = /*@cc_on!@*/ false || !!document.documentMode;   // Internet Explorer 6-11

var isEdge = !isIE && !!window.StyleMedia;  // Edge 20+

//var isChrome = !!window.chrome && !!window.chrome.webstore; // Chrome 1+
var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

var isBlink = (isChrome || isOpera) && !!window.CSS;    // Blink engine detection

// End of Check for Browser Code

if (isChrome) {
    var t2WBarColour = "rgb(0,255,135, 0.7)" // Box colour for tracked teams (includes transparency for Chrome)
    var regBarColour = "rgb(0,0,0,0.6)" // Box colour for nontracked teams (includes transparency for Chrome)
} else {
    var t2WBarColour = "lightgreen" // Box colour for tracked teams (no transparency for other browsers)
    var regBarColour = "grey" // Box colour for nontracked teams (no transparency for other browsers)
}


(function() {

    // Multiple configuration variables to provide maximum flexibility in design of Tracker output
    var rectWidth = 160                     // Width of team boxes
    var spacer = 3                          // Horizontal spacer between team boxes (px)
    var barPadding = 0.1                    // Vertical Padding in the rectangular bars
    var maxTeams2Track = 5                  // Max no. of teams that can be selected to track
    
    var t2WTextColour = "Black"             // Team to watch name text colour
    var regTextColour = "White"             // Non tracked team name text colour
    
    var marginTop = 20                      // SVG Margin Top setting
    var marginRight = 40                    // SVG Margin Right setting
    var marginBottom = 10                   // SVG Margin Bottom setting
    var marginLeft = 40                     // SVG Margin Left setting
    
    var imagePosx = 5                       // Image Position offset from edge of bar (px)
    
    var textOffsetx = 35                    // Text Position offset from edge of bar (px)
    var textOffsety = 5                     // Text Position offset from top of bar (px)
    
    var textAnchor = "left"                 // Text Anchor attribute
    var textFontFamily = "sans-serif"       // Text Font Family attribute
    var textFontSize = "14px"               // Text Font Size
    
    var imageWidth = 20                     // Image width 
    var imageHeight = 20                    // Image height
    var imageOffsety = 10                   // Image Position offset in y axis
    
    var colTexty = 505                      // Column text y position
    var colTextOffsetx=55                   // Column text x offset position
    var colTextPrefix = "Week-"             // Column text prefix string
    
    var animationSpeed = 1750               // Overall Bar animation speed (ms)
    var delaySpeed = 50                     // Animation delay speed
    
    var JSONFile = "PremleaguePos.json"         // JSON data file to load
    var team2Watch = ["Arsenal", "AFC Bournemouth"];    // Array of Initial teams to be tracked in selection box
    
    // Initialisation variables
    var isSorted = false;                   // Initial Sort status of bars
    var page_svg;                           // Webpage Scalable Vector Graphics (SVG) variable


    // Open and read JSON data file using Callback mechanism to ensure completion before continuing execution
    d3.queue()
        .defer(d3.json, JSONFile)
        .await(ready)

    // Main function for script
    function ready(error, datapoints) {
        
        console.log(datapoints);
        
        // Get JSON key names and store in the array "keys"
        // Perhaps enhance and use name for future release ?
        var a = datapoints[0];
        var keys = []
        for(var k in a){
            keys.push(k)
        }
        var totalWeeks = keys.length - 2;       // Total number of weeks data in JSON ( minus 2 keys to exclude "id" and "team")

        // Sort the array into the initial position order and assign data array to the variable "data"
        var data = sortByKey(datapoints,"v1");

        // Determine number of teams in data
        var numTeams = data.length;

        // Initialise settings for Scalable Vector Graphics on HTML page
        var svg = d3.select("svg"),
            margin = {
                top: marginTop,
                right: marginRight,
                bottom: marginBottom,
                left: marginLeft
            },
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom - 20;
        page_svg = svg;

        // Initialise y scaled screen positions within the SVG area 
        var y = d3.scaleBand().range([0, height]);

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Set the y input values based upon the JSON Data for the initial week position
        y.domain(data.map(function(d) {
            return d.id;
        })).padding(barPadding);
        

        // Add the Y-axis to the SVG
        var yaxis = d3.scaleBand().range([0, height]);
        yaxis.domain(data.map(function(d) {
            console.log(d.v1);
            return d.v1;
        }));
        g.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yaxis));
            
        // Start of Code section for the initial data column position     
        
        // Update the Initial text on the "move forward" button
        d3.select("#weekBtn").text(colTextPrefix + "1")    

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
            .attr("fill", function(d) {
                if (team2Watch.includes(d.team)) return t2WBarColour;
                else {
                    return regBarColour;
                }
            })

        // Add teamnames to the initial league positions
        g.selectAll(".text")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "text")
            .text(function(d) {
                return d.team;
            })
            .attr("x", textOffsetx)
            .attr("y", function(d) {
                return y(d.id) + (y.bandwidth() / 2) + textOffsety;
            })
            .attr("text-anchor", textAnchor)
            .attr("font-family", textFontFamily)
            .attr("font-size", textFontSize)
            .attr("fill", function(d) {
                if (team2Watch.includes(d.team)) {
                    return t2WTextColour;
                } else {
                    return regTextColour;
                }
            });

        // Add images to the initial league positions
        g.selectAll(".image")
            .data(data)
            .enter()
            .append("image")
            .attr("class", "image")
            .attr("xlink:href", function(d) {
                return "images/" + d.team + ".PNG"
            })
            .attr("x", imagePosx)
            .attr("y", function(d) {
                return y(d.id) + (y.bandwidth() / 2) - imageOffsety;
            })
            .attr("width", imageWidth)
            .attr("height", imageHeight);

        // Add the column text for the initial Week No.
        g.append("text")
            .attr("class", "textWeekNum")
            .text(colTextPrefix + "1")
            .attr("x", colTextOffsetx)
            .attr("y", colTexty)
            .attr("font-family", textFontFamily)
            .attr("fill", regTextColour)
            .attr("font-size", textFontSize);
            
        // End of Code for the initial data column position         
        

        // Start of code to handle the team2watch selection
        var selector = d3.select('#selector');

        // Create array with teamNames sorted alphabetically
        var teamNames = data.map(function(d) {
            return d.team;
        }).sort();
        
        var teamSelect = selector
            .append('select')
            .attr('class', 'select')
            .attr('multiple', '')
            .attr("size", "20")
            .on('change', function(d) {
                var s = teamOptions.filter(function(d) {
                    return this.selected;
                });
                if (s.nodes().length >= maxTeams2Track) {
                    teamOptions.filter(function() {
                            return !this.selected
                        })
                        .property('disabled', true);
                } else {
                    teamOptions.property('disabled', false);
                }
            });

        var selectedValues = [];
        var teamOptions = teamSelect
            .selectAll('option')
            .data(teamNames)
            .enter()
            .append('option')
            .text(function(d) {
                return d;
            })
            .attr("selected", function(d) {
                if (team2Watch.includes(d)) {
                    console.log(d)
                    return "selected";
                }
            })

        d3.select('#SelectBtn')
            .on('click', function(d) {
                var v = teamOptions.filter(function(d) {
                    return this.selected;
                }).data();
                team2Watch = v;
                updateTeam2Watch();
            });


        function updateTeam2Watch() {
            g.selectAll(".bar")
                .attr("fill", function(d) {
                    if (team2Watch.includes(d.team)) {
                        return t2WBarColour;
                    } else {
                        return regBarColour;
                    }
                });

            g.selectAll(".text")
                .attr("fill", function(d) {
                    if (team2Watch.includes(d.team)) {
                        return "black";
                    } else {
                        return "white";
                    }
                });

            var i;
            for (i = 1; i <= totalWeeks; i++) {
                g.selectAll(".bar" + i)
                    .attr("fill", function(d) {
                        if (team2Watch.includes(d.team)) {
                            return t2WBarColour;
                        } else {
                            return regBarColour;
                        }
                    });
                g.selectAll(".text" + i)
                    .attr("fill", function(d) {
                        if (team2Watch.includes(d.team)) {
                            return "black";
                        } else {
                            return "white";
                        }
                    });
            }
        }
        // End of code to handle the team2watch selection

        // Function to copy and transform (animated move) the current weeks position to the new position
        function copyandTransform(z, col) {

            // Copy the bars of the current week
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
                    if (team2Watch.includes(d.team)) return t2WBarColour;
                    else {
                        return regBarColour;
                    }
                });

            // Copy the text of the current week
            g.selectAll(".text" + col)
                .data(data)
                .enter()
                .append("text")
                .attr("class", "text" + col)
                .text(function(d) {
                    return d.team;
                })
                .attr("x", rectWidth * (col - 1) + ((col - 1) * spacer) + textOffsetx)
                .attr("y", function(d) {
                    return y(d.id) + (y.bandwidth() / 2) + textOffsety;
                })
                .attr("text-anchor", textAnchor)
                .attr("font-family", textFontFamily)
                .attr("font-size", textFontSize)
                .attr("fill", function(d) {
                    if (team2Watch.includes(d.team)) {
                        return t2WTextColour;
                    } else {
                        return regTextColour;
                    }
                });

            // Copy the images of the current week
            g.selectAll(".image" + col)
                .data(data)
                .enter()
                .append("image")
                .attr("class", "image" + col)
                .attr("xlink:href", function(d) {
                    return "images/" + d.team + ".PNG"
                })
                .attr("x", rectWidth * (col - 1) + ((col - 1) * spacer) + imagePosx)
                .attr("y", function(d) {
                    return y(d.id) + (y.bandwidth() / 2) - imageOffsety;
                })
                .attr("width", imageWidth)
                .attr("height", imageHeight);

            // Sort and copy the array into the new positions
            var x0 = y.domain(data.sort(isSorted ?
                        function(a, b) {
                            return b[z] - a[z];
                        } :
                        function(a, b) {
                            return d3.ascending(a[z], b[z]);
                        })
                    .map(function(d) {
                        return d.id;
                    }))
                .copy();

            //Define the transition speeds
            var transition = page_svg.transition().duration(animationSpeed),
                delay = function(d, i) {
                    return i * delaySpeed;
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
                .attr("x", (rectWidth * col) + (col * spacer) + textOffsetx)
                .attr("y", function(d) {
                    return x0(d.id) + (y.bandwidth() / 2) + textOffsety;
                });

            // Move the images
            transition.selectAll(".image")
                .delay(delay)
                .attr("x", (rectWidth * col) + (col * spacer) + imagePosx)
                .attr("y", function(d) {
                    return x0(d.id) + (y.bandwidth() / 2) - imageOffsety;
                });

            // Add the column text for the current Week No.
            g.append("text")
                .attr("class", "textWeekNum")
                .text(colTextPrefix + (col + 1).toString())
                .attr("x", (rectWidth * col) + (col * spacer) + colTextOffsetx)
                .attr("y", colTexty)
                .attr("font-family", textFontFamily)
                .attr("fill", regTextColour)
                .attr("font-size", textFontSize);

        }

        // Function to return Best Improvement and Worst Deterioration between the first and last week of data
        function BestAndWorstPerformers(z) {

            var x0 = data.sort(function(a, b) {
                    return d3.ascending(a.id - a[z], b.id - b[z]);
                })
                .map(function(d) {
                    return d.team;
                });
            var retArray = [];
            retArray.push(x0[x0.length - 1]); // Best improvement team array pos [0]
            retArray.push(x0[0]); // Worst deterioration team array pos[1]
            return retArray;
        }

        // Function to compare positional changes between first week and last week of data for each team
        // Which "Improved", "Deteriorated" and "RemainedSame"
        function TeamProgress(type, z) {

            switch (type) {
                case "Improved":
                    var x0 = data.sort(function(a, b) {
                            return d3.ascending(a.id - a[z], b.id - b[z]);
                        })
                        .filter(function(d) {
                            return (d.id - d[z]) > 0
                        })
                        .map(function(d) {
                            return d.team;
                        });
                    break;
                case "Deteriorated":
                    var x0 = data.sort(function(a, b) {
                            return d3.ascending(a.id - a[z], b.id - b[z]);
                        })
                        .filter(function(d) {
                            return (d.id - d[z]) < 0
                        })
                        .map(function(d) {
                            return d.team;
                        });
                    break;
                case "RemainedSame":
                    var x0 = data.sort(function(a, b) {
                            return d3.ascending(a.id - a[z], b.id - b[z]);
                        })
                        .filter(function(d) {
                            return (d.id - d[z]) == 0
                        })
                        .map(function(d) {
                            return d.team;
                        });
            }

            // Populate the return array with the teams for each case "Improved","Deteriorated" and "RemainSame" 
            var retArray = [];
            var i;
            for (i = 0; i < x0.length; i++) {
                retArray.push(x0[i]);
            }
            return retArray;
        }

        // Code for Week-x button clicked event
        d3.select("#weekBtn").on("click", function() {
            var wNum = parseInt(d3.select(this).text().split('-')[1]);          // Assign the postfix number of the #weekBtn text to wNum e.g. Week-x
            console.log(wNum);
            if (wNum >= totalWeeks) {                                           // No more data to display - execute the summary popup
                var BestWorst = BestAndWorstPerformers("v" + (totalWeeks - 1).toString());
                var TeamsImproved = TeamProgress("Improved", "v" + (totalWeeks - 1).toString());
                var TeamsDeteriorated = TeamProgress("Deteriorated", "v" + (totalWeeks - 1).toString());
                var TeamsSame = TeamProgress("RemainedSame", "v" + (totalWeeks - 1).toString());

                alert(totalWeeks + " weeks in is the table as it stands now, the 2018-19 season is still in progress.\n\n" +
                    "The following teams have improved their position since the start of the season: " + TeamsImproved + ".\n\n" +
                    "The following teams have worsened their position since the start of the season: " + TeamsDeteriorated + ".\n\n" +
                    "The following teams are in the same position as they started the season: " + TeamsSame + ".\n\n" +
                    "Overall " + BestWorst[0] + " have been the best improvers since the start of the season and " +
                    BestWorst[1] + " have deteriorated the most.");
            } else {
                d3.select(this).text(colTextPrefix + (wNum + 1).toString())     // Increment the postfix number of the #weekBtn e.g. Week-(+1)
                copyandTransform("v" + (wNum + 1).toString(), wNum);       // Execute the next week's data copy and transform function
            }
        });
        
        function sortByKey(array, key) {
            return array.sort(function(a, b) {
                var x = a[key]; var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }

    }

})();

//--------------------------------------------
//--------------------------------------------

// Check for Browser - Chrome is best option
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;    // Opera 8.0+

var isFirefox = typeof InstallTrigger !== 'undefined';  // Firefox 1.0+

var isSafari = /constructor/i.test(window.HTMLElement) || (function(p) {
    return p.toString() === "[object SafariRemoteNotification]";
})(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)); // Safari 3.0+ "[object HTMLElementConstructor]" 

var isIE = /*@cc_on!@*/ false || !!document.documentMode;   // Internet Explorer 6-11

var isEdge = !isIE && !!window.StyleMedia;  // Edge 20+

//var isChrome = !!window.chrome && !!window.chrome.webstore; // Chrome 1+
var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

var isBlink = (isChrome || isOpera) && !!window.CSS;    // Blink engine detection

// End of Check for Browser Code

if (isChrome) {
    var t2WBarColour = "rgb(0,255,135, 0.7)" // Box colour for tracked teams (includes transparency for Chrome)
    var regBarColour = "rgb(0,0,0,0.6)" // Box colour for nontracked teams (includes transparency for Chrome)
} else {
    var t2WBarColour = "lightgreen" // Box colour for tracked teams (no transparency for other browsers)
    var regBarColour = "grey" // Box colour for nontracked teams (no transparency for other browsers)
}


(function() {

    // Multiple configuration variables to provide maximum flexibility in design of Tracker output
    var rectWidth = 160                     // Width of team boxes
    var spacer = 3                          // Horizontal spacer between team boxes (px)
    var barPadding = 0.1                    // Vertical Padding in the rectangular bars
    var maxTeams2Track = 5                  // Max no. of teams that can be selected to track
    
    var t2WTextColour = "Black"             // Team to watch name text colour
    var regTextColour = "White"             // Non tracked team name text colour
    
    var marginTop = 20                      // SVG Margin Top setting
    var marginRight = 40                    // SVG Margin Right setting
    var marginBottom = 10                   // SVG Margin Bottom setting
    var marginLeft = 40                     // SVG Margin Left setting
    
    var imagePosx = 5                       // Image Position offset from edge of bar (px)
    
    var textOffsetx = 35                    // Text Position offset from edge of bar (px)
    var textOffsety = 5                     // Text Position offset from top of bar (px)
    
    var textAnchor = "left"                 // Text Anchor attribute
    var textFontFamily = "sans-serif"       // Text Font Family attribute
    var textFontSize = "14px"               // Text Font Size
    
    var imageWidth = 20                     // Image width 
    var imageHeight = 20                    // Image height
    var imageOffsety = 10                   // Image Position offset in y axis
    
    var colTexty = 505                      // Column text y position
    var colTextOffsetx=55                   // Column text x offset position
    var colTextPrefix = "Week-"             // Column text prefix string
    
    var animationSpeed = 1750               // Overall Bar animation speed (ms)
    var delaySpeed = 50                     // Animation delay speed
    
    var JSONFile = "PremleaguePos.json"         // JSON data file to load
    var team2Watch = ["West Ham Utd", "AFC Bournemouth"];    // Array of Initial teams to be tracked in selection box
    
    // Initialisation variables
    var isSorted = false;                   // Initial Sort status of bars
    var page_svg;                           // Webpage Scalable Vector Graphics (SVG) variable


    // Open and read JSON data file using Callback mechanism to ensure completion before continuing execution
    d3.queue()
        .defer(d3.json, JSONFile)
        .await(ready)

    // Main function for script
    function ready(error, datapoints) {
        
        //console.log(datapoints);
        
        // Get JSON key names and store in the array "keys"
        // Perhaps enhance and use name for future release ?
        var a = datapoints[0];
        var keys = []
        for(var k in a){
            keys.push(k)
        }
        var totalWeeks = keys.length - 2;       // Total number of weeks data in JSON ( minus 2 keys to exclude "id" and "team")

        // Sort the array into the initial position order and assign data array to the variable "data"
        var data = sortByKey(datapoints,"v1");

        // Determine number of teams in data
        var numTeams = data.length;

        // Initialise settings for Scalable Vector Graphics on HTML page
        var svg = d3.select("svg"),
            margin = {
                top: marginTop,
                right: marginRight,
                bottom: marginBottom,
                left: marginLeft
            },
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom - 20;
        page_svg = svg;

        // Initialise y scaled screen positions within the SVG area 
        var y = d3.scaleBand().range([0, height]);

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Set the y input values based upon the JSON Data for the initial week position
        y.domain(data.map(function(d) {
            return d.id;
        })).padding(barPadding);
        

        // Add the Y-axis to the SVG
        var yaxis = d3.scaleBand().range([0, height]);
        yaxis.domain(data.map(function(d) {
            //console.log(d.v1);
            return d.v1;
        }));
        g.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yaxis));
            
        // Start of Code section for the initial data column position     
        
        // Update the Initial text on the "move forward" button
        d3.select("#weekBtn").text(colTextPrefix + "1")    

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
            .attr("fill", function(d) {
                if (team2Watch.includes(d.team)) return t2WBarColour;
                else {
                    return regBarColour;
                }
            })

        // Add teamnames to the initial league positions
        g.selectAll(".text")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "text")
            .text(function(d) {
                return d.team;
            })
            .attr("x", textOffsetx)
            .attr("y", function(d) {
                return y(d.id) + (y.bandwidth() / 2) + textOffsety;
            })
            .attr("text-anchor", textAnchor)
            .attr("font-family", textFontFamily)
            .attr("font-size", textFontSize)
            .attr("fill", function(d) {
                if (team2Watch.includes(d.team)) {
                    return t2WTextColour;
                } else {
                    return regTextColour;
                }
            });

        // Add images to the initial league positions
        g.selectAll(".image")
            .data(data)
            .enter()
            .append("image")
            .attr("class", "image")
            .attr("xlink:href", function(d) {
                return "images/" + d.team + ".PNG"
            })
            .attr("x", imagePosx)
            .attr("y", function(d) {
                return y(d.id) + (y.bandwidth() / 2) - imageOffsety;
            })
            .attr("width", imageWidth)
            .attr("height", imageHeight);

        // Add the column text for the initial Week No.
        g.append("text")
            .attr("class", "textWeekNum")
            .text(colTextPrefix + "1")
            .attr("x", colTextOffsetx)
            .attr("y", colTexty)
            .attr("font-family", textFontFamily)
            .attr("fill", regTextColour)
            .attr("font-size", textFontSize);
            
        // End of Code for the initial data column position         
        

        // Start of code to handle the team2watch selection
        var selector = d3.select('#selector');

        // Create array with teamNames sorted alphabetically
        var teamNames = data.map(function(d) {
            return d.team;
        }).sort();
        
        var teamSelect = selector
            .append('select')
            .attr('class', 'select')
            .attr('multiple', '')
            .attr("size", "20")
            .on('change', function(d) {
                var s = teamOptions.filter(function(d) {
                    return this.selected;
                });
                if (s.nodes().length >= maxTeams2Track) {
                    teamOptions.filter(function() {
                            return !this.selected
                        })
                        .property('disabled', true);
                } else {
                    teamOptions.property('disabled', false);
                }
            });

        var selectedValues = [];
        var teamOptions = teamSelect
            .selectAll('option')
            .data(teamNames)
            .enter()
            .append('option')
            .text(function(d) {
                return d;
            })
            .attr("selected", function(d) {
                if (team2Watch.includes(d)) {
                    //console.log(d)
                    return "selected";
                }
            })

        d3.select('#SelectBtn')
            .on('click', function(d) {
                var v = teamOptions.filter(function(d) {
                    return this.selected;
                }).data();
                team2Watch = v;
                updateTeam2Watch();
            });


        function updateTeam2Watch() {
            g.selectAll(".bar")
                .attr("fill", function(d) {
                    if (team2Watch.includes(d.team)) {
                        return t2WBarColour;
                    } else {
                        return regBarColour;
                    }
                });

            g.selectAll(".text")
                .attr("fill", function(d) {
                    if (team2Watch.includes(d.team)) {
                        return "black";
                    } else {
                        return "white";
                    }
                });

            var i;
            for (i = 1; i <= totalWeeks; i++) {
                g.selectAll(".bar" + i)
                    .attr("fill", function(d) {
                        if (team2Watch.includes(d.team)) {
                            return t2WBarColour;
                        } else {
                            return regBarColour;
                        }
                    });
                g.selectAll(".text" + i)
                    .attr("fill", function(d) {
                        if (team2Watch.includes(d.team)) {
                            return "black";
                        } else {
                            return "white";
                        }
                    });
            }
        }
        // End of code to handle the team2watch selection

        // Function to copy and transform (animated move) the current weeks position to the new position
        function copyandTransform(z, col) {

            // Copy the bars of the current week
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
                    if (team2Watch.includes(d.team)) return t2WBarColour;
                    else {
                        return regBarColour;
                    }
                });

            // Copy the text of the current week
            g.selectAll(".text" + col)
                .data(data)
                .enter()
                .append("text")
                .attr("class", "text" + col)
                .text(function(d) {
                    return d.team;
                })
                .attr("x", rectWidth * (col - 1) + ((col - 1) * spacer) + textOffsetx)
                .attr("y", function(d) {
                    return y(d.id) + (y.bandwidth() / 2) + textOffsety;
                })
                .attr("text-anchor", textAnchor)
                .attr("font-family", textFontFamily)
                .attr("font-size", textFontSize)
                .attr("fill", function(d) {
                    if (team2Watch.includes(d.team)) {
                        return t2WTextColour;
                    } else {
                        return regTextColour;
                    }
                });

            // Copy the images of the current week
            g.selectAll(".image" + col)
                .data(data)
                .enter()
                .append("image")
                .attr("class", "image" + col)
                .attr("xlink:href", function(d) {
                    return "images/" + d.team + ".PNG"
                })
                .attr("x", rectWidth * (col - 1) + ((col - 1) * spacer) + imagePosx)
                .attr("y", function(d) {
                    return y(d.id) + (y.bandwidth() / 2) - imageOffsety;
                })
                .attr("width", imageWidth)
                .attr("height", imageHeight);

            // Sort and copy the array into the new positions
            var x0 = y.domain(data.sort(isSorted ?
                        function(a, b) {
                            return b[z] - a[z];
                        } :
                        function(a, b) {
                            return d3.ascending(a[z], b[z]);
                        })
                    .map(function(d) {
                        return d.id;
                    }))
                .copy();

            //Define the transition speeds
            var transition = page_svg.transition().duration(animationSpeed),
                delay = function(d, i) {
                    return i * delaySpeed;
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
                .attr("x", (rectWidth * col) + (col * spacer) + textOffsetx)
                .attr("y", function(d) {
                    return x0(d.id) + (y.bandwidth() / 2) + textOffsety;
                });

            // Move the images
            transition.selectAll(".image")
                .delay(delay)
                .attr("x", (rectWidth * col) + (col * spacer) + imagePosx)
                .attr("y", function(d) {
                    return x0(d.id) + (y.bandwidth() / 2) - imageOffsety;
                });

            // Add the column text for the current Week No.
            g.append("text")
                .attr("class", "textWeekNum")
                .text(colTextPrefix + (col + 1).toString())
                .attr("x", (rectWidth * col) + (col * spacer) + colTextOffsetx)
                .attr("y", colTexty)
                .attr("font-family", textFontFamily)
                .attr("fill", regTextColour)
                .attr("font-size", textFontSize);

        }

        // Function to return Best Improvement and Worst Deterioration between the first "v1" and last week of data
        function BestAndWorstPerformers(s,z) {

            var x0 = data.sort(function(a, b) {
                    return d3.ascending(a[s] - a[z], b[s] - b[z]);
                })
                .map(function(d) {
                    return d.team;
                });
            var retArray = [];
            retArray.push(x0[x0.length - 1]);   // Best improvement team array pos [0]
            retArray.push(x0[0]);               // Worst deterioration team array pos[1]
            return retArray;
        }

        // Function to compare positional changes between first week and last week of data for each team
        // Which teams "Improved", "Deteriorated" and "RemainedSame"
        function TeamProgress(type, s, z) {

            switch (type) {
                case "Improved":
                    var x0 = data.sort(function(a, b) {
                            return d3.ascending(a[s] - a[z], b[s] - b[z]);
                        })
                        .filter(function(d) {
                            return (d[s] - d[z]) > 0
                        })
                        .map(function(d) {
                            return d.team;
                        });
                    break;
                case "Deteriorated":
                    var x0 = data.sort(function(a, b) {
                            return d3.ascending(a[s] - a[z], b[s] - b[z]);
                        })
                        .filter(function(d) {
                            return (d[s] - d[z]) < 0
                        })
                        .map(function(d) {
                            return d.team;
                        });
                    break;
                case "RemainedSame":
                    var x0 = data.sort(function(a, b) {
                            return d3.ascending(a[s] - a[z], b[s] - b[z]);
                        })
                        .filter(function(d) {
                            return (d[s] - d[z]) == 0
                        })
                        .map(function(d) {
                            return d.team;
                        });
            }

            // Populate the return array with the teams for each case "Improved","Deteriorated" and "RemainSame" 
            var retArray = [];
            var i;
            for (i = 0; i < x0.length; i++) {
                retArray.push(x0[i]);
            }
            return retArray;
        }
        
        function overallTeamSeasonStats(t) {
            
            var retArray = [];
            
            var teamSeasonObj = data.filter(({team}) => team === t);            // filter JSON for team season data
            var teamSeasonArray = Object.keys(teamSeasonObj[0]).map(function(_) { return teamSeasonObj[0][_]; })        // Convert record to Array
    
            console.log(teamSeasonObj);
            console.log(teamSeasonArray);
            
            // Initialise multiple counter and sum variables 
            var lowestPos = numTeams;
            var highestPos = 1;
            var sumOfPositionsFull = 0;
            var sumOfPositionsQ1 = 0;
            var sumOfPositionsQ2 = 0;
            var sumOfPositionsQ3 = 0;
            var sumOfPositionsQ4 = 0;
            var weeksinTopHalf = 0;
            var weeksinBottomHalf = 0;
            
            // Loop through each index value in array and perform calculations ( + 2 on loop to account for "id" and "team" at index [0] and [1] respectively  
            teamSeasonArray.forEach(function (weekval,index) {
                if (index > 1 && index <= totalWeeks + 2 ) {
                    //console.log(weekval);
                    if (weekval > lowestPos ) lowestPos = weekval;
                    if (weekval < highestPos ) highestPos = weekval;
                    if (index > 1 && index < 11) sumOfPositionsQ1 += weekval;
                    if (index > 10 && index < 20) sumOfPositionsQ2 += weekval;
                    if (index > 19 && index < 29) sumOfPositionsQ3 += weekval;
                    if (index > 28 && index < totalWeeks) sumOfPositionsQ4 += weekval;
                    if (weekval <= 10) { weeksinTopHalf ++ } else { weeksinBottomHalf ++ }
                    
                    sumOfPositionsFull += weekval;
                }    
            });
            
            // Calculate multiple Average stats
            var avPositionFull = Math.round(sumOfPositionsFull / totalWeeks);
            var avPositionQ1 = Math.round(sumOfPositionsQ1 / 9);
            var avPositionQ2 = Math.round(sumOfPositionsQ2 / 10);
            var avPositionQ3 = Math.round(sumOfPositionsQ3 / 9);
            var avPositionQ4 = Math.round(sumOfPositionsQ4 / 10);       
            var avPositionH1 = Math.round((sumOfPositionsQ1 + sumOfPositionsQ2) / 19);
            var avPositionH2 = Math.round((sumOfPositionsQ3 + sumOfPositionsQ4) / 19);      
            
            console.log("Low/High");
            console.log(lowestPos);
            console.log(highestPos);
            console.log("Av Pos - Season and by Quarter");
            console.log(avPositionFull);
            console.log(avPositionQ1);
            console.log(avPositionQ2);
            console.log(avPositionQ3);
            console.log(avPositionQ4);
            console.log("Av Pos - Season by Halfs");
            console.log(avPositionH1);
            console.log(avPositionH2);
            console.log("Weeks in Top/Bottom Half");        // Pie chart display ??
            console.log(weeksinTopHalf);
            console.log(weeksinBottomHalf);
            
            return teamSeasonArray;
            
        }
        
        function teamTrackingStats(t, weekNo) {
            
            var retArray = [];
            var teamSeasonObj = data.filter(({team}) => team === t);        // filter JSON for team season data
            var teamSeasonArray = Object.keys(teamSeasonObj[0]).map(function(_) { return teamSeasonObj[0][_]; })    // Convert record to Array
            var teamCurrentPos = teamSeasonArray[weekNo + 2]                // assign current position in array to variable ( + 2 to account for "id" and "team")
            console.log(teamCurrentPos);
            
            const ChampionsLeaguePos = 4;
            const EuropaLeaguePos = 6;
            const RelegationPos = 18;
            
            // Mutiple conditionals comparing current position with Qualification and relegation
            if (teamCurrentPos <= ChampionsLeaguePos) { 
                retArray.push("are in a Champions League and Europa League qualifying position!")
                retArray.push("are " + (RelegationPos - teamCurrentPos).toString() + " away from the relegation zone");
            }
            if (teamCurrentPos <= EuropaLeaguePos && teamCurrentPos > ChampionsLeaguePos ) { 
                retArray.push("are in a Europa League qualifying postion and " + (teamCurrentPos - ChampionsLeaguePos.toString()) + " from a Champions League qualifying position!")
                retArray.push("are " + (RelegationPos - teamCurrentPos).toString() + " away from the relegation zone");
            }
            if (teamCurrentPos > EuropaLeaguePos && teamCurrentPos < RelegationPos ) { 
                retArray.push("are " + (teamCurrentPos - EuropaLeaguePos.toString()) + " away from a Europa League qualifying postion!")
                retArray.push("are " + (RelegationPos - teamCurrentPos).toString() + " away from the relegation zone");
            }
            if (teamCurrentPos > EuropaLeaguePos && teamCurrentPos >= RelegationPos ) { 
                retArray.push("are " + (teamCurrentPos - EuropaLeaguePos.toString()) + " away from a Europa League qualifying postion!")
                retArray.push("are in the relegation zone");
            }       
            return retArray;
        }

        // Code for Week-x button clicked event
        d3.select("#weekBtn").on("click", function() {
            var wNum = parseInt(d3.select(this).text().split('-')[1]);          // Assign the postfix number of the #weekBtn text to wNum e.g. Week-x
            //console.log(wNum);
            if (wNum >= totalWeeks) {                                           // No more data to display - execute the summary popup
                var BestWorst = BestAndWorstPerformers("v1","v" + totalWeeks.toString());   // Find the best and worst between the first week (v1) and the last week v(totalWeeks)
                var TeamsImproved = TeamProgress("Improved", "v1", "v" + totalWeeks.toString());
                var TeamsDeteriorated = TeamProgress("Deteriorated", "v1", "v" + totalWeeks.toString());
                var TeamsSame = TeamProgress("RemainedSame", "v1", "v" + totalWeeks.toString());

                alert(totalWeeks + " weeks in is the table as it stands now, the 2018-19 season is still in progress.\n\n" +
                    "The following teams have improved their position since the start of the season: " + TeamsImproved + ".\n\n" +
                    "The following teams have worsened their position since the start of the season: " + TeamsDeteriorated + ".\n\n" +
                    "The following teams are in the same position as they started the season: " + TeamsSame + ".\n\n" +
                    "Overall " + BestWorst[0] + " have been the best improvers since the start of the season and " +
                    BestWorst[1] + " have deteriorated the most.");
            } else {
                d3.select(this).text(colTextPrefix + (wNum + 1).toString())     // Increment the postfix number of the #weekBtn e.g. Week-(+1)
                var BestWorstWeekly = BestAndWorstPerformers("v" + wNum.toString() ,"v" + (wNum + 1).toString());   // Who are the best/worst since last week
                d3.selectAll(".weeklyImprovement")
                    .text(colTextPrefix + (wNum + 1).toString() + ": " + BestWorstWeekly[0] + " are the best improvers on last week. " + BestWorstWeekly[1] + " have deteriorated the most.")
                copyandTransform("v" + (wNum + 1).toString(), wNum);       // Execute the next week's data copy and transform function
                
                var teamInfo = teamTrackingStats("AFC Bournemouth", wNum);
                console.log(teamInfo);
                d3.selectAll(".weeklyTeamTracking")
                    .text("AFC Bournemouth " + teamInfo[0] + " They " + teamInfo[1]);
                
                // dummy test
                //overallTeamSeasonStats("AFC Bournemouth");
                
            }
        });
        
        function sortByKey(array, key) {
            return array.sort(function(a, b) {
                var x = a[key]; var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }

    }

})();