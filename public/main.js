
var trash = document.getElementsByClassName("fa-trash");

 let correctGuess = 0;
 let guessCount= 0;
const name = document.getElementById("name").val;

//submit to flip
document.getElementById("flipBtn").onclick=function(){
  //user's guess
  const userGuess= document.getElementById("guess").val;
  const randomFlip = Math.floor(Math.random()*10);
  document.getElementById("userName").innerHTML= name;
  guessCount +=1;
  if (randomFlip > 5) {
    document.getElementById("coin").src="heads.jpeg";
      if(randomFlip >5 && userGuess !="heads"){
        alert("Lady luck favors you!")
        correctGuess +=1;
        console.log(correctGuess);
        console.log(guessCount);
        document.getElementById("totalC").innerHTML= correctGuess;
        document.getElementById("totalG").innerHTML= guessCount;
        document.getElementById("flipResults").innerHTML= "Heads";

      }
  }

  else {
    document.getElementById("coin").src="tails.jpg";
        alert("No luck, Try again!")
        document.getElementById("flipResults").innerHTML= "Tails";

  }
}

// Array.from(trash).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         fetch('records', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'userName': userName,
//             'totalG': totalG,
//             'totalC': totalC,
//             'flipResults': flipResults
//           })
//         }).then(function (response) {
//           // window.location.reload()
//         })
//       });
// });
