Couples = new function () {
    this.render = function(wordsTranslates) {
        console.log(wordsTranslates)

        template = $('#puzzle-template').html();

        words = Object.keys(wordsTranslates)
        translates = Object.values(wordsTranslates)
        translates = translates.sort(() => Math.random() - 0.5)

        words.forEach(function (item, n) {
            $('#words').append(template.replace('{content}', item).replace('{type}', 'word'))
            $('#translates').append(template.replace('{content}', translates[n]).replace('{type}', 'translate'))
        })


        showConditions = setTimeout(function () {
            $('#conditions-screen').removeClass('d-none')
        }, 3000)

        setTimeout(function () {
            $('#give-up-button').removeClass('d-none')
        }, 6000)

        function select() {
            clearTimeout(showConditions)
            $('#fail-screen').addClass('d-none')

            if ($(this).attr('type') == 'word'){
                var utterance = new SpeechSynthesisUtterance($(this).text());
                utterance.lang = 'en-US';

                speechSynthesis.speak(utterance);
            }

            if ($(this).hasClass('btn-success'))
                return;

            $('#couples .option[type="'+$(this).attr('type')+'"].btn-dark')
                .removeClass('btn-dark')
                .addClass('btn-outline-dark')

            $('#couples .option.btn-success').animate({opacity: 0}, 1000);

            $('#couples .option.btn-danger')
                .removeClass('btn-danger')
                .addClass('btn-outline-dark')

            $(this).removeClass('btn-outline-dark')
            $(this).addClass('btn-dark')

            word = $('#couples .option[type="word"].btn-dark').text()
            translate = $('#couples .option[type="translate"].btn-dark').text()

            if (word && translate) {
                if (wordsTranslates[word] == translate){
                    $('#couples .option.btn-dark')
                        .removeClass('btn-dark')
                        .addClass('btn-success')
                        .delay(1000)
                        .animate({opacity: 0}, 1000);

                    if ($('#couples .btn-outline-dark').length == 0)
                        window.location.reload(true)

                    UserProgress.addPoint()
                }else{
                    $('#fail-screen').removeClass('d-none')
                    $('#answer').text(word + ' - ' + wordsTranslates[word])

                    $('#couples .option.btn-dark')
                        .removeClass('btn-dark')
                        .addClass('btn-danger')
                }
            }
        }

        $('#couples .option').click(select)
        $('#try').click(function () {
            $('#fail-screen').addClass('d-none')

            $('#couples .option.btn-danger')
                .removeClass('btn-danger')
                .addClass('btn-outline-dark')
        })
    }
}