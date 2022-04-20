var poengsum = 1;
var nivå = 1;

var poengEl = document.getElementById("poeng");
var nivåEl = document.getElementById("nivå");

// setInterval(function () {
//   if (nivå < 11) {
//     poengEl.innerHTML = "Poeng:" + poengsum;

    
//     if (poengsum % 10 == 0) {
//       nivåEl.innerHTML = "Nivå:" + nivå;

//       nivå++;
//     }
//     poengsum++;
//   }
//}, 100);









 window.onload = function() {
     var c = document.getElementById("mittCanvas");
     c.width = window.innerWidth * window.devicePixelRatio * 0.6;
     c.height = window.innerHeight * window.devicePixelRatio * 0.75;
     var ctx = c.getContext("2d");
     var img = document.getElementById("spaceShip");

     // Forsøk på å rotere romskipet
    //  ctx.translate(
    //     img.width * Math.cos(90 * (Math.PI / 180)) -
    //       img.height * Math.sin(90 * (Math.PI / 180)),
    //     img.height * Math.cos(90 * (Math.PI / 180)) +
    //       img.width * Math.sin(90 * (Math.PI / 180))
    //   );
    //  ctx.rotate(90*(Math.PI) / 180);
     
     ctx.drawImage(img, 200, 200, 80, 80);

    

    

}




 var knapper = [];


 var animasjonID;


// var audio = document.getElementById("lyd");
// var audio2 = document.getElementById("romlyd");


// class Sirkel {
//     constructor(x, y, farge) {
//         this.x = x;
//         this.y = y;
//         this.farge = farge;
//     }
    
//     tegn() {
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, 15, 0, Math.PI*2);
//         ctx.strokeStyle = "#000000";
//         ctx.lineWidth = 5;
//         ctx.stroke();
//         ctx.fillStyle = this.farge;
//         ctx.fill();
//         ctx.closePath();
//     }
// }

// class Hinder extends Sirkel {
//     constructor(x, y, farge, fart) {
//         super(x, y, farge);
//         this.xFart = fart;
//         this.yFart = fart;
//     }

//     flytt() {
//         this.x += this.xFart;
//         this.y += this.yFart;

//         if (this.x - 15 < 0 || this.x + 15 > canvas.width) {
//           this.xFart = -this.xFart;
//           poeng++;
//           audio.play();
//         }

//         if (this.y + 15 > canvas.height || this.y - 15 < 0) {
//           this.yFart = -this.yFart;
//           poeng++;
//           audio.play();

//         }
//     }
// }

// class Spiller extends Sirkel {
//     constructor (x, y, farge, fart) {
//         super(x, y, farge);
//         this.fart = fart;
//     }

//     flytt() {
//         if (knapper[37]) {spiller.x -= spiller.fart;}
//         if (knapper[39]) {spiller.x += spiller.fart;}
//         if (knapper[38]) {spiller.y -= spiller.fart;}
//         if (knapper[40]) {spiller.y += spiller.fart;}

//         if (this.x - 15 < 0 ) {spiller.x += this.fart;}
//         if (this.x + 15 > canvas.width) {spiller.x -= this.fart};
//         if (this.y - 15 < 0) {spiller.y += this.fart};
//         if (this.y + 15 > canvas.height) {spiller.y -= this.fart};

//     }   
// }

// var spiller = new Spiller(canvas.width/2, canvas.height -20, "orange", 7);
// var hinder = new Hinder(canvas.width/2, canvas.height/2, "red", 5);
// var hinder2 = new Hinder(canvas.width/5, canvas.height/4, "yellow", 5);

// window.addEventListener("keydown", mottaTaster);
// window.addEventListener("keyup", mottaTaster);


// function mottaTaster(e) {
//     if (e.type ==="keydown") {
//         knapper[e.keyCode]  = true;
//     } else {
//         knapper[e.keyCode] = false;
//     }

// }


// function finnAvstand(obj1, obj2) {
//     var xAvstand2 = Math.pow(obj1.x - obj2.x, 2);
//     var yAvstand2 = Math.pow(obj1.y -obj2.y, 2);

//     var avstand = Math.sqrt(xAvstand2 + yAvstand2);

//     return avstand;
// }


 function animer() {
     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     hinder.flytt();
//     hinder.tegn();

//     hinder2.flytt();
//     hinder2.tegn();


     spiller.flytt();
     spiller.tegn();

//     if (finnAvstand(hinder, spiller) < 30) {

//         ctx.font = "30px Georgia";
//         ctx.fillText("Du tapte!", 90 , 75);

//         ctx.font = "15px Georgia";
//         ctx.fillText(poeng, 20, 20);

//         audio2.play();

//         cancelAnimationFrame(animasjonID);

//     }  
//     else if (finnAvstand(hinder2, spiller) < 30) {
//       ctx.font = "30px Georgia";
//       ctx.fillText("Du tapte!", 90, 75);

//       ctx.font = "15px Georgia";
//       ctx.fillText(poeng, 20, 20);
//               audio2.play();


//       cancelAnimationFrame(animasjonID);
//     } else {
//       ctx.font = "15px Georgia";
//       ctx.fillText(poeng, 20, 20);
//       animasjonID = requestAnimationFrame(animer);
//     }
 }

 animasjonID = requestAnimationFrame(animer);