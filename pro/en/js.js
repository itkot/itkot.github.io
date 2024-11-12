testInit = function () {
    Materials.setProgressCallback(Loader.change)


    tests = []

    tests['puzzle'] = function () {
        $.get('tests/puzzle/main.html').done(function (data) {
            $('#test').html(data)

            Materials.getTOP10K(function (words) {
                console.log(words)

                keys = Object.keys(words)
                word = keys[Math.random()*keys.length << 0]

                console.log(word)

                // if (word.length > 16)
                //     window.location.reload(true);

                translate = words[word].trs[words[word].trs.length * Math.random() << 0]

                Puzzle.render(word, translate, words[word].cefr, words[word].rating)
            })
        })
    }

    tests['couples'] = function () {
        $.get('tests/couples/main.html').done(function (data) {
            $('#test').html(data)

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

                Couples.render(couples)
            })
        })
    }

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
            Options.then(testInit)

            Options.addMarkTOP(words[word].rating)
            Options.addMarkLevel(words[word].cefr)
        })
    }

    // tests = []


    function getRandomTest(tests){
        let keys = Object.keys(tests)
        let key = keys[Math.random()*keys.length << 0]

        return tests[key]
    }

    getRandomTest(tests)()
}


testInit()