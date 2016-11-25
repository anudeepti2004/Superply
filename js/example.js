var table = 10;            // Unit of table
var operator = 'multiplication'; // Type of calculation
var i = 1;                 // Set counter to 1
var msg = '';       
var turnBlue=true;       // Message
var x = new Array(table);
for (var i = 0; i < table; i++) {
  x[i] = new Array(table);
  for (var j = 0; j < table; j++){
     x[i][j] = -1;
  }
}
var winnerIsBlue=false;
var resultIsgameOver=false;
var statusHint = false;
var currentHint = "";
var currentHintType = 0;
var value1=0, value2=0;
 
var myDiv = document.getElementById("myDiv");
 
 show = function(){
        myDiv.style.display = "block";
        setTimeout(hide, 5000); // 5 seconds
      },

      hide = function(){
        myDiv.style.display = "none";
      };
	  
var lastClicked;
var grid = clickableGrid(table,table,function(el,row,col,i){
    console.log("You clicked on element:",el);
    console.log("You clicked on row:",row);
    console.log("You clicked on col:",col);
    console.log("You clicked on item #:",i);
    statusHint = satisfiesHint(row-1,col-1);
    console.log("statusHint:",statusHint);
    
	if(turnBlue){
		if(statusHint){
		  el.className='blueclicked';
		  x[row-1][col-1]=0;
		  resultIsgameOver=isGameOver();
		  if(resultIsgameOver){
			winnerIsBlue=true;
			console.log("Game Over Blue Wins!");
			hint.innerHTML= "Game Over Blue Wins!";	
		  }
		  else {
		    currentHint = generateHint();
		    hint.innerHTML= currentHint;
		    console.log("currentHintType:",currentHintType);
            console.log("currentHint:",currentHint);
            console.log("value1:",value1); 
            console.log("value2:",value2);
          }  
		}  
		hint.style.color = "#FF0000";
		turnBlue=false;
	}else{
		if(statusHint){
		  el.className='redclicked';
		  x[row-1][col-1]=1;
		  resultIsgameOver=isGameOver();
		  if(resultIsgameOver){
			winnerIsBlue=false;
			console.log("Game Over Red Wins!");
			hint.innerHTML= "Game Over Red Wins!";		
		  }
		  else {
		    currentHint = generateHint();
		    hint.innerHTML= currentHint;
		    console.log("currentHintType:",currentHintType);
            console.log("currentHint:",currentHint);
            console.log("value1:",value1); 
            console.log("value2:",value2);
          }  
		}  
		hint.style.color = "#0000FF";
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
    for (var r=1;r<=rows;++r){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=1;c<=cols;++c){
		var cell = tr.appendChild(document.createElement('td'));
			if(c==1){
				cell.innerHTML = r;
			}
			else if(r==1){
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

// red 1 -> vertical, blue 0 -> horizontal, empty -1s

function isThereAHorizontalPath(){
    var ans = false;
    for(var i=0;i<table;i++) {
       if(x[i][0] == 0) {
         ans = DFSHorizontal(i,0);
         if(ans){ 
            return ans;
         }
       }
    }
    return ans;
}

function DFSHorizontal (i,j) {
   if(j == (table-1))
      return true;
   var ans = false;
   if(x[i][j+1] == 0) {
     ans = DFSHorizontal(i,j+1);
     if(ans) { 
       return ans;
     }  
   }
   if(i+1 < table && x[i+1][j+1] == 0) {
     ans = DFSHorizontal(i+1,j+1);
     if(ans) {
       return ans;
     } 
   }      
   if(i-1 >= 0 && x[i-1][j+1] == 0) {
     ans = DFSHorizontal(i-1,j+1); 
   }
   return ans;
}

function isThereAVerticalPath(){
    var ans = false;
    for(var i=0;i<table;i++) {
       if(x[0][i] == 0) {
         ans = DFSVertical(0,i);
         if(ans){ 
            return ans;
         }
       }
    }
    return ans;
}

function DFSVertical (i,j) {
   if(i == (table-1))
      return true;
   var ans = false;
   if(x[i+1][j] == 1) {
     ans = DFSVertical(i+1,j);
     if(ans) { 
       return ans;
     }  
   }
   if(j+1 < table && x[i+1][j+1] == 1) {
     ans = DFSVertical(i+1,j+1);
     if(ans) {
       return ans;
     }
   }       
   if(j-1 >= 0 && x[i+1][j-1] == 1) {
     ans = DFSVertical(i+1,j-1); 
   }
   return ans;
}


function getHint(){
   var textBox = document.createElement('myText');
   textBox.className="textBox";
   textBox.innerHTML= generateHint();
   return textBox;
}

function generateHint() {
  // pick an empty location and generate appropriate hint. 
  // Hint may apply to more than one locations though so have to check what to do then
  var emptyCellValues = new Array(table*table);
  var index = 0;
  for (var i = 0; i < table; i++) {
     for(var j = 0; j< table; j++) {
        if(x[i][j] == -1) {
           emptyCellValues[index] = (i+1)*(j+1);
           index ++;
        }
     }
  }
  var randomEmptyCell = Math.floor(Math.random() * index);
  var num = emptyCellValues[randomEmptyCell];
  
  // hint type 0 : odd/even
  // hint type 1 : between x and y inclusive
  // hint type 2 : contains digit x
  // hint type 3 : less than x
  // hint type 4 : greater than x
  
  var hintType = Math.floor(Math.random() * 5);
  var upper, lower, sNum, digitLoc;
  var h = "";
  switch(hintType)
  {
     case 0 : if(num%2 == 0){
                 h = "Product is even";
                 value1 = 0;
              }
              else {
                 h = "Product is odd";
                 value1 = 1;
              }
              value2 = 0;
              break;
     case 1 : upper = Math.floor(Math.random() * num) + num + 1;
              lower = Math.floor(Math.random() * num);
              h = "Product is between " + lower + " and " +upper +", inclusive";
              value1 = lower; value2 = upper;
              break;
     case 2 : sNum = num.toString();
              digitLoc = Math.floor(Math.random() * sNum.length); 
              contains = sNum.charAt(digitLoc);
              value1 = contains; value2 = 0; 
              h = "Product contains the digit "+contains;
              break;
     case 3 : upper = Math.floor(Math.random() * num) + num + 1;
              h = "Product is less than " + upper;
              value1 = upper; value2 = 0;
              break;
     case 4 : lower = Math.floor(Math.random() * num);
              h = "Product is greater than " + lower;
              value1 = lower; value2 = 0;
              break; 
     
  }
  
  currentHintType = hintType;
  return h;    
}

function satisfiesHint(row, col) {
   if(x[row][col] != -1) {
      return false;
   }   
   var num = (row+1)*(col+1);
   var result = false;
   switch(currentHintType)
   {
      case 0 : if(num%2 == 0 && value1 == 0)
                   result = true;
               else if(num%2 != 0 && value1 == 1)
                   result = true;
               break;
      case 1 : if(num >= value1 && num <= value2)  
                   result = true;
               break;    
      case 2 : var sNum = num.toString();
               for(var i=0; i<sNum.length; i++){
                  if(parseInt(sNum.charAt(i)) == value1){
                       result = true;
                       break;
                  }     
               }    
               break;
      case 3 : if(num < value1)
                   result = true; 
               break;
      case 4 : if(num > value1)
                   result = true;
               break;                              
                                 
   }
   return result;
}
