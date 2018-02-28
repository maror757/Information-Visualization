function bubbles(data){

    // Calculate
    this.data = data

    var character_count;

    var character_count = d3.nest()
        .key(function(d) { return d.Character; })
        .rollup(function(g) { return g.length })
        .entries(data)

   character_count.sort(function(x, y){
      return d3.descending(x.value, y.value);
   })

   character_count = character_count.slice(0, 20)

   //for (var prop in character_count) {
   //  console.log(character_count[prop].value + ' ' + character_count[prop].key)
   //}

   console.log(character_count)

   var div = `#root`;

   var height = 500
   var width = $(div).parent().width()

   var color = d3.scaleOrdinal(d3.schemeCategory20)

   var scaleRadius = d3.scaleLinear()
       .domain([d3.min(character_count.map(function(d){ return d.value })),
                d3.max(character_count.map(function(d){ return d.value }))])
       .range([5, 80])


   var sim = d3.forceSimulation()
       .force(`x`, d3.forceX(0).strength(0.03))
       .force(`y`, d3.forceY(0).strength(0.03))
       .force(`collide`, d3.forceCollide( function(d){ return scaleRadius(d.value) + 1} ))

       sim.nodes(character_count).on(`tick`, function(d){
         node.attr(`cx`, function(d) { return d.x })
         .attr(`cy`, function(d) { return d.y })
       })

   var root = d3.select(div)

   var svg = root.append(`svg`)
       .attr(`width`, width)
       .attr(`height`, height)
       .append(`g`)
       .attr(`transform`, `translate(${width/2}, ${height/2})`)

   var node = svg.selectAll(`.character`)
       .data(character_count)
       .enter().append(`circle`)
       .attr(`class`, `character`)
       .attr(`r`, function(d){ return scaleRadius(d.value)})
       .attr(`fill`, `lightblue`)
       .attr(`stroke`, `darkgray`)

}
