function showsankey(data){

this.data = data

this.draw = function ()
{
  var div = document.getElementById("root3")
  div.innerHTML = ""

  var charArray = []
  var selections = document.querySelectorAll('#selections input')
  for (var i = 0, l = selections.length; i < l; i++)
  {
    if(selections[i].checked)
    {
      charArray.push(selections[i].value)
    }
  }

  var graph = createSankeyGraph(data, charArray);

  /******************Did not write whats below*************************/
  /******************Did not write whats below*************************/
  //Except for minor tweaks here and there, for colors and such//
  //SOURCE https://bl.ocks.org/d3noob/013054e8d7807dff76247b81b0e29030

  var units = "Widgets";

  var div = `#root3`;

// set the dimensions and margins of the graph
var margin = {top: 10, right: 50, bottom: 10, left: 30},
    width = $(div).parent().width() - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// format variables
var formatNumber = d3.format(",.0f"),    // zero decimal places
    format = function(d) { return formatNumber(d) + " " + units; },
    colorName = d3.scaleOrdinal(d3.schemeCategory10);
    colorWord = d3.scaleOrdinal(d3.schemeCategory20b);

// append the svg object to the body of the page
var svg = d3.select(div).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Set the sankey diagram properties
var sankey = d3.sankey()
    .nodeWidth(36)
    .nodePadding(10)
    .size([width, height]);

var path = sankey.link();

    sankey.nodes(graph.nodes)
        .links(graph.links)
        .layout(32);

  // add in the links
    var link = svg.append("g").selectAll(".link")
        .data(graph.links)
      .enter().append("path")
        .attr("class", "link")
        .attr("d", path)
        .style("stroke-width", function(d) { return Math.max(1, d.dy); })
        .style("stroke", function(d)
        {
          return d.color = colorName(d.source.name.replace(/ .*/, ""));
        })
        .sort(function(a, b) { return b.dy - a.dy; });

  // add the link titles
    link.append("title")
          .text(function(d) {
      		return d.source.name + " → " +
                  d.target.name + "\n" + format(d.value); })


  // add in the nodes
    var node = svg.append("g").selectAll(".node")
        .data(graph.nodes)
      .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
  		  return "translate(" + d.x + "," + d.y + ")"; })
        .call(d3.drag()
          .subject(function(d) {
            return d;
          })
          .on("start", function() {
            this.parentNode.appendChild(this);
          })
          .on("drag", dragmove));

  // add the rectangles for the nodes
    node.append("rect")
        .attr("height", function(d) { return d.dy; })
        .attr("width", sankey.nodeWidth())
        .style("fill", function(d) {
        for (var i=0; i<charArray.length; i++)
        {
          if(d.name === charArray[i])
          {
            d.color = colorName(d.name.replace(/ .*/, ""));
            break;
          }
          else {
            d.color = "#F6DDCC";
          }
        }
        return d.color;
      })
        .style("stroke", function(d) {
  		  return d3.rgb(d.color).darker(2); })
      .append("title")
        .text(function(d) {
  		  return d.name + "\n" + format(d.value); });

  // add in the title for the nodes
    node.append("text")
        .attr("x", -6)
        .attr("y", function(d) { return d.dy / 2; })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(function(d) {
          if(d.value>0)
          return d.name;
        })
      .filter(function(d) { return d.x < width / 2; })
        .attr("x", 6 + sankey.nodeWidth())
        .attr("text-anchor", "start");

  // the function for moving the nodes
    function dragmove(d) {
      d3.select(this)
        .attr("transform",
              "translate("
                 + d.x + ","
                 + (d.y = Math.max(
                    0, Math.min(height - d.dy, d3.event.y))
                   ) + ")");
      sankey.relayout();
      link.attr("d", path);
    }


 }
};
/******************Did not write whats above*************************/
/******************Did not write whats above*************************/
//SOURCE https://bl.ocks.org/d3noob/013054e8d7807dff76247b81b0e29030


/*******************************************************
// Everything written below this line is self written  //
********************************************************/
function createSankeyGraph (data, charArray)
{
  //Initialize some values
  var NUM_OF_CHARACTERS = charArray.length;
  var NUM_OF_WORDS = 6+1;

  let wordArrays = []
for (var i=0; i<NUM_OF_CHARACTERS; i++)
{
  data.forEach(function (object) {
    for(let prop in object){
      if(object[prop] === charArray[i])
      {
        wordArrays.push(object.vocabulary)
      }
    }
  })
}

  //Make the sorted data graph for the Sankey algorithm
  let theGraph = {}
  theGraph.nodes = [];
  theGraph.links = [];

  for(var i= 0; i<NUM_OF_CHARACTERS; i++)
  {
      initiateGraph(theGraph, charArray[i], i, wordArrays[i], NUM_OF_WORDS);
  }

  return theGraph;

} // End of function createSankeyGraph


function initiateGraph (theGraph, stringName, source, wordArray, numOfWords)
{
  var newCharacter = source*numOfWords
  var endOfLoop = newCharacter + numOfWords
  for(var i = newCharacter ; i < endOfLoop; i++)
  {
    let theNodes = {};
    if(i%numOfWords==0) //i%6 is used so that every 6th theNodes.name is equal to the characther name stored in "stringName",
    //and the other 5 should be the most used words used in wordArray
      theNodes.name = stringName;
    else
      theNodes.name = wordArray[i%numOfWords-1].word;

    theNodes.node = i;
    theGraph.nodes.push(theNodes)
  }
  for(var i = newCharacter + 1; i<endOfLoop; i++)
  {
    let theLinks = {};
    theLinks.source = newCharacter;
    theLinks.target = i;

    var scaleValue = d3.scaleLinear()
    .domain( [wordArray[numOfWords-2].count, wordArray[0].count ])
    .range([1, 3])

    if (source == 0)
    {
      theLinks.value = scaleValue(wordArray[i-1].count);
    }
    else {
      theLinks.value = scaleValue(wordArray[i%numOfWords-1].count);
      //theLinks.value = 1;
    }


    for(var j=0; j < endOfLoop; j++)
    {
      if(theGraph.nodes[i].name == theGraph.nodes[j].name) //Check if the word is already in a previous characters array
        {
          theLinks.target = j;
          break;
        }
    }
    theGraph.links.push(theLinks)
  }
}
