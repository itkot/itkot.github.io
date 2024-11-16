UserProgress = new function () {
    const scoreStep = 4.5
    const dateKey = new Date().toJSON().slice(0, 10)

    var dailyScore = localStorage.getItem(dateKey)
    if (dailyScore === null)
        dailyScore = 0

    var series = localStorage.getItem('series')
    if (series === null)
        series = 0

    const level = () => {

        console.log(Math.log2(1 + series*(2/scoreStep)))
        return Math.floor(Math.log2(1 + series*(2/scoreStep)))
    }
    const levelProgress = () => {
        return 100*(Math.log2(1 + series*(2/scoreStep))%1)
    }


    this.addPoint = function () {
        console.log('adding point')

        localStorage.setItem('series', ++series)

        dailyScore = parseInt(dailyScore) + level()
        localStorage.setItem(dateKey, dailyScore)

        render()
    }

    this.fail = function () {
        series = 0
        localStorage.setItem('series', series)
        render()
    }


    const render = () => {
        document.querySelector('#progressBar')
            .style.width = levelProgress() + "%";

        if (level() > 1) {
            document.querySelector('#seriesBadge').classList.remove('d-none')
            document.querySelector('#seriesBadge b').innerHTML = 'X' + level()
        }else
            document.querySelector('#seriesBadge').classList.add('d-none')


        var caption = document.querySelector('#progressScore b')
        if (caption)
            caption.innerHTML = dailyScore;
    }

    render()
    return this
}