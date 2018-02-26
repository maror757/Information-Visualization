d3.queue()
  .defer(d3.csv,'./data/dialog.csv')
  .await(draw)

var bubbles;
var showsankey;

function draw(error, data){
  if (error) throw error

  bubbles = new bubbles(data)
  showsankey = new showsankey(data)
}
