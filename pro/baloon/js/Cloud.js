Cloud = function(user){
    this.body = new Body();
    this.body.img = 'img/cloud.png';
    this.body.w = 70;
    this.body.h =  70;
    this.body._x = (Math.random()*2 - 1)*$('html').width()
    this.body._y = 50 + Math.random()*($('html').height() - 200)

    this.body.draw();

    this.height = 1;


    var interval = setInterval(function(t){
        t.body.move(wind.get(t.body._y), 0);
        // console.log(Math.round(user.body._x))


        var maxDX = $('html').width()
        if (Math.abs(Math.round(user.body._x - t.body._x)) > maxDX)
            t.body._x = user.body._x + (Math.round(Math.random()) * 2 - 1)*maxDX


    },100, this);


    this.remove = function(){
        clearInterval(interval)
    }
};
