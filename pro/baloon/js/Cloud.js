Cloud = function(){
    this.body = new Body();
    this.body.img = 'img/cloud.png';
    this.body.w = 70;
    this.body.h =  70;
    this.body._x = Math.random()*$('html').width()
    this.body._y = 100 + (Math.random()*$('html').height() - 100)
    this.body.draw();

    this.height = 1;


    setInterval(function(t){
        t.body.move(wind.wind, 0);
    },100, this);
};
