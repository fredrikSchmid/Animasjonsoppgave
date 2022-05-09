
// Forskjellige variabler som blir brukt i spillet
var poengsum = 1;
var nivå = 1;
var ødelagtAlien = 0;
var poengEl = document.getElementById("poeng");
var nivåEl = document.getElementById("nivå");
var x = 500;
var vGrad = "lett";
var lettEl = document.getElementById("lett");
var midEl = document.getElementById("middels");
var hardEl = document.getElementById("vanskelig");
var knapper = [];
var c = document.getElementById("mittCanvas");
var ctx = c.getContext("2d");
var animasjonID;
var restartEl = document.getElementById("restart");
var gameOver = false;
var spaceShipImg = document.getElementById("spaceShip");
var laserbeamImg = document.getElementById("laser");
var skudd = [];
var fiende = [];
var sisteSkudd = 0;
var z = 1;


//Eventlisteners som sjekker om og hvilke taster som blir trykket på og Restart-knappen
window.addEventListener("keydown", mottaTaster);
window.addEventListener("keyup", mottaTaster);
restartEl.addEventListener("click", restartButton);


//Restart-knappens funksjon som laster inn nettsiden på nytt og hindrer at den blir trykket på flere ganger på rad
function restartButton() {
  window.location.reload();
  restartEl.blur();
}

//Sjekker hvilke knapper som blir trykket på og sjekker også om "R" blir trykket på, isåfall restartes siden
function mottaTaster(e) {
  if (e.type == "keydown") {
    knapper[e.keyCode] = true;
  } else {
    knapper[e.keyCode] = false;
  }
  
  if(knapper[82]) {
    restartButton();
  }
  
}

//Kjører poengteller funskjonen  som legger til poeng og forandrer vGrad ettersom hva som er valgt
 setInterval(
 function poengteller() {
   if (nivå < 101 && gameOver == false) {
     poengEl.innerHTML = "Poeng:" + poengsum;
    
     if (poengsum % 10 == 0) {
       nivåEl.innerHTML = "Nivå:" + nivå;
       nivå++;
     }

     if (lettEl.checked == true) {
        vGrad = lettEl.value;
        lettEl.blur();
     } else if (midEl.checked == true) {
        vGrad = midEl.value;
        midEl.blur();
     } else if (hardEl.checked == true) {
        vGrad = hardEl.value;
        hardEl.blur();
     }
     poengsum++;
   }
}, 500);

//Gjør canvasen responsiv til skjermer med høyere/lavere oppløsning
window.onload = function() {
     c.width = window.innerWidth * window.devicePixelRatio * 0.6;
     c.height = window.innerHeight * window.devicePixelRatio * 0.75;

}

//Klassen til Spilleren
class Spiller {
  constructor(x, y, fart) {
    this.x = x;
    this.y = y;
    this.fart = fart;
  }

  //Funksjonen som gir spilleren fart når piltastene trykkes inn
  flytt() {
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

    //Hindrer spilleren i å bevege seg ut av canvaset
    if (this.x < 0) {
      spiller.x += this.fart;
    }
    if (this.x + 80 > c.width) {
      spiller.x -= this.fart;
    }
    if (this.y < 0) {
      spiller.y += this.fart;
    }
    if (this.y + 80 > c.height) {
      spiller.y -= this.fart;
    }
  }

  //Funksjonen som tegner opp skipet
  tegn() {
    ctx.drawImage(spaceShipImg, this.x, this.y, 80, 80);
  }
}

//Klassen til fienden/fiendene
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

  //Funksjonen som flytter på de, farten endres utifra vGrad
  flytt() {
    if (vGrad == "lett") {
      this.y += this.yFart / 1.5;
      this.x += this.xFart / 1.5;
    } else if (vGrad == "mid") {
      this.y += this.yFart;
      this.x += this.xFart;
    } else {
      this.y += this.yFart * 3;
      this.x += this.xFart * 3;
    }

    //Hindrer fiendene i å bevege seg ut av canvaset
    if (this.x - 10 < 0 || this.x + 90 > c.width) {
      this.xFart = -this.xFart;
    }

    if (this.y + 60 > c.height || this.y - 5 < 0) {
      this.yFart = -this.yFart;
    }
  }

  //Tegner opp fienden
  tegn() {
    ctx.drawImage(this.bilde, this.x, this.y, 80, 55);
  }

  //Gjør bildet om til eksplosjon og lagrer tidspunktet
  ødelagt() {
    this.tidSkutt = Date.now();
    this.bilde = this.expobilde;
  }

  //Stopper fienden
  skutt() {
    this.yFart = 0;
    this.xFart = 0;
  }
}

//Klasseb til skuddet
class Skudd {
  constructor(x, y, fart) {
    this.x = x;
    this.y = y;
    this.yFart = fart;
    this.xFart = fart;
  }

  //Tegner opp skuddet
  tegn() {
    ctx.drawImage(laserbeamImg, this.x, this.y, 19.1, 50)
  }

  //Flytter på skuddet
  flytt() {
       this.y -= this.yFart;
  }

}

//Lager en ny spiller med klassen
var spiller = new Spiller(c.width/2.5, c.height/1.69, 6);

//Lager en ny fiende med klassen og dytter den inn i arrayen
fiende.push(new Fiende(c.width/4, c.height/4, Math.random()*3+2));

//Funksjon som finner avstanden mellom to ting
function finnAvstand(obj1, obj2) {

  var xAvstand2 = Math.pow(obj1.x - obj2.x, 2);
  var yAvstand2 = Math.pow(obj1.y - obj2.y, 2);

  var avstand = Math.sqrt(xAvstand2 + yAvstand2);

  return avstand;
}

//Animasjonen
function animer() {
  ctx.clearRect(0, 0, c.width, c.height);

  //Tegner opp og flytter alle fiender i array
  for( var i = 0; i < fiende.length; i++) {
    fiende[i].flytt();
    fiende[i].tegn();
  }

  //Tegner opp og flytter spilleren
  spiller.flytt();
  spiller.tegn();

  //Lager skudd med plassering på hver side av spillerens skip hvis det har gått 500ms og dytter de inn i array
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

  //Tegner opp alle skuddene i array
  for (i = 0; i < skudd.length; i++) {
    skudd[i].flytt();
    skudd[i].tegn();
  }

  //Fjerner skudd som er over canvaset
  for (var i = 0; i < skudd.length; i++) {
    if (skudd[i].y < 0) {
      skudd.splice(i, 1);
      break
    }

    //Sjekker om skuddene treffer fienden og kjører utifra det
    for (var j = 0; j < fiende.length; j++) {
      if (finnAvstand(skudd[i], fiende[j]) < 50) {
        skudd.splice(i, 1);

        fiende[j].ødelagt();
        fiende[j].skutt();

        ødelagtAlien = 1;

        //Gir ekstra poeng når du treffer utifra vGrad
        if (vGrad == "lett") {
          poengsum = poengsum + 2;
        } else if (vGrad == "mid") {
            poengsum = poengsum + 5;
        } else if (vGrad == "hard") {
            poengsum = poengsum + 10;
        }
        break
      }
    }
  }

  //Lagrer tiden akkurat nå for å bruke i neste funksjon
  var nyTid = Date.now();

  //Går gjennom alle fiendene i arrayen og sjekker om de er ødelagt, lar de være ødelagt i 1000ms før de fjernes og det
  //legges til nye fiender. Antall nye fiender utifra vGrad.
  for(var i = 0; i < fiende.length; i++) {
    if(ødelagtAlien == 1){
      if(nyTid - fiende[i].tidSkutt  > 1000) {
        fiende.splice(i, 1);
        ødelagtAlien = 0;

        if(vGrad == "lett") {
          fiende.push(new Fiende(Math.random()*(c.width/1.2), Math.random()*(c.height/2), 2));
        } else if (vGrad == "mid") {
            fiende.push(new Fiende(Math.random()*(c.width/1.2), Math.random()*(c.height/2), 2));
            fiende.push(new Fiende(Math.random()*(c.width/1.2), Math.random()*(c.height/2), 2));
        } else {
            fiende.push(new Fiende(Math.random()*c.width-50, Math.random()*(c.height/2), 2));
            fiende.push(new Fiende(Math.random()*c.width-50, Math.random()*(c.height/2), 2));
            fiende.push(new Fiende(Math.random()*c.width-50, Math.random()*(c.height/2), 2));
        }
      }
    }
  }

  //Sjekker om spiller og en fiende er på hverandre, skriver på canvaset og setter gameOver = true
  for(var i = 0; i < fiende.length; i++) {
    if (finnAvstand(fiende[i], spiller) < 50) {
      ctx.font = "30px Courier New";
      ctx.fillStyle = "yellow";
      ctx.textAlign = "center";
      ctx.fillText("Du tapte!", c.width/2, c.height/2);
      ctx.font = "20px Courier New";
      ctx.fillText("Du fikk " + (poengsum-1) + " poeng!", c.width/2, c.height/1.7);
      ctx.font = "17px Courier New"
      ctx.fillText("Trykk på 'R' eller Restart-knappen for å starte på nytt", c.width/2, c.height/1.4)
      gameOver = true;
    }
  }

  //Stopper spillet hvis gameOver = true, ellers fortsetter spillet av seg selv
  if (gameOver == false) {
    animasjonID = requestAnimationFrame(animer); 
  } else if (gameOver == true){
    cancelAnimationFrame(animasjonID);
  }
}

//Kjører animasjonen en gang for å sette den i gang
animasjonID = requestAnimationFrame(animer);


