UserProgress = new function () {
    const scoreStep = 2

    var dateKey = new Date().toJSON().slice(0, 10)

    var dailyScore = localStorage.getItem(dateKey)
    if (dailyScore === null)
        dailyScore = 0;

    var series = localStorage.getItem('series')
    if (series === null)
        series = 1;


    this.addPoint = function () {
        console.log('adding point')
        console.log('series - ' + series)
        console.log('rate - ' + Math.log2(series))

        localStorage.setItem('series', ++series)

        dailyScore = Math.floor(Math.log2(series)) + parseInt(dailyScore)
        localStorage.setItem(dateKey, dailyScore)

        render()
    }

    this.fail = function () {
        series = 1
        localStorage.setItem('series', series)
        console.log('fail action')
        render()
    }


    const render = () => {
        document.querySelector('#progressBar')
            .style.width = 100*(Math.log2(series)%1) + "%";


        if (Math.floor(Math.floor(Math.log2(series))) > 1) {
            document.querySelector('#seriesBadge').classList.remove('d-none')
            document.querySelector('#seriesBadge b').innerHTML = 'X' + Math.floor(Math.log2(series))
        }else
            document.querySelector('#seriesBadge').classList.add('d-none')


        var caption = document.querySelector('#progressScore b')
        if (caption)
            caption.innerHTML = dailyScore;
    }

    render()
    return this
}