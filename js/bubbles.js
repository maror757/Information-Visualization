function bubbles(data){

  // Edit data
this.draw = function (){

  document.getElementById("bubbles").innerHTML = ""

  var charArray = []
  var selections = document.querySelectorAll('#selections input')
  for (var i = 0; i < selections.length; i++)
  {
    if(selections[i].checked) {
      charArray.push(selections[i].value)
    }
  }

  new_data = []


  // Only checked
    for (var i = 0; i < charArray.length; i++) {
      for (var j = 0; j < data.length; j++) {
        if (charArray[i] === data[j].name) {
          new_data.push(data[j])
        }
      }
    }


    // Add SVGs to DOM
    var div = `#bubbles`;

    var height = 350
    var width = $(div).parent().width()

    var format = d3.format(`,d`);
    var color = d3.scaleOrdinal(d3.schemeCategory20)

    var pack = d3.pack()
    .size([width, height])
    .padding(5)

    var tooltip = d3.select(div)
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("color", "white")
    .style("padding", "8px")
    .style("background-color", "rgba(0, 0, 0, 0.75)")
    .style("border-radius", "6px")
    .style("font", "1em sans-serif")
    .text("tooltip");

    var root = d3.hierarchy({children: new_data})
    .sum(function(d) { return d.unique_word_count })


    var svg = d3.select(div).append(`svg`)
    .attr(`width`, width)
    .attr(`height`, height)
    .append(`g`)
    .attr(`transform`, `translate(0, 0)`)

    var node = svg.selectAll(`.node`)
    .data(pack(root).leaves())
    .enter().append(`g`)
    .attr(`class`, `node`)
    .attr(`transform`, function(d) { return `translate(${d.x}, ${d.y})` })
    .on("mouseover", function(d) {
      tooltip.text(d.data.name + ": " + format(d.data.unique_word_count) +" unique words");
      tooltip.style("visibility", "visible");
    })
    .on("mousemove", function() {
      return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
    })
    .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    node.append(`circle`)
    .attr(`r`, function(d) { return d.r })
    .attr(`fill`, function(d) { return color(d.data.name) })
    .attr(`stroke`, `grey`);

    node.append(`text`)
    .attr(`dy`, `.4em`)
    .attr(`font-size`, function(d) { return d.r/d.data.name.length*3 })
    .style(`text-anchor`, `middle`)
    .text(function(d) { return d.data.name })
  }
}
