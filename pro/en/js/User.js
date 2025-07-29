User = new function () {
    this.isLogin = function () {
        if (localStorage.getItem('userName') != null)
            console.log('is login!')

        return localStorage.getItem('userName') != null;
    }
    this.login = function (login, pass) {
        const params = new URLSearchParams();
        params.append("user", login);
        params.append("password", pass);


        const loginPromice = new Promise((resolve, reject) => {
            var passCheck = async () =>
                await fetch(Config.get().userBackEnds[0] + `userPassCheck.php?${params}`)
                    .then((resp) => {
                        if (resp.status == 200)
                            localStorage.setItem('userName', login)

                        resolve(resp.status == 200);
                    });
            passCheck()
        });

        return loginPromice
    }
}