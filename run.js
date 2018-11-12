//here we are adding two buttons, stop and run
function addButtons() {

  document.body.innerHTML= `<button id="run"
                            style=" position: relative;
                            left: 250px;
                            top: -400px "
                            type="button">
                            Run
                            </button>`;
  var runBtn=document.getElementById("run");
 
  var stopBtn=document.createElement("button");
  stopBtn.textContent="Stop";
  stopBtn.setAttribute("id","stop");
  stopBtn.style.cssText=`position: relative;
                             left: 168px;
                              top: -360px`
  document.body.after(runBtn,stopBtn)
  
 // document.body.insertBefore(runBtn, stopBtn); 
}

//This function creates the big circle and adds it to the HTML page
function addBigCircle () { 
  // creates a new div element 
  let parentDiv = document.createElement("div"); 
  let newContent = document.createTextNode(""); 
  parentDiv.appendChild(newContent);  
  parentDiv.style.cssText = `display:inline-block; 
                             width:500px; 
                             height:500px; 
                             border-radius: 300px; 
                             margin: auto;
                             border-color: #ff56F;
                             border-style: dotted double double solid ;
                             position: relative;
                             left: 350px;
                             top: 100px
                             ` 
parentDiv.setAttribute("id","fixed")

  var currentDiv = document.getElementById("div"); 
  document.body.insertBefore(parentDiv, currentDiv); 
}

//This function create the small circle and adds it to the HTML page
function addSmallCircle()
{
  let smlCircle = document.createElement("div"); 
  let newContent = document.createTextNode(""); 
  smlCircle.appendChild(newContent);  
  smlCircle.style.cssText = `display:inline-block; 
                             width:100px; 
                             height:100px; 
                             border-radius: 60px; 
                             margin: auto;
                             border-color: #ff56F;
                             border-style: dotted double double solid ;
                             position: relative;
                             left: 200px;
                             top: 100px
                             ` 
  smlCircle.setAttribute("id","float");
  var currentDiv = document.getElementById("div"); 
  document.body.insertBefore(smlCircle, currentDiv);
  
}

//Rotate function takes parametr  X,Y and changes the small circle possition.
// used in repeat function which is nested in animation function
function rotate(x_pos, y_pos) {
  var d = document.getElementById('float');
  d.style.position = "absolute";
  d.style.left = x_pos+'px';
  d.style.top = y_pos+'px';
}
/* this is the formula which I forgot :D
  X := originX + cos(angle)*radius;
  Y := originY + sin(angle)*radius;*/

var pos=1.0; // this is the starting possition of small circle
var tmp_pos=1.0; //this is the fixed possition when stop button wil be pressed

function onStop(event)
{
  tmp_pos=pos;
  pos=362;
  runBtnProp(false);
  stopBtnProp(true);

}

function animation(event) {
  var bigCircle= document.getElementById("fixed");
  var centerX = bigCircle.offsetLeft-50 + bigCircle.offsetWidth / 2; //100
  var centerY = bigCircle.offsetTop -50 + bigCircle.offsetHeight / 2;//400
  pos=tmp_pos;
  stopBtnProp(false);
  runBtnProp(true);
  /* the same fromula from above
  X := originX + cos(angle)*radius;
  Y := originY + sin(angle)*radius;*/

//repeat function is for calcualtion sine and cosine it will work untill pos (or angle in real formula) variable 
//will be smaller than 361 (degree), here position is the same as angle in real formula
  repeat = () => {          
   setTimeout(function () {    
    let radius=250;
    let currentX=centerX+ Math.cos(pos)*radius;
    let currentY=centerY+ Math.sin(pos)*radius;      
      pos+=0.01;                     
      if (pos < 361) {           
        rotate(currentX,currentY); 
        repeat();             
      } 
      else if(pos==360) 
            pos=1.0;
   }, 10)
  }
  repeat();
}
//The functions stop button propertice (stopBtnProp) and run button propertice (stopBtnProp)
//serve as a triger. For example if we will press stop button run button will disabled and vise versa
function stopBtnProp(bool)
{
  const btnStop=document.getElementById("stop");
      btnStop.onclick=onStop;
      btnStop.disabled=bool;

}

function runBtnProp(bool)
{
  const btn=document.getElementById("run");
  btn.textContent = bool ? `Not run` : 'Run';
  btn.onclick=animation;
  btn.disabled=bool;
  
}

//Initialization here :)
addButtons();
addBigCircle();
addSmallCircle();

runBtnProp(false);
stopBtnProp(true);

