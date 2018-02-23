function show(data){

    this.data = data

    var character_count;

    var character_count = d3.nest()
   .key(function(d) { return d.Character; })
   .rollup(function(g) { return g.length })
   .entries(data);

   character_count.sort(function(x, y){
      return d3.descending(x.value, y.value);
   })

   character_count = character_count.slice(0, 10)

   for (var prop in character_count) {
     console.log(character_count[prop].value + ' ' + character_count[prop].key)
   }

   console.log(character_count)

   var div = '#root';

   var height = 500;
   var parentWidth = $(div).parent().width();
   var margin = {top: 20, right: 20, bottom: 60, left: 40},
       width = parentWidth - margin.right - margin.left,
       height = height - margin.top - margin.bottom

   var color = d3.scaleOrdinal(d3.schemeCategory20)

   var svg = d3.select(div).append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)

    var circle = svg.selectAll("circle")
        .data(character_count)

    var circleEnter = circle.enter().append("circle")

    circleEnter.attr("cy", 60);
    circleEnter.attr("cx", function(d, i) { return i * 200 + 30; });
    circleEnter.attr("r", function(d) { return Math.sqrt(d.value); });
}
