Couples = new function () {
    const self = this

    const $ = function(selector){
        result = document.querySelectorAll(selector)

        if (result.length === 0)
            return false

        if (result.length === 1)
            return result[0]

        return result
    }

    var template = localStorage.getItem('couplesTemplate')
    if (template == null)
        template = false

    var endCallBack = function () {}
    this.then = function (handler) {
        if (typeof handler === 'function')
            endCallBack = handler

        if ($('#finish'))
            $('#finish')
                .addEventListener('click', endCallBack)
    }

    var renderCalls = []
    var fetchTemplate = function () {
        fetch('tests/couples/template.html')
            .then(function (responce) {
                return responce.text()
            })
            .then(function (page) {
                template = page
                localStorage.setItem('couplesTemplate', template);

                while (call = renderCalls.pop()){
                    self.render(call.word , call.container)
                }
            })
    }
    if (window.navigator.onLine)
        fetchTemplate()

    addEventListener('online', fetchTemplate);


    var wordsSpeeches = []


    var successCallBack = function () {}
    this.successAction = function (handler) {
        if (typeof handler === 'function')
            successCallBack = handler
    }

    var failCallBack = () => {}
    this.failAction = (handler) => {
        if (typeof handler === 'function')
            failCallBack = handler
    }


    const cancelFail = function () {
        $('#fail-screen').classList.add('d-none')

        $('#couples .option.btn-danger').forEach((item) => {
            item.classList.remove('btn-danger')
            item.classList.add('btn-outline-dark')
        })
    }

    this.render = function(wordsTranslates, containerQuery) {
        container = $(containerQuery)
        if (container === null) {
            console.error('Element "' + containerQuery + '" not found')
            return
        }

        if (template == false) {
            renderCalls.push({wordsTranslates: wordsTranslates, container: containerQuery})
            return
        } else {
            $(containerQuery).innerHTML = template

            coupleTemplate = $('#couple-template').innerHTML;

            words = Object.keys(wordsTranslates)
            translates = Object.values(wordsTranslates)
            translates = translates.sort(() => Math.random() - 0.5)

            if (JSON.stringify(translates) == JSON.stringify(Object.values(wordsTranslates)))
                translates = translates.sort(() => Math.random() - 0.5)

            words.forEach((item, n) => {
                $('#words').innerHTML += coupleTemplate.replace('{content}', item).replace('{type}', 'word')
                $('#translates').innerHTML += coupleTemplate.replace('{content}', translates[n]).replace('{type}', 'translate')

                wordsSpeeches[item] = new SpeechSynthesisUtterance(item)
                wordsSpeeches[item].lang = 'en-US'
            })

            showConditions = setTimeout(function () {
                $('#conditions-screen').classList.remove('d-none')
            }, 3000)

            setTimeout(function () {
                $('#give-up-button').classList.remove('d-none')
                $('#give-up-button').addEventListener('click', endCallBack)
            }, 6000)
        }



        function select(event) {
            clearTimeout(showConditions)
            $('#fail-screen').classList.add('d-none')

            if (wordsSpeeches[this.innerHTML] !== undefined)
                speechSynthesis.speak(wordsSpeeches[this.innerHTML]);

            if (Object.values(this.classList).includes('btn-success'))
                return;

            oldOption = $('#couples .option[type="' + this.getAttribute('type') + '"].btn-dark')
            if (oldOption){
                oldOption.classList.remove('btn-dark')
                oldOption.classList.add('btn-outline-dark')
            }
            // $('#couples .option.btn-success').animate({opacity: 0}, 1000);

            if ($('#couples .option.btn-danger'))
                $('#couples .option.btn-danger').forEach((item) => {
                    item.classList.remove('btn-danger')
                    item.classList.add('btn-outline-dark')
                })



            this.classList.remove('btn-outline-dark')
            this.classList.add('btn-dark')

            word = $('#couples .option[type="word"].btn-dark').innerHTML
            translate = $('#couples .option[type="translate"].btn-dark').innerHTML

            if (word && translate) {
                if (wordsTranslates[word] == translate){
                    $('#couples .option.btn-dark').forEach((item) => {
                        item.classList.remove('btn-dark')
                        item.classList.add('btn-success')
                    })
                    //     // .delay(1000)
                        // .animate({opacity: 0}, 1000);


                    console.log()
                    if (!$('#couples .btn-outline-dark')) {
                        $('#success-screen').classList.remove('d-none')
                        $('#conditions-screen').classList.add('d-none')
                        $('#give-up-button').classList.add('d-none')
                    }

                    successCallBack()
                }else{
                    $('#fail-screen').classList.remove('d-none')
                    $('#answer').innerHTML = word + ' - ' + wordsTranslates[word]

                    $('#couples .option.btn-dark').forEach((item) => {
                        item.classList.remove('btn-dark')
                        item.classList.add('btn-danger')
                    })

                    failCallBack()
                }
            }
        }

        $('#couples .option').forEach((item) => {
            item.addEventListener('click', select)
        })


        $('#try').addEventListener('click', cancelFail)
    }
}