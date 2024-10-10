$(document).ready(function () {
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

    // tests['quiz'] = function () {
    //     $.get('tests/quiz/main.html').done(function (data) {
    //         $('#test').html(data)
    //     })
    // }

    console.log(tests)



    function getRandomTest(tests){
        let keys = Object.keys(tests)
        let key = keys[Math.random()*keys.length << 0]

        console.log(key)
        return tests[key]
    }

    getRandomTest(tests)()
})