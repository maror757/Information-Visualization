function show(data){

    this.data = data
    var div = '#root'

    var height = 600;

    var parentWidth = $(div).parent().width()
    var margin = {top: 20, right: 20, bottom: 60, left: 40},
        width = parentWidth - margin.right - margin.left,
        height = height - margin.top - margin.bottom

    var svg = d3.select(div).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    console.log(data)
}
