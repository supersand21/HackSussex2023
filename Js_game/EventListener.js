const oneTick = new Event('oneTick');
let up, down, left, right = false;
document.addEventListener('keyDown', function(e){
 if(e.key === "w"){
  up = true;
 }
 if(e.key === "a"){
  left = true;
 }
 if(e.key === "s"){
  down = true;
 }
 if(e.key === "d"){
  right = true;
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
