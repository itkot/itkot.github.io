Wind = function(){
    this.wind = 0;

    setInterval(function(t){
        t.wind += Math.random()-0.5;
        //console.log(t.wind);
    },1000, this);



};