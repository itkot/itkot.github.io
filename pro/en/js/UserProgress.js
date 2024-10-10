UserProgress = new function () {
    var dateKey = new Date().toJSON().slice(0, 10)
    var dailyScore = localStorage.getItem(dateKey)
    if (dailyScore === null)
        dailyScore = 0;

    this.addPoint = function () {
        console.log('adding point')

        localStorage.setItem(dateKey, ++dailyScore)

        document.querySelector('#progressBar').style.width=dailyScore*10+"%";
    }

    console.log(dailyScore)

    document.querySelector('#progressBar').style.width=dailyScore*10+"%";

    return this
}
