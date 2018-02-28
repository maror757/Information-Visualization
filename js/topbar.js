function topbar(){

   //for (var prop in character_count) {
   //  console.log(character_count[prop].value + ' ' + character_count[prop].key)
   //}

   //console.log(character_count)

   // Add SVGs to DOM
   var div = `#root`;

   var height = 50
   var width = $(div).parent().width()


   var topbar = d3.select(div).append(`div`)
       .attr(`width`, width)
       .attr(`height`, height)

   topbar.append(`p`)
       .text(`Här är knappar`)
}
