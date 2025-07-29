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
        for (let i = 1; i <= 9; i++) {
            fetch('top10k/wordsByThousands/'+ i +'.json')
                .then((resp) =>
                    {
                        resp.json()
                            .then((jsonPart) => {
                                loadedParts++;
                                defaultProgressCallback(loadedParts/9 * 100)
                                dictionary = Object.assign(dictionary, jsonPart);

                                if (loadedParts == 9){
                                    localStorage.setItem('top10kDictionary', JSON.stringify(dictionary))

                                    console.log(performance.now() - startTime)
                                    finishCallBack(dictionary)
                                }
                            })
                    })
        }

    }


}