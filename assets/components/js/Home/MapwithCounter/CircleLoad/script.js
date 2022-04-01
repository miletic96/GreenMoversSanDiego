let number1 = document.getElementById("number1");
let number2 = document.getElementById("number2");
let number3 = document.getElementById("number3");
let number4 = document.getElementById("number4");
let counter1 = 0 ;
let counter2 = 0 ;
let counter3 = 0 ;
let counter4 = 0 ;
setInterval(() => {
    if(counter1 == 97){
        clearInterval();
    }else{
        counter1 +=1;
        number1.innerHTML = counter1 + "%";
    }
  
},30);

setInterval(() => {
    if(counter2 == 100){
        clearInterval();
    }else{
        counter2 +=1;
        number2.innerHTML = counter2 + "%";
    }
  
},30);
setInterval(() => {
    if(counter3 == 100){
        clearInterval();
    }else{
        counter3 +=1;
        number3.innerHTML = counter3 + "%";
    }
  
},30);
setInterval(() => {
    if(counter4 == 4){
        clearInterval();
    }else{
        counter4 +=1;
        number4.innerHTML = counter4 + "%";
    }
  
},30);



