units = [];
units['foo'] = new Unit('foo');
console.log(units);



gameCycle = setInterval(
    function(){



        for (var key in units) {
            units[key].animate()
        };

    },100);


document.onkeydown = function (e) {

    // if (e.keyCode == 38)
    //     units['foo'].vy -= 1;
    // if (e.keyCode == 40)
    //     units['foo'].vy += 1;
    //
    // if (e.keyCode == 37)
    //     units['foo'].vx -= 1;
    // if (e.keyCode == 39)
    //     units['foo'].vx += 1;

    // if (e.keyCode == 38)
    //     units['foo'].v -= 1;
    // if (e.keyCode == 40)
    //     units['foo'].v += 1;
    //
    // if (e.keyCode == 37)
    //     units['foo'].a -= 15;
    // if (e.keyCode == 39)
    //     units['foo'].a += 15;
    console.log(e.keyCode);
    //гипердвигатель
    if (e.keyCode == 32)
        units['foo'].v -= 10;


    //моневр вперед
    if (e.keyCode == 87)
        units['foo'].v -= 1;
    //маневр назад
    if (e.keyCode == 83)
        units['foo'].v += 1;

    //маневровые смещение в сторону
    if (e.keyCode == 65)
        units['foo'].sv -= 0.5;
    if (e.keyCode == 68)
        units['foo'].sv += 0.5;

    //маневровые рысканье
    if (e.keyCode == 81)
        units['foo'].vr -= 3;
    if (e.keyCode == 69)
        units['foo'].vr += 3;

    $('.panel progress').val(units['foo'].fuel);

};


