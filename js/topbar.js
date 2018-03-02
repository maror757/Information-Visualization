function topbar(data){

   //for (var prop in character_count) {
   //  console.log(character_count[prop].value + ' ' + character_count[prop].key)
   //}

   //console.log(character_count)

   data=data.slice(0,20)
   // Add SVGs to DOM
   var div = `#topbar`;

   var height = 50
   var width = $(div).parent().width()

   var topbar = d3.select(div).append(`div`)
       .attr(`width`, width)
       .attr(`height`, height)

   topbar.append(`p`)
       .text(`Choose character to display`)

	//Read in the 20 characters that speak the most//
    var charArray = []
   data.forEach(function (object) {
     for(let prop in object){
       if(prop === "name")
       {
         charArray.push(object[prop])
       }
     }
   })
   console.log("charArray = ", charArray)

    var root = document.getElementById('topbar');

      for (var j =0; j<charArray.length; j++)
      {
        var myDiv = document.createElement("div")
        var label = document.createElement('label');
        label.innerText  = charArray[j]
        myDiv.appendChild(label)
        label.id = 'selections'
        label.classList.add('container');
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.value = charArray[j]
        var span = document.createElement('span');
        span.classList.add('checkmark');

        label.appendChild(checkbox);
        label.appendChild(span);
        root.appendChild(myDiv)
      }

      var charinput = document.createElement('input')
      charinput.type="submit"
      charinput.value="Submit"
      charinput.onclick = function() {
        showsankey.draw()
        bubbles.draw()
       }
      root.appendChild(charinput)
}
