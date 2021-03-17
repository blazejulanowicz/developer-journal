define(function(require) {
    'use strict';

    const interceptor = require('rest/interceptor');

    return interceptor({
        request: function (request) {
            if(!request.params)
                return request;
            Object.keys(request.params).forEach((key) => {
                if(request.params[key] instanceof Array) {
                    if(request.params[key].length !== 0) {
                        let j = 0;
                        if(request.path.indexOf('?') === -1) {
                            request.path = request.path.concat('?'+key+'='+request.params[key][0]);
                            j = 1;
                        }
                        for(j; j < request.params[key].length; j++)
                            request.path = request.path.concat('&'+key+'='+request.params[key][j]);
                    }
                    delete request.params[key];
                }
            });
            return request;
        }
    })
});