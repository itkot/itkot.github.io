Materials = new function() {
    var defaultProgressCallback = function () {}

    this.setProgressCallback = function(progressCallback){
        if (typeof progressCallback == 'function')
            defaultProgressCallback = progressCallback
    }

    this.getTOP10K = function (callBack, progressCallBack) {
        var words = localStorage.getItem('top10kDictionary')

        if (words !== null)
            callBack(JSON.parse(localStorage.getItem('top10kDictionary')))
        else
            asLW(progressCallBack, callBack)
            //loadWords(progressCallBack, callBack)
    }
//TODO унифицировать
    function asLW(progressCallback, finishCallBack){//TODO check the range of loading!
        var dictionary = {}
        var startTime = performance.now();
        var loadedParts = 0
        for (let i = 1; i <= 100; i++) {
            fetch('top10k/words/'+ i +'.json')
                .then((resp) =>
                    {
                        resp.json()
                            .then((jsonPart) => {
                                loadedParts++;
                                defaultProgressCallback(loadedParts)
                                dictionary = Object.assign(dictionary, jsonPart);

                                if (loadedParts == 100){
                                    localStorage.setItem('top10kDictionary', JSON.stringify(dictionary))

                                    console.log(performance.now() - startTime)
                                    finishCallBack(dictionary)
                                }
                            })
                    })
        }

        //2,3,2,2,2
    }

    async function loadWords(progressCallback, finishCallBack) {
        var startTime = performance.now();
        var dictionary = {}

        for (let i = 1; i <= 100; i++) {
            let part = await fetch('top10k/words/'+ i +'.json')
            part = await part.json()
            if (typeof progressCallback == 'function')
                progressCallback(i)
            defaultProgressCallback(i)

            // console.log('====')
            // console.log(part)
            // console.log(dictionary)
            //
            // if (i == 3) break;


            dictionary = Object.assign(dictionary, part);
        }

        localStorage.setItem('top10kDictionary', JSON.stringify(dictionary))

        console.log(performance.now() - startTime)
        finishCallBack(dictionary)

        //4,8,4,4,4
    }
}