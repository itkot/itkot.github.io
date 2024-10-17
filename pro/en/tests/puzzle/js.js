Puzzle = new function () {
    this.render = function (word, translate, level, top) {
        var utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';

        $('#spell').click(function () {
            speechSynthesis.speak(utterance);
        })

        $('#translate').html(translate)
        $('#correct-answer').html(word + ' - ' + translate)


        document.querySelector('#certificate b').innerHTML = level
        document.querySelector('#rating b').innerHTML = top + 'k'

        if (level)
            document.querySelector('#certificate').classList.remove("d-none");

        if (top)
            document.querySelector('#rating').classList.remove("d-none");

        template = $('#puzzle-template').html();

        word.split('').sort(() => Math.random() - 0.5).
            forEach(function (item, number) {
                $('#puzzles').append(template.replace('{content}', item).replace('{number}', number))
            })

        function unselect() {
            puzzle = $('#puzzles [number=' + $(this).attr('number') + ']').first()
            $(puzzle).removeClass('opacity-0')
            $(this).remove()
        }

        function select() {
            $('#answer')
                .append(
                    template
                        .replace('{content}', $(this).text())
                        .replace('{number}', $(this).attr('number'))
                )
            $(this).addClass('opacity-0')
            $('#answer > .puzzle').unbind('click').click(unselect)
        }

        $('#puzzles > .puzzle').click(select)

        $('#check').click(function () {
            $('#puzzles').addClass('d-none')
            
            speechSynthesis.speak(utterance);

            $('.next').removeClass('d-none').click(function () {
                window.location.reload(true);
            })

            $('#check').addClass('d-none')
            
            answer = $('#answer .btn').text()

            if (answer == word) {
                $('#success-screen').removeClass('d-none')
                UserProgress.addPoint()//TODO вытащить наружу
            } else {
                $('#fail-screen').removeClass('d-none')
            }
        })
    }
}