const oneTick = new Event('oneTick');
let up, down, left, right = false;
document.addEventListener('keydown', function(e){
 if(e.key === "w"){
  up = true;
  while(up){
    moveUp();
  }
 }
 if(e.key === "a"){
  left = true;
  while(left){
    moveLeft();
  }
 }
 if(e.key === "s"){
  down = true;
  while(down){
    moveDown();
  }
 }
 if(e.key === "d"){
  right = true;
  while(right){
    moveRIght();
  }
 }
});
document.addEventListener("keyup", function(e){
 if (e.key === "w"){
     up = false;
 }
 if (e.key === "a"){
     left= false;
 }
 if (e.key === "s"){
     down= false;
 }
 if (e.key === "d"){
     right= false;
 }
});

function tick(){
 document.dispatchEvent(oneTick);
}
function run(){
 setInterval(tick, 16.66);
}


