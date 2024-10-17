//TODO Заменить кнопку check на подсказку если ответ не выбран
Quiz = new function () {
    this.render = function(words, translate, answer) {
        $('#translate').html(translate)

        template = $('#puzzle-template').html();

        words.forEach(function (item) {
            $('#puzzles').append(template.replace('{content}', item))
        })

        showConditions = setTimeout(function () {
            $('#conditions-screen').removeClass('d-none')
        }, 3000)

        function select() {
            var utterance = new SpeechSynthesisUtterance($(this).text());
            utterance.lang = 'en-US';

            speechSynthesis.speak(utterance);
            $('#puzzles .puzzle')
                .removeClass('btn-dark')
                .removeClass('btn-outline-dark')
                .addClass('btn-outline-dark')

            $(this).removeClass('btn-outline-dark')
            $(this).addClass('btn-dark')
            $('#check').removeClass('d-none')
            $('#conditions-screen').addClass('d-none')

            clearTimeout(showConditions)
        }

        $('#puzzles .puzzle').click(select)

        $('#check').click(function () {
            result = $('#puzzles .puzzle.btn-dark').html()

            if (result == answer) {
                $('#success-screen').removeClass('d-none')
                $('#puzzles .puzzle.btn-dark').first().removeClass('btn-dark').addClass('btn-success')
                UserProgress.addPoint()
            } else {
                $('#fail-screen').removeClass('d-none')
                $('#puzzles .puzzle.btn-dark').first().removeClass('btn-dark').addClass('btn-danger')
                $('#puzzles .puzzle').each(function (id, item) {
                    if ($(item).text() == answer) {
                        $(item).removeClass('btn-outline-dark').addClass('btn-success')
                        var utterance = new SpeechSynthesisUtterance(answer);
                        utterance.lang = 'en-US';
                        speechSynthesis.speak(utterance);
                    }
                })
            }

            $('.next').removeClass('d-none').click(function () {
                window.location.reload(true);
            })

            $('#check').addClass('d-none')
        })
    }    
}