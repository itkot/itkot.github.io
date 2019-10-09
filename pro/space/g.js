foo = new Body('foo');
foo.size = 50;
foo.m = 1000000;
foo.m *= 2500;
foo.vy = -0.04;
foo.userPick = './img/p.png';
foo.draw(250,570);

sheep = new Body('sheep');
sheep.m = 5;

sheep.vy = -0.04;
sheep.size = 15;
sheep.userPick = './img/bgbattleship.png';
sheep.draw(270,570);



sun = new Body('sun');
sun.m = 1000000;
sun.m *= 100000;
sun.size = 150;
sun.userPick = './img/sun.gif';
sun.vy = -0.02;
sun.draw(600,500);



foo.vy = 1;
sheep.vy = 1.2;




p4 = new Body('p4');
p4.userPick = './img/p4.png';
p4.m = 1000000;
p4.m *= 10;
p4.size = 75;
p4.vy = 1.2;
p4.draw(1000,500);


// VP = new ViewPort('body');
// VP.setViewObgect(sheep);





 gravity = new Gravity();
 gravity.addBody(sun);
 gravity.addBody(p4);
 gravity.addBody(foo);
 gravity.addBody(sheep);

gameCycle = setInterval(
    function(){

        gravity.tik();

         sun.animate();
         foo.animate();
         sheep.animate();
         p4.animate();

        //VP.animate();
    },10);


document.onclick = function (e) {
    console.log(e);
    alert(e.offsetX);
    //offsetY: 277
};