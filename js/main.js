d3.queue()
  .defer(d3.csv,'./data/dialog.csv')
  .await(draw)

var bubbles, showsankey, topbar
var edited_data

var banned = ['', 'S', 'T', 'M', 'RE', 'LL', 'VE']

function draw(error, data){
  if (error) throw error

  edited_data = calculate(data, banned)

  topbar = new topbar()
  bubbles = new bubbles(edited_data, 100)
  showsankey = new showsankey(data)
  showsankey.draw()
}
