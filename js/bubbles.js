function bubbles(data, how_many){

  // Edit data
   var all_words_data = []

   for (var i = 0; i < data.length; i++) {
     for (var j = 0; j < data[i].vocabulary.length; j++) {
       all_words_data.push(data[i].vocabulary[j])
     }
   }

   all_words_data = d3.nest()
       .key(function(d) { return d.word })
       .rollup(function(d) { return d.length })
       .entries(all_words_data)

   all_words_data.sort(function(x, y){
      return d3.descending(x.value, y.value);
   })

   all_words_data = all_words_data.slice(0, how_many)

   // Add SVGs to DOM
   var div = `#root`;

   var height = 600
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

    var root = d3.hierarchy({children: all_words_data})
        .sum(function(d) { return d.value })

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
                tooltip.text(d.data.key + ": " + format(d.value));
                tooltip.style("visibility", "visible");
        })
        .on("mousemove", function() {
            return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
        })
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    node.append(`circle`)
        .attr(`r`, function(d) { return d.r })
        .attr(`fill`, function(d) { return color(d.data.key) })
        .attr(`stroke`, `grey`);

    node.append(`text`)
        .attr(`dy`, `.4em`)
        .attr(`font-size`, function(d) { return d.r/d.data.key.length*1.5 })
        .style(`text-anchor`, `middle`)
        .text(function(d) { return d.data.key })
}
