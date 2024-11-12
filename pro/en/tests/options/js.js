const Options = new function() {
    var self = this
    var template = localStorage.getItem('optionsTemplate')
    if (template == null)
        template = false

    var renderCalls = []

    var successCallBack = function () {}
    var failCallBack = function () {}
    var endCallBack = function () {}
    
    this.successAction = function (handler) {
        if (typeof handler === 'function')
            successCallBack = handler
    }

    this.failCallBack = function (handler) {
        if (typeof handler === 'function')
            failCallBack = handler
    }

    this.then = function (handler) {
        if (typeof handler === 'function')
            endCallBack = handler
    }



    var fetchTemplate = function () {
        fetch('tests/options/template.html')
            .then(function (responce) {
                return responce.text()
            })
            .then(function (page) {
                template = page
                localStorage.setItem('optionsTemplate', template);

                while (call = renderCalls.pop()){
                    self.render(call.word, call.translate, call.options, call.container)
                }
            })
    }

    if (window.navigator.onLine)
        fetchTemplate()

    addEventListener('online', fetchTemplate);


    this.render = function (word, translate, options, containerQuery) {
        container = document.querySelector(containerQuery)
        if (container === null){
            console.error('Element "' + containerQuery + '" not found')
            return
        }


        if (template == false)
            renderCalls.push({word: word,translate: translate, options: options, container: containerQuery})
        else {
            document.querySelector(containerQuery).innerHTML = template
            document
                .querySelector('#check')
                .addEventListener('click', function () {
                    document.querySelector('#check').classList.add('d-none')
                    var userAnswer =  document.querySelector('#options .btn-dark')
                    var actuallyAnswer = document.querySelector('.option.answer')
                    userAnswer.classList.remove('btn-dark')
                    actuallyAnswer.classList.remove('btn-outline-dark')

                    if (userAnswer.innerText == word) {
                        document.querySelector('#success-screen').classList.remove('d-none')
                        userAnswer.classList.add('btn-success')
                        successCallBack()
                    }else {
                        speechSynthesis.speak(optionsSpeakers[word])
                        document.querySelector('#fail-screen').classList.remove('d-none')
                        userAnswer.classList.add('btn-danger')
                        actuallyAnswer.classList.add('btn-success')
                        failCallBack()
                    }
                })


            document.querySelector('#translate').innerHTML = translate

            const optionTemplate = document.querySelector('#option-template').innerHTML


            var optionsSpeakers = []
            options.forEach(function (option) {
                var classes = '';
                if (option == word)
                    classes = 'answer'

                document.querySelector('#options').innerHTML += optionTemplate
                    .replace('{content}', option)
                    .replace('{classes}', classes)

                optionsSpeakers[option] = new SpeechSynthesisUtterance(option);
                optionsSpeakers[option].lang = 'en-US'


            })


            showConditions = setTimeout(function () {
                document.querySelector('#conditions-screen').classList.remove('d-none')
            }, 3000)


            document.querySelectorAll("#options .option")
                .forEach(element => element.addEventListener('click',
                    function (event) {
                        document.querySelectorAll("#options .option")
                            .forEach(function (element) {
                                element.classList.remove('btn-dark')
                                element.classList.add('btn-outline-dark')
                            })

                        document.querySelector('#check').classList.remove('d-none')
                        clearTimeout(showConditions)

                        speechSynthesis.speak(optionsSpeakers[event.target.innerText])

                        document.querySelector('#conditions-screen').classList.add('d-none')

                        event.target.classList.remove('btn-outline-dark')
                        event.target.classList.add('btn-dark')
                    }))


            document.querySelectorAll('button.next')
                .forEach(element => element.addEventListener('click', function () {
                    endCallBack()
                }))

        }

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