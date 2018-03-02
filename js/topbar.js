function topbar(){

   //for (var prop in character_count) {
   //  console.log(character_count[prop].value + ' ' + character_count[prop].key)
   //}

   //console.log(character_count)

   // Add SVGs to DOM
   var div = `#topbar`;

   var height = 50
   var width = $(div).parent().width()


   var topbar = d3.select(div).append(`div`)
       .attr(`width`, width)
       .attr(`height`, height)

   topbar.append(`p`)
       .text(`Choose character to display`)

	//LÄS IN DE 10 SOM SÄGER MEST//
   var strChar1 = "Cartman"
   var strChar2 = "Kyle"
   var strChar3 = "Stan"
   var strChar4 = "Butters"
   var strChar5 = "Chef"
   var strChar6 = "Kenny"
   var strChar7 = "Mayor McDaniels"
   var strChar8 = "Jimbo"
   var charArray = []
   charArray.push(strChar1)
   charArray.push(strChar2)
   charArray.push(strChar3)
   charArray.push(strChar4)
   charArray.push(strChar5)
   charArray.push(strChar6)
   charArray.push(strChar7)
   charArray.push(strChar8)

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
