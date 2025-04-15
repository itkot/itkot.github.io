Cloud = function(){
    self = this
    this.body = new Body();
    var body = this.body
    this.body.img = 'img/cloud.png';
    this.body.w = 70;
    this.body.h =  70;
    this.body._x = Math.random()*$('html').width()
    this.body._y = 100 + (Math.random()*$('html').height() - 100)
    this.body.draw();

    this.height = 1;


    var interval = setInterval(function(t){
        t.body.move(wind.get(t.body._y), 0);
    },100, this);

    console.log(interval)

    this.remove = function(){
        clearInterval(interval)
        body.body.remove()
        delete body
    }
};
