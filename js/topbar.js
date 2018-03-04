function topbar(data){

   // Add SVGs to DOM
   var div = `#topbartitle`;

   var height = 50
   var width = $(div).parent().width()


   var topbar = d3.select(div).append(`div`)
       .attr(`width`, width)
       .attr(`height`, height)

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
        if(j===0)
        { checkbox.checked=true  }
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
      var submitDiv = document.getElementById('submitButton');
      submitDiv.appendChild(charinput)

      var clearSelections = document.createElement('input')
      clearSelections.type="submit"
      clearSelections.value="Clear selections"
      clearSelections.classList.add('clearButton')
      clearSelections.onclick = function() {
        clear()
       }
      var submitDiv = document.getElementById('submitButton');
      submitDiv.appendChild(clearSelections)

function clear(){
  var selections = document.querySelectorAll('#selections input')
  for (var i = 0, l = selections.length; i < l; i++)
  {
    if(selections[i].checked)
      selections[i].checked = false;
  }
}



}
