Wind = function(){
    this.wind = 0;

    setInterval(function(t){
        t.wind += Math.random()-0.5;
        //console.log(t.wind);
    },1000, this);

    this.get = function(y, debug = false){//TODO reeds to receive already relative value
        if (y == 0)
            return 0

        const screenH = document.querySelector('html').offsetHeight//TODO needs to be moved to upward abstraction
        if (debug)
            console.log(y/screenH * 6)

        return Math.sin(y/screenH * 6)*2
    }


    // for (let i = 1; i < 11; i++) {
    //     console.log(Math.round(screenH*(i/10)))
    //     console.log(i/10*3.14, Math.sin(i/10*3.14))
    // }
};