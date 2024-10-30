Materials = new function() {
    this.getTOP10K = function (callBack, progressCallBack) {

        var words = localStorage.getItem('top10kDictionary')
        
        if (words !== null)
            callBack(JSON.parse(localStorage.getItem('top10kDictionary')))
        else
            loadWords(progressCallBack, callBack)
    }


    async function loadWords(progressCallback, finishCallBack) {
        var dictionary = {}

        for (let i = 1; i <= 100; i++) {
            let part = await fetch('top10k/words/'+ i +'.json')
            part = await part.json()
            if (typeof progressCallback == 'function')
                progressCallback(i)

            dictionary = Object.assign(dictionary, part);
        }

        localStorage.setItem('top10kDictionary', JSON.stringify(dictionary))
        finishCallBack(dictionary)
    }
}
