function calculate(data, banned){

  data = data//.slice(0,100)

  var edited_data = []
  var nested_data = d3.nest()
      .key(function(d) { return d.Character })
      .entries(data)

  for (var i = 0; i < nested_data.length; i++) {
    var lines = ''

    nested_data[i].values.forEach(function(d) {
      lines += d.Line + ' '
    })

    lines = lines.toUpperCase();
    var splitwords = lines.split(/\W+/);

    for (var j = 0; j < splitwords.length; j++) {
      for (var k = 0; k < banned.length; k++) {
        if (splitwords[j] === banned[k]) {
          splitwords.splice(j, 1)
        }
      }
    }

    var count = d3.nest()
        .key(function(d) { return d })
        .rollup(function(d) { return d.length })
        .entries(splitwords)

    vocabulary = []

    for (var j = 0; j < count.length; j++) {
      vocabulary.push({word: count[j].key, count: count[j].value})
    }

    vocabulary.sort(function(x,y) {
      return d3.descending(x.count, y.count)
    })

    edited_data.push({name: nested_data[i].key, vocabulary: vocabulary})
  }

  edited_data.sort(function (a,b) {
    var a_temp = 0
    var b_temp = 0

    a.vocabulary.forEach(function(e) {
      a_temp += e.count
    })
    b.vocabulary.forEach(function(e) {
      b_temp += e.count
    })

    return b_temp - a_temp
  })

  return edited_data
}
