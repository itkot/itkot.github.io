Config = new function () {
    async function loadConfig() {
        let url = "/pro/en/config.json"

        if (isLocal()) {
            url = "/pro/en/config.local.json"
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();

            localStorage.setItem('config', JSON.stringify(json))
        } catch (error) {
            console.error(error.message);
        }
    }

    loadConfig()

    function isLocal() {
        return window.location.protocol == 'http:'
    }

    this.get = function (field) {
        if (field)
            return JSON.parse(localStorage.getItem('config'))[field]
        else
            return JSON.parse(localStorage.getItem('config'))
    }

    this.rootPath = function(url = ''){
        return this.get('rootPath') + url
    }
}