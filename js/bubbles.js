function bubbles(data){

    // Calculate character_count with d3.nest
    this.data = data

    var character_count;

    var character_count = d3.nest()
        .key(function(d) { return d.Character; })
        .rollup(function(g) { return g.length })
        .entries(data)

   character_count.sort(function(x, y){
      return d3.descending(x.value, y.value);
   })

   character_count = character_count.slice(0, 50)

   //for (var prop in character_count) {
   //  console.log(character_count[prop].value + ' ' + character_count[prop].key)
   //}

   //console.log(character_count)

   // Add SVGs to DOM
   var div = `#root`;

   var height = 800
   var width = $(div).parent().width()

   var format = d3.format(`,d`);
   var color = d3.scaleOrdinal(d3.schemeCategory20)

   // Not used anywhere yet
   var scaleText = d3.scaleLinear()
       .domain([d3.min(character_count.map(function(d) { return d.value })),
                d3.max(character_count.map(function(d) { return d.value }))])
       .range([10, 35])

    var pack = d3.pack()
        .size([width, height])
        .padding(5)

    var root = d3.hierarchy({children: character_count})
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

    node.append(`circle`)
        .attr(`r`, function(d) { return d.r })
        .attr(`fill`, function(d) { return color(d.data.key) })
        .attr(`stroke`, `grey`);

    node.append(`text`)
        .attr(`dy`, `.3em`)
        .attr(`font-size`, function(d) { return d.r/d.data.key.length*2.5 })
        .style(`text-anchor`, `middle`)
        .text(function(d) { return d.data.key })

    //console.log(root)
}
