testInit = function () {
    Materials.setProgressCallback(Loader.change)


    tests = []


    tests['options'] = function () {
        Materials.getTOP10K(function (words) {
            keys = Object.keys(words)
            keys.sort(() => Math.random() - 0.5)

            options = keys.slice(0, 4)
            word = options[0]
            translate = words[word].trs[words[word].trs.length * Math.random() << 0]
            options.sort(() => Math.random() - 0.5)


            Options.render(word, translate, options, '#test')
            Options.successAction(UserProgress.addPoint)
            Options.failCallBack(UserProgress.fail)
            Options.then(testInit)

            Options.addMarkTOP(words[word].rating)
            Options.addMarkLevel(words[word].cefr)
        })
    }




    tests['couples'] = function () {
        Materials.getTOP10K(function (words) {
            couples = {}

            for (let i = 0; i < 100; i++) {//NASA like loop
                keys = Object.keys(words)
                word = keys[Math.random()*keys.length << 0]

                translate = words[word].trs[words[word].trs.length * Math.random() << 0]

                if (word.length > 10||
                    translate.length > 10)
                    continue;

                couples[word] = translate

                if (Object.keys(couples).length >= 6)
                    break;
            }

            Couples.render(couples, '#test')
            Couples.then(testInit)
            Couples.successAction(UserProgress.addPoint)
            Couples.failAction(UserProgress.fail)
        })
    }

    tests['puzzle'] = function () {
        Materials.getTOP10K(function (words) {
            console.log(words)

            keys = Object.keys(words).filter(word => word.length < 16)
            word = keys[Math.random()*keys.length << 0]
            translate = words[word].trs[words[word].trs.length * Math.random() << 0]


            Puzzle.render(word, translate, '#test')
            Puzzle.then(testInit)
            Puzzle.successAction(UserProgress.addPoint)
            Puzzle.successAction(UserProgress.addPoint)
        })
    }

    function getRandomTest(tests){
        let keys = Object.keys(tests)
        let key = keys[Math.random()*keys.length << 0]

        return tests[key]
    }

    getRandomTest(tests)()
}


testInit()