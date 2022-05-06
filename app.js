var poengsum = 1;
var nivå = 1;

var ødelagtAlien = 0;


var poengEl = document.getElementById("poeng");
var nivåEl = document.getElementById("nivå");

var x = 500;
var vGrad = "lett";
var lettEl = document.getElementById("lett");
var midEl = document.getElementById("middels");
var hardEl = document.getElementById("vanskelig")

window.addEventListener("keydown", mottaTaster);
window.addEventListener("keyup", mottaTaster);
var knapper = [];
var c = document.getElementById("mittCanvas");
var ctx = c.getContext("2d");
var animasjonID;

var restartEl = document.getElementById("restart")

restartEl.addEventListener("click", restart);

function restart() {
  

  window.location.reload();

}


function mottaTaster(e) {
  if (e.type == "keydown") {
    knapper[e.keyCode] = true;
  } else {
    knapper[e.keyCode] = false;
  }
}


//Kjører poengteller funskjonen  som legger til 2 poeng hvert sek.
 setInterval(
 function poengteller() {
   if (nivå < 11) {
     poengEl.innerHTML = "Poeng:" + poengsum;
    
     if (poengsum % 10 == 0) {
       nivåEl.innerHTML = "Nivå:" + nivå;

       nivå++;
     }

     if (lettEl.checked == true) {
     vGrad = lettEl.value;
     lettEl.blur();
     x = 1000;

     } else if (midEl.checked == true) {
     vGrad = midEl.value;
     midEl.blur();
     x = 500;
     } else if (hardEl.checked == true) {
     vGrad = hardEl.value;
     hardEl.blur();
     x = 250;
     }
     
     poengsum++;
   }
}, x);



//Gjør canvasen responsiv til skjermer med høyere/lavere oppløsning

window.onload = function() {
     c.width = window.innerWidth * window.devicePixelRatio * 0.6;
     c.height = window.innerHeight * window.devicePixelRatio * 0.75;

}




class Spiller {
  constructor(x, y, fart) {
    this.x = x;
    this.y = y;
    this.fart = fart;
  }

  flytt() {
       //Gir spilleren fart når piltastene trykkes inn
    if (knapper[37]) {
      spiller.x -= spiller.fart;
    }
    if (knapper[39]) {
      spiller.x += spiller.fart;
    }
    if (knapper[38]) {
      spiller.y -= spiller.fart;
    }
    if (knapper[40]) {
      spiller.y += spiller.fart;
    }

    //Hindrer spilleren i å bevege seg ut av canvas
    if (this.x - 10 < 0) {
      spiller.x += this.fart;
    }
    if (this.x + 80 > c.width) {
      spiller.x -= this.fart;
    }
    if (this.y  < 0) {
      spiller.y += this.fart;
    }
    if (this.y + 80 > c.height) {
      spiller.y -= this.fart;
    }
  }

  tegn() {
    var spaceShipImg = document.getElementById("spaceShip");
    ctx.drawImage(spaceShipImg, this.x, this.y, 80, 80);
  }
}

class Fiende {
  constructor(x, y, fart) {
    this.x = x;
    this.y = y;
    this.xFart = fart;
    this.yFart = fart;
    this.alienbilde = document.getElementById("alien");
    this.expobilde = document.getElementById("explosion");
    this.bilde = this.alienbilde;
  }

  flytt() {
    this.x += this.xFart;

    if (vGrad == "lett") {
      this.y += this.yFart / 4;
      this.x += this.xFart / 4;

      console.log("Lett")
    } else if (vGrad == "mid") {
      this.y += this.yFart;
      this.x += this.xFart;
      console.log("Mid")
    } else {
      this.y += this.yFart * 3;
      this.x += this.xFart;


      console.log("Hard")

    }

    if (this.x - 10 < 0 || this.x + 90 > c.width) {
      this.xFart = -this.xFart;
    }

    if (this.y + 60 > c.height || this.y - 5 < 0) {
      this.yFart = -this.yFart;
    }
  }

  tegn() {
    ctx.drawImage(this.bilde, this.x, this.y, 80, 55);
  }

  ødelagt() {
    this.tidSkutt = Date.now();
    this.bilde = this.expobilde;
  }

  skutt() {
    this.yFart = 0;
    this.xFart = 0;
  }
}

class Skudd {
  constructor(x, y, fart) {
    this.x = x;
    this.y = y;
    this.yFart = fart;
    this.xFart = fart;
  }

  tegn() {
   var laserbeamImg = document.getElementById("laser");
    ctx.drawImage(laserbeamImg, this.x, this.y, 19.1, 50)
  }

  flytt() {
       this.y -= this.yFart;
  }

}


var spiller = new Spiller(c.width/4, c.height/2.5, 6);

var fiende = [];


fiende.push(new Fiende(c.width/4, c.height/4, Math.random()*3+2));

var skudd = [];

var sisteSkudd = 0;

var z = 1;

// var hinder2 = new Hinder(canvas.width/5, canvas.height/4, "yellow", 5);



function finnAvstand(obj1, obj2) {

  var xAvstand2 = Math.pow(obj1.x - obj2.x, 2);
  var yAvstand2 = Math.pow(obj1.y - obj2.y, 2);

  var avstand = Math.sqrt(xAvstand2 + yAvstand2);

  return avstand;
}



 


function animer() {
  ctx.clearRect(0, 0, c.width, c.height);

    for( var i = 0; i < fiende.length; i++) {
    fiende[i].flytt();
    fiende[i].tegn();

    console.log("for løkke 1")
    }


  spiller.flytt();
  spiller.tegn();

  

  if (knapper[32] && Date.now() - sisteSkudd > 500) {
    if (z == 1) {
      skudd.push(new Skudd(spiller.x + 14, spiller.y - 20, 7));
      z = 2;
    } else if (z == 2) {
      skudd.push(new Skudd(spiller.x + 60, spiller.y - 20, 7));

      z = 1;
    }

    sisteSkudd = Date.now();
  }

  for (i = 0; i < skudd.length; i++) {
    skudd[i].flytt();
    skudd[i].tegn();
    console.log("for løkke 2")
  }


   for (var i = 0; i < skudd.length; i++) {
     for (var j = 0; j < fiende.length; j++) {
       if (finnAvstand(skudd[i], fiende[j]) < 50) {
         skudd.splice(i, 1);

         fiende[j].ødelagt();

         ødelagtAlien = 1;
         console.log("for løkke 3 og 4")
       }
     }
   }

var nyTid = Date.now();

  for(var i = 0; i < fiende.length; i++) {
          if(ødelagtAlien == 1){

            fiende[i].skutt();

            if(nyTid - fiende[i].tidSkutt  > 1000) {

              fiende.splice(i, 1);

              ødelagtAlien = 0;

              fiende.push(new Fiende(Math.random()*c.width-50, Math.random()*c.height - 20, 2));



      }
    }
    console.log("for løkke 5")
  }

  for(var i = 0; i < fiende.length; i++) {
    if (finnAvstand(fiende[i], spiller) < 50) {
      ctx.font = "30px Comic Sans MS";
      ctx.fillStyle = "yellow";
      ctx.textAlign = "center";
      ctx.fillText("Du tapte!", c.width/2, c.height/2);


            cancelAnimationFrame(animasjonID);    } 
            else {
  animasjonID = requestAnimationFrame(animer);    }
  console.log("for løkke 6")

  }
  

  console.log(fiende[0].xFart);
}

animasjonID = requestAnimationFrame(animer);