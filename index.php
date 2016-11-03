<!DOCTYPE html>
<html ng-app="app">
    <head>
			<meta charset="UTF-8">
			<title> chat </title>

			<link href="client/css/main.css" rel="stylesheet">

			<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.1/angular-material.min.css">

			<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
			<script src="https://cdn.jsdelivr.net/jquery.cookie/1.4.1/jquery.cookie.min.js"></script>
			<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" integrity="sha256-7s5uDGW3AHqw6xtJmNNtr+OBRJUlgkNJEo78P4b0yRw= sha512-nNo+yCHEyn0smMxSswnf/OnX6/KwJuZTlNZBjauKhTK0c+zT+q5JOCx0UFhXQ6rJR9jg6Es8gPuD2uZcYDLqSw==" crossorigin="anonymous">
			<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha256-KXn5puMvxCw+dAYznun+drMdG1IFl3agK0p/pqT9KAo= sha512-2e8qq0ETcfWRI4HJBzQiA3UoyFk6tbNyG+qSaIBZLyW9Xf3sWZHN/lxe9fTh1U45DpPf07yj94KsUHHWe4Yk1A==" crossorigin="anonymous"></script>

			<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js" type="text/javascript"></script>
			<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-route.min.js" type="text/javascript"></script>
			<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-cookies.js" type="text/javascript"></script>
			<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-animate.min.js"></script>
			<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-aria.min.js"></script>
			<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-messages.min.js"></script>

			<script src="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.1/angular-material.min.js"></script>

			<script src="client/js/config.js"></script>
			<script src="client/app/config.js"></script>
			<script src="client/app/app.js"></script>
			<script src="client/app/routing.js"></script>
			<script src="client/app/controllers/main.controller.js"> </script>
			<script src="client/app/controllers/login.controller.js"> </script>
			<script src="client/app/controllers/register.controller.js"> </script>
			<script src="client/app/controllers/chat.controller.js"> </script>
			<script src="client/app/services/session.service.js"> </script>
			<script src="client/app/services/authentication.service.js"> </script>
    </head>
  <body>

		<header class="row bg-info">
			<div class="col-xs-2 col-xs-offset-5 col-sm-2 col-sm-offset-5 col-md-2 col-offset-5">
				header
			</div>
		</header>

		</div>

		<div ng-view>

		</div>


		<footer class="row bg-info">
			<div class="col-xs-2 col-xs-offset-5 col-sm-2 col-sm-offset-5 col-md-2 col-offset-5">
				footer
			</div>

		</footer>
	</body>
</html>