function showsankey(data){

this.data = data
var testdata = data.slice(0,100);
data = testdata;

 var strChar1 = "Cartman"
 var strChar2 = "Cartman"

  //Function that reads in String och sets the names to user input rather than default "Cartman"
  this.setFrstName = function()
  {
    var slct1 = document.getElementById("selections1");
    strChar1 = slct1.options[slct1.selectedIndex].text;
    slct1.disabled = true;
    document.getElementById("frstinput").disabled = true;

    document.getElementById("scndinput").disabled = false;
    slct2 = document.getElementById("selections2");
    slct2.disabled = false;
    slct2.options[slct1.selectedIndex].disabled = true;
    if (slct2.selectedIndex == slct1.selectedIndex)
    slct2.selectedIndex = slct1.selectedIndex%4 +1;
  }

  this.setScndName = function()
  {
    var slct2 = document.getElementById("selections2");
    strChar2 = slct2.options[slct2.selectedIndex].text;

    slct2.disabled = true;
    document.getElementById("scndinput").disabled = true;
    document.getElementById("drawButton").disabled= false;
  }

this.reset = function ()
{
  //Clear previous draw
  var div = document.getElementById("root3")
  div.innerHTML = ""

  var options = document.querySelectorAll('#selections1 option');
  for (var i = 0, l = options.length; i < l; i++) {
    options[i].disabled = false;
    options[i].selected = options[i].defaultSelected;
  }
  var options = document.querySelectorAll('#selections2 option');
  for (var i = 0, l = options.length; i < l; i++) {
    options[i].disabled = false;
    options[i].selected = options[i].defaultSelected;
}
  document.getElementById("drawButton").disabled= true;
  document.getElementById("selections1").disabled= false;
  document.getElementById("selections2").disabled= true;
  document.getElementById("frstinput").disabled = false;
  document.getElementById("scndinput").disabled = true;
}

this.draw = function ()
{
  document.getElementById("drawButton").disabled= true;

  var graph = createSankeyGraph(data, strChar1, strChar2);


  /******************Did not write whats below*************************/
  /******************Did not write whats below*************************/
  //SOURCE https://bl.ocks.org/d3noob/013054e8d7807dff76247b81b0e29030

  var units = "Widgets";

  var div = `#root3`;

// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// format variables
var formatNumber = d3.format(",.0f"),    // zero decimal places
    format = function(d) { return formatNumber(d) + " " + units; },
    color = d3.scaleOrdinal(d3.schemeCategory20);

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
    .nodePadding(40)
    .size([width, height]);

var path = sankey.link();

    console.log("graph = ", graph)
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
        .sort(function(a, b) { return b.dy - a.dy; });

  // add the link titles
    link.append("title")
          .text(function(d) {
      		return d.source.name + " → " +
                  d.target.name + "\n" + format(d.value); });

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
  		  return d.color = color(d.name.replace(/ .*/
        , "")); })


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
function createSankeyGraph (data, stringName1, stringName2)
{
  //Initialize some values
  var NUM_OF_CHARACTERS = 2;
  if(stringName1 == stringName2)//The code is written in a way that this shouldnt be possible, but just in case...
  NUM_OF_CHARACTERS = 1;


  let stringnames = []
  stringnames.push(stringName1)
  stringnames.push(stringName2)

  var wordArray1 = []
  var wordArray2 = []
  //var wordArray3 = []

  data.forEach(function (object) {
  for (let prop in object){
    //console.log("object[prop] = ", object[prop])
    if (object[prop] === stringName1) {
      //console.log("name[prop] = ", name.Line);
      createWordArray(object, wordArray1)
    }
    else if(object[prop] === stringName2)
    {
      createWordArray(object, wordArray2)
    }
  }
})

//SORT THE DATA
wordArray1.sort(function(x, y){
   return d3.descending(x.count, y.count);
})
wordArray2.sort(function(x, y){
   return d3.descending(x.count, y.count);
})
/*
wordArray3.sort(function(x, y){
   return d3.descending(x.count, y.count);
})*/

  let wordArrays = []
  wordArrays.push(wordArray1)
  wordArrays.push(wordArray2)

  //Make the sorted data graph for the Sankey algorithm
  let theGraph = {}
  theGraph.nodes = [];
  theGraph.links = [];

  for(var i= 0; i<NUM_OF_CHARACTERS; i++)
  {
      initiateGraph(theGraph, stringnames[i], i, wordArrays[i]);
  }

  return theGraph;

} // End of function createSankeyGraph

//This function takes as input a specific object from the data, and an array with words.
//It then reads the line in the current object and splits up the words and ignores <!, ?, ', ",> and other signs.
//After that it searches through the input array to find if the word in the line has already been said and increments its count.
function createWordArray (object, wordArray)
{
  var line = object.Line.toLowerCase();
  var splitwords = line.split(/\W+/);
  for (var i = 0; i<splitwords.length; i++ )
  {
    if (splitwords[i].length > 1 && splitwords[i] != "don") // Only count words longer than 1 letter, and ignore a few broken up words like how "don't" becomes "don & t".
    {
      var wordNotFound = true;
      for (var j = 0; j< wordArray.length; j++)
      {
        if (wordArray[j].word === splitwords[i])
        {
          wordArray[j].count++;
          wordNotFound = false;
          break;
        }
      }
      if(wordNotFound) //If the word doesn't already exists in the input array it adds it and sets the count to 1.
      {
        var tempwordObject = {}
        tempwordObject.word = splitwords[i]
        tempwordObject.count = 1;
        wordArray.push(tempwordObject);
      }
    } //End of if (splitwords[i].length > 1 && splitwords[i] != "don")
  } //End of for (var i = 0; i<splitwords.length; i++ )
} //End of function createSortedWordArray

function initiateGraph (theGraph, stringName, source, wordArray)
{
  var newCharacter = source*6
  var endOfLoop = newCharacter + 6
  for(var i = newCharacter ; i < endOfLoop; i++)
  {
    let theNodes = {};
    if(i%6==0) //i%6 is used so that every 6th theNodes.name is equal to the characther name stored in "stringName",
    //and the other 5 should be the most used words used in wordArray
      theNodes.name = stringName;
    else
      theNodes.name = wordArray[i%6-1].word;

    theNodes.node = i;
    theGraph.nodes.push(theNodes)
  }
  for(var i = newCharacter + 1; i<endOfLoop; i++)
  {
    let theLinks = {};
    theLinks.source = newCharacter;
    theLinks.target = i;
    theLinks.value = 1;

      /************
      LÄGG TILL EN LINEARSCALE MELLAN TYP 1-5 FÖR
      theLinks.value BASERAT PÅ ANTALET GÅNGER ORDET SKRIVITS
      var scaleValue = d3.scaleLinear()
      .domain([wordArray[3],wordArray[0] ])
      .range([1, 4])
      ************/

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
