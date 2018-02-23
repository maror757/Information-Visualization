d3.queue()
  .defer(d3.csv,'./data/dialog.csv')
  .await(draw)

var show;

function draw(error, data){
  if (error) throw error

  show = new show(data)
}
