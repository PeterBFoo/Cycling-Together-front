var utils = {
    getUrlParam: function (name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    },

    getUrlSearchParams: function () {
        let params = window.location.search
        return new URLSearchParams(params);
    },

    getParamNames: function (names) {
        let paramNames = [];
        let searchParams = this.getUrlSearchParams();

        names.forEach(name => {
            if (searchParams.get(name)) {
                paramNames.push(name);
            }
        });

        return paramNames;
    }
}