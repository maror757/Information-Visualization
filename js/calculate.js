function calculate(data, banned){

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


  return edited_data
}
