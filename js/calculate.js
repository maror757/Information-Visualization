function calculate(data, banned) {

  data = data//.slice(0, 10000)

  var min_word_length = 2;
  var min_unique_words = 10;

  var edited_data = []

  var nested_data = d3.nest().key(function(d) {
    return d.Character
  }).entries(data)
  for (var i = 0; i < nested_data.length; i++) {
    var lines = ''

    nested_data[i].values.forEach(function(d) {
      lines += d.Line + ' '
    })

    lines = lines.toUpperCase();
    var splitwords = lines.split(/\W+/);


    for (var j = splitwords.length - 1; j > -1; j--) {
      for (var k = 0; k<banned.length; k++)
      {
        if (splitwords[j] === banned[k] || splitwords[j].length <= min_word_length) {
          splitwords.splice(j, 1)
          break;
        }
      }
    }

    var count = d3.nest().key(function(d) {
      return d
    }).rollup(function(d) {
      return d.length
    }).entries(splitwords)

    vocabulary = []
    word_count = 0
    unique_word_count = count.length

    for (var j = 0; j < count.length; j++) {
      word_count += count[j].value
      vocabulary.push({word: count[j].key, count: count[j].value})
    }

    vocabulary.sort(function(x, y) {
      return d3.descending(x.count, y.count)
    })

    if (unique_word_count > min_unique_words) {
      edited_data.push({name: nested_data[i].key, vocabulary: vocabulary, word_count: word_count, unique_word_count: unique_word_count})
    }
  }

  edited_data.sort(function(a, b) {
    return b.word_count - a.word_count
  })


  return edited_data
}
