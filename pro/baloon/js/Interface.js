Interface = new function(user){
    this.fuelIsOverAction = function () {
        document.querySelector('.tapNotification').style.display = "none"
        document.querySelector('.noFuelNotification').style.display = "block"
    }

    document.querySelector('.noFuelNotification .button').onclick = function () {
        window.location.reload()
    }
};
