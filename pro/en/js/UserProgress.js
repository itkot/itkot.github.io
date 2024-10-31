UserProgress = new function () {
    var dateKey = new Date().toJSON().slice(0, 10)

    var dailyScore = localStorage.getItem(dateKey)
    if (dailyScore === null)
        dailyScore = 0;

    var series = localStorage.getItem('series')
    if (series === null)
        series = 0;


    this.addPoint = function () {
        console.log('adding point')

        localStorage.setItem(dateKey, ++dailyScore)
        localStorage.setItem('series', ++series)

        document.querySelector('#progressBar').style.width=dailyScore*10+"%";
        var caption = document.querySelector('#progressScore')
        if (caption)
            caption.innerHTML = dailyScore;
    }

    this.fail = function () {
        series = 0
        localStorage.setItem('series', series)
    }


    document.querySelector('#progressBar').style.width=dailyScore*10+"%";

    var caption = document.querySelector('#progressScore b')
    if (caption)
        caption.innerHTML = dailyScore;

    return this
}