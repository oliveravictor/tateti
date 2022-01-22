let turn = 1;
let piece = ["O", "X"];
let shots = 0;
let finishedGame = false;
let win = document.getElementById("win");
let buttons = Array.from(document.getElementsByTagName("button"));

buttons.forEach(x => x.addEventListener("click", putTab));

function putTab(event){
    let buttonPressed = event.target;
    if(!finishedGame && buttonPressed.innerHTML == ""){
        buttonPressed.innerHTML = piece[turn];
        shots += 1;

        let stateGame = state();
        if(stateGame == 0){
            changeTurn();
            if(shots < 9){
              ia();
              stateGame = state();
              shots += 1;
              changeTurn();
            }
        }

        if(stateGame == 1 ){
          win.style.visibility = "visible";
          finishedGame = true;
        } else if (stateGame == -1){
          win.innerHTML = "Perdiste :("
          win.style.visibility = "visible";
        }    
    }
}

function changeTurn(){
  if(turn == 1){
    turn = 0;
  } else {
    turn = 1;
  }
}

function state(){
    positionWin = 0;
    nState = 0

    function equals(...args){
     values = args.map(x => x.innerHTML);
     if(values[0] != "" && values.every((x, i, arr) => x===arr[0])){
       args.forEach(x => x.style.backgroundColor = "Fuchsia")
       return true;
     } else {
       return false;
     }
    }

  if(equals(buttons[0], buttons[1], buttons[2])){
    positionWin = 1;
  } else if(equals(buttons[3], buttons[4], buttons[5])){
    positionWin = 2;
  } else if(equals(buttons[6], buttons[7], buttons[8])){
    positionWin = 3;
  } else if(equals(buttons[0], buttons[3], buttons[6])){
    positionWin = 4;
  } else if(equals(buttons[1], buttons[4], buttons[7])){
    positionWin = 5;
  } else if(equals(buttons[2], buttons[5], buttons[8])){
    positionWin = 6;
  } else if(equals(buttons[0], buttons[4], buttons[8])){
    positionWin = 7;
  } else if(equals(buttons[2], buttons[4], buttons[6])){
    positionWin = 8;
  }

 if(positionWin > 0){
   if(turn == 1){
     nState = 1;
   }else {
     nState = -1;
   }
 }
return nState;

}

function ia(){
  function random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let values = buttons.map(x => x.innerHTML);
  let pos = -1;

  if(values[4] == ""){
    pos = 4;
  }else {
    let n = random(0, buttons.length -1);
    while(values[n] != ""){
      n = random(0, buttons.length - 1)
    }
    pos = n;
  }

  buttons[pos].innerHTML = "O";
  return pos;
}