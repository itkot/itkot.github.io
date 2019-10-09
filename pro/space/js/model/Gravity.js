Gravity = function () {
    var bodies = [];

    this.addBody = function(body){
        bodies.push(body);

    }

    this.tik = function() {
        for (var body in bodies) {
            for (var another in bodies) {
                a = bodies[body];
                b = bodies[another];

                if (a.name == b.name)
                    continue;

                r = Math.pDist(a, b);

                if (r < a.size * 2)
                    r = a.size * 2;

                r /= 10;

                f = (a.m * b.m) / (r * r);
                f *= 6.67 * 0.00000000001;

                if (f < 0.001)
                    continue;


                v = Math.vSetLength(Math.ppToV(a, b), f);

                b.addImpuls(v);
            }
        }
    }


};