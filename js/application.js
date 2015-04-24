
$(document).ready(function() {

	// authenRedirect();

	function authenRedirect() {
		authenticated(function(response){
			if (response.authenticated) {	
				window.location.replace("../map.html");
				console.log(res);
			}
		});
	};

	$('#login').click(function (event){
		event.preventDefault();
		signIn(function(){			
			authenRedirect();	
		});

	});
		
		function signIn(callback) {
			var request = {
				type: 'POST',
				url: 'http://localhost:3000/sessions',
				data: {
					user: {
						username: $('#signin-username').val(),
						password: $('#signin-password').val()
					}
				},
				dataType: 'json',
				xhrFields: {
					withCredentials: true
				},
				success: function (response) {
					console.log(response);
					return callback();
				}
			};
			$.ajax(request);
		}

	$('#sign-up-button').click(function (event){
		event.preventDefault();

		$.ajax({
			type: 'POST',
			url: 'http://localhost:3000/users',
			crossDomain: true,
			data: {
				user: {
					username: $('#username-signup').val(),
					email: $('#email-signup').val(),
					password: $('#password-signup').val()
				}
			},
			dataType: 'json',
			xhrFields: {
				withCredentials: true
			},
			success: function (response) {
				console.log(response);
			}
		});
	})

function authenticated(callback) {
	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/authenticated',
		dataType: 'json',
		xhrFields: {
					withCredentials: true
				},
		success: function(response) {
			console.log(response);
			return callback(response);
		}
	})
}

});