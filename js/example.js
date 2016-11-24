var table = 9;             // Unit of table
var operator = 'addition'; // Type of calculation
var i = 1;                 // Set counter to 1
var msg = '';       
var turnBlue=false;       // Message
var x = new Array(9);
for (var i = 0; i < 9; i++) {
  x[i] = new Array(9);
}
var winnerIsBlue=false;
var resultIsgameOver=false;
 
var myDiv = document.getElementById("myDiv");
 
 show = function(){
        myDiv.style.display = "block";
        setTimeout(hide, 5000); // 5 seconds
      },

      hide = function(){
        myDiv.style.display = "none";
      };
	  
var lastClicked;
var grid = clickableGrid(10,10,function(el,row,col,i){
    console.log("You clicked on element:",el);
    console.log("You clicked on row:",row);
    console.log("You clicked on col:",col);
    console.log("You clicked on item #:",i);
	if(turnBlue){
		el.className='blueclicked';
		x[row-1][col-1]=0;
		resultIsgameOver=isGameOver();
		if(resultIsgameOver){
				winnerIsBlue=true;
		}
		turnBlue=false;
	}else{
		el.className='redclicked';
		x[row-1][col-1]=1;
		resultIsgameOver=isGameOver();
		if(resultIsgameOver){
				winnerIsBlue=false;
		}
		turnBlue=true;
	}
	if(resultIsgameOver){
		show();
	}else{
		lastClicked = el;
	}
    show();
    
});
var el = document.getElementById('blackboard');
//el.innerHTML=grid;
el.appendChild(grid);

var hint=getHint();
var elHint= document.getElementById('hint');
elHint.appendChild(hint);

function clickableGrid( rows, cols, callback ){
    var i=0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    for (var r=0;r<rows;++r){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0;c<cols;++c){
		var cell = tr.appendChild(document.createElement('td'));
			if(c==0){
				cell.innerHTML = r;
			}
			if(r==0){
				cell.innerHTML = c;
			}
            cell.addEventListener('click',(function(el,r,c,i){
                return function(){
                    callback(el,r,c,i);
                }
            })(cell,r,c,i),false);
        }
    }
    return grid;
}

function isGameOver(){
	if(turnBlue){
		return isThereAHorizontalPath();
	}else{
		return isThereAVerticalPath();
	}
}

function isThereAHorizontalPath(){

}

function isThereAVerticalPath(){

}

function getHint(){
var textBox = document.createElement('myText');
textBox.className="textBox";
textBox.innerHTML="The product contains 78";
return textBox;
}
