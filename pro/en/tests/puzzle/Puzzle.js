Puzzle = new function () {
    var $ = function(selector){
        return document.querySelectorAll(selector)
    }

    var template = localStorage.getItem('puzzleTemplate')
    if (template == null)
        template = false

    var renderCalls = []


    var endCallBack = function () {}
    this.then = function (handler) {
        if (typeof handler === 'function')
            endCallBack = handler
    }

    var successCallBack = function () {}
    this.successAction = function (handler) {
        if (typeof handler === 'function')
            successCallBack = handler
    }

    this.failCallBack = function (handler) {
        if (typeof handler === 'function')
            failCallBack = handler
    }


    var fetchTemplate = function () {
        fetch('tests/puzzle/template.html')
            .then(function (responce) {
                return responce.text()
            })
            .then(function (page) {
                template = page
                localStorage.setItem('puzzleTemplate', template);

                while (call = renderCalls.pop()){
                    self.render(call.word , call.container)
                }
            })
    }

    if (window.navigator.onLine)
        fetchTemplate()

    addEventListener('online', fetchTemplate);

    this.render = function (word, translate, containerQuery) {
        container = $(containerQuery)
        if (container === null){
            console.error('Element "' + containerQuery + '" not found')
            return
        }

        var utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';

        if (template == false) {
            renderCalls.push({word: word, translate: translate, options: options, container: containerQuery})
            return
        }else
            $(containerQuery)[0].innerHTML = template

        $('#translate')[0].innerHTML = translate

        $('#spell')[0].addEventListener('click', function () {
            speechSynthesis.speak(utterance);
        })

        puzzleTemplate = $('#puzzle-template')[0].innerHTML;

        word.split('').sort(() => Math.random() - 0.5).
            forEach(function (item, number) {
                $('#puzzles')[0].innerHTML += puzzleTemplate.replace('{content}', item).replace('{number}', number)
            })

        function unselect() {
            element = event.target

            if (element.getAttribute('number') == null)
                element = element.parentElement

            puzzle = $('#puzzles button[number="' + element.getAttribute('number') + '"]')[0]

            puzzle.classList.remove('opacity-0')
            element.remove()
        }

        function select(event) {
            element = event.target

            if (element.getAttribute('number') == null)
                element = element.parentElement

            $('#answer')[0].innerHTML += puzzleTemplate
                .replace('{content}', element.innerText)
                .replace('{number}', element.getAttribute('number'))

            element.classList.add('opacity-0')

            $('#answer > .puzzle')
                .forEach(function (element) {
                    element.addEventListener('click',unselect)
            })
        }

        $('#puzzles > .puzzle').forEach(function (a) {
            a.addEventListener('click', select)
        })


        $('#check')[0].addEventListener('click', function () {
            $('#puzzles')[0].classList.add('d-none')

            speechSynthesis.speak(utterance);

            $('.next').forEach(function (item) {
                item.addEventListener('click', endCallBack)
            })

            $('#check')[0].classList.add('d-none')

            answer = ''
            $('#answer button').forEach(function (e) {
                answer += e.innerText
            })

            if (answer == word) {
                $('#success-screen')[0].classList.remove('d-none')
                successCallBack()
            } else{
                $('#correct-answer')[0].innerHTML = word + ' - ' + translate
                $('#fail-screen')[0].classList.remove('d-none')
            }

        })
    }

    this.addMarkTOP = function(top){
        if (top == undefined)
            return

        element = document.querySelector('#rating b')
        if (element)
            element.innerHTML = top + 'k'
        else return

        document.querySelector('#rating').classList.remove("d-none")
    }
    this.addMarkLevel = function(level){
        if (level == undefined)
            return

        element = document.querySelector('#certificate b')

        if (element)
            element.innerHTML = level
        else return
        document.querySelector('#certificate').classList.remove("d-none")
    }
}