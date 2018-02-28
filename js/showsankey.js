function showsankey(data){

    this.data = data

    var units = "Widgets";

  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 10, bottom: 10, left: 10},
      width = 700 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  // format variables
  var formatNumber = d3.format(",.0f"),    // zero decimal places
      format = function(d) { return formatNumber(d) + " " + units; },
      color = d3.scaleOrdinal(d3.schemeCategory20);

  // append the svg object to the body of the page
  var svg = d3.select("body").append("svg")
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







  /************
  LÄGG TILL EN LINEARSCALE MELLAN TYP 1-5 FÖR
  theLinks.value BASERAT PÅ ANTALET GÅNGER ORDET SKRIVITS
  var scaleValue = d3.scaleLinear()
  .domain([wordArray[3],wordArray[0] ])
  .range([1, 4])
  ************/

  //console.log("theGraph = ", theGraph);

  // load the data

  //Skapa funktion som läser in String och sätter in i denna funktion ist för "Cartman"
    var graph = createSankeyGraph(data, "Cartman", "Stan");

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
        .text(function(d) { return d.name; })
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

function createSankeyGraph (data, stringName1, stringName2)
{
  //SORT THE DATA
  var wordArray1 = []
  var wordArray2 = []
  var wordArray3 = []
  var wordArray4 = []

  var newdata = data.slice(0,100);
  newdata.forEach(function (object) {
  for (let prop in object){
    //console.log("object[prop] = ", object[prop])
    if (object[prop] === stringName1) {
      //console.log("name[prop] = ", name.Line);
      createWordArray(data, object, wordArray1)
    }
    else if(object[prop] === stringName2)
    {
      createWordArray(data, object, wordArray2)
    }
  }
})

wordArray1.sort(function(x, y){
   return d3.descending(x.count, y.count);
})
wordArray2.sort(function(x, y){
   return d3.descending(x.count, y.count);
})
/*
wordArray3.sort(function(x, y){
   return d3.descending(x.count, y.count);
})
wordArray4.sort(function(x, y){
   return d3.descending(x.count, y.count);
})*/
console.log("wordArray2.slice(0, 100) = ", wordArray2.slice(0, 100))




  //Make the sorted data graph for the Sankey algorithm
  let theGraph = {}
  theGraph.nodes = [];
  theGraph.links = [];
  var NUM_OF_CHARACTERS = 2;

  let stringnames = []
  stringnames.push(stringName1)
  stringnames.push(stringName2)
  console.log("stringnames = ",stringnames)

  let wordArrays = []
  wordArrays.push(wordArray1)
  wordArrays.push(wordArray2)
  console.log("wordArrays = ",wordArrays)

  for(var i= 0; i<NUM_OF_CHARACTERS; i++)
  {
      initiateGraph(theGraph, stringnames[i], i, wordArrays[i]);
  }
  //initiateGraph(theGraph, stringName1, 0, wordArray1);
  console.log("6%6 = ", 1%6)
  return theGraph;

} // End of function createSankeyGraph

function createWordArray (data, object, wordArray)
{
  var line = object.Line.toLowerCase();
  var splitwords = line.split(/\W+/);
  for (var i = 0; i<splitwords.length; i++ )
  {
    if (splitwords[i].length > 1 && splitwords[i] != "don")
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
      if(wordNotFound)
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

    for(var j=0; j < endOfLoop; j++)
    {
      if(theGraph.nodes[i].name == theGraph.nodes[j].name) //Check if the word is already in a previous characters array
        {
          theLinks.target = j;
          //TESTA MED NY CSS theGraph.nodes[i] = theGraph.nodes[j]
          break;
        }
    }
    theGraph.links.push(theLinks)


  }
  console.log("theGraph = ", theGraph)
}
