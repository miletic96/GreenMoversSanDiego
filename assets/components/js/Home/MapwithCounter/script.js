function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  
  function animateNumbers() {
      animateValue(animateNumber1, 0, 1000, 2000);
      animateValue(animateNumber2, 0, 2, 2000);
      animateValue(animateNumber3, 0, 33, 2000);
      animateValue(animateNumber3, 0, 7, 2000);
  
  
      
  }
  var kurac = "kurac";
  window.addEventListener('DOMContentLoaded', (event) => {
      var animateNumber1 = document.getElementById("animateNumber1");
      var animateNumber2 = document.getElementById("animateNumber2");
      var animateNumber3 = document.getElementById("animateNumber3");
      var animateNumber4 = document.getElementById("animateNumber4");
  
  
  });
  window.addEventListener('scroll', function() {
      var AnimatedNumbersrow = document.getElementById("animatedNumbersRow");
      var AnimatedNumbersrowHeight = Math.round( AnimatedNumbersrow.offsetHeight / 2 );
      var offset = window.pageYOffset;
      let countStartPosition = AnimatedNumbersrowHeight + AnimatedNumbersrow.offsetTop - window.innerHeight - offset;
          
      if (typeof animateNumbers === "function" && kurac == "kurac") {
            console.log(countStartPosition);
          if( countStartPosition  <= 0){
                
                animateNumbers();
                kurac = "nekurac" 
              
          }	
        }
      
  });