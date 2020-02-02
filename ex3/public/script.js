// document.getElementById("to-do-input-id")
//     .addEventListener("keyup", function(event) {
//     event.preventDefault();
//     if (event.keyCode === 13) 
//     {
//         // document.getElementById("myButton").click();
//         // var names = ['John', 'Jane']

//         // for (var i = 0; i < names.length; i++) {
//         //     var name = names[i];
//         //     var ul = document.getElementById("done-list");
//         //     var li = document.createElement('li');
//         //     li.appendChild(document.createTextNode(name));
//         //     ul.appendChild(li);
//         // }
//     }
// });

// function buttonCode()
// {
//   alert("Button code executed.");
// }


// Get the input field
var input = document.getElementById("to-do-input-id");

var change_state_btn = document.getElementById("change_state_btn");

change_state_btn.addEventListener("click", function() {
    alert("Blah blah...");
}, false);

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    // event.preventDefault();
    // Trigger the button element with a click
    // document.getElementById("done-list");

    var ul = document.getElementById("done-list");
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);
  }
});