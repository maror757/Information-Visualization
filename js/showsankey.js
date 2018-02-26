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




  //SORT THE DATA
  var wordArray = []

  var newdata = data.slice(0,10000);
  newdata.forEach(function (name) {
  for (let prop in name){
    //console.log(name[prop]);
    if (name[prop] === 'Cartman') {
      //console.log("name[prop] = ", name.Line);

      var line = name.Line.toLowerCase();
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
        }
      }
    }
  }
})

  wordArray.sort(function(x, y){
     return d3.descending(x.count, y.count);
  })
	console.log("wordArray.slice(0, 100) = ", wordArray.slice(0, 100))

  //Load the sorted data
  let theGraph = {}
  theGraph.nodes = [];
  theGraph.links = [];

  for(var i = 0; i<6; i++)
  {
    let theNodes = {};
    if(i==0)
    theNodes.name = "Cartman";
    else {
    theNodes.name = wordArray[i-1].word;
    let theLinks = {};
    theLinks.source = 0;
    theLinks.target = i;
    theLinks.value = 1;
    theGraph.links.push(theLinks)
    }
    theNodes.node = i;

    theGraph.nodes.push(theNodes)

  }

  /************
  
  LÄGG TILL EN LINEARSCALE MELLAN TYP 1-5 FÖR
  theLinks.value BASERAT PÅ ANTALET GÅNGER ORDET SKRIVITS

  ************/

  console.log("theGraph = ", theGraph);

  // load the data
  //d3.json("data/sankey.json", function(graph) {
    var graph = theGraph;
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
  //});

}
