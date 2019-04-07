angular.module('TemperatureWatcher')
.component('authForm', {
    templateUrl: 'app/components/auth-form/template.html',
    controller: function($scope) {
    	this.signin = function() {
    		console.log("sign ined");
    	}
        console.log("form component started");
    },
	bindings: {
		ngSubmit: "&"
	}
});