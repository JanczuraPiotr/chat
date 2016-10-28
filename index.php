<!DOCTYPE html>
<html ng-app="app">
    <head>
			<meta charset="UTF-8">
			<title> chat </title>

			<link href="client/css/main.css" rel="stylesheet">

			<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
			<script src="https://cdn.jsdelivr.net/jquery.cookie/1.4.1/jquery.cookie.min.js"></script>
			<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" integrity="sha256-7s5uDGW3AHqw6xtJmNNtr+OBRJUlgkNJEo78P4b0yRw= sha512-nNo+yCHEyn0smMxSswnf/OnX6/KwJuZTlNZBjauKhTK0c+zT+q5JOCx0UFhXQ6rJR9jg6Es8gPuD2uZcYDLqSw==" crossorigin="anonymous">
			<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha256-KXn5puMvxCw+dAYznun+drMdG1IFl3agK0p/pqT9KAo= sha512-2e8qq0ETcfWRI4HJBzQiA3UoyFk6tbNyG+qSaIBZLyW9Xf3sWZHN/lxe9fTh1U45DpPf07yj94KsUHHWe4Yk1A==" crossorigin="anonymous"></script>

			<script src="https://code.angularjs.org/1.5.8/angular.min.js" type="text/javascript"></script>
			<script src="https://code.angularjs.org/1.5.8/angular-route.min.js" type="text/javascript"></script>

			<!--<script src="client/app/config.js" type="text/javascript"></script>-->
			<script src="client/app/app.js" type="text/javascript"></script>
			<script src="client/app/routing.js" type="text/javascript"></script>
			<script src="client/app/controllers/main.controller.js"> </script>
			<script src="client/app/controllers/login.controller.js"> </script>
			<script src="client/app/controllers/register.controller.js"> </script>
			<script src="client/app/services/session.service.js"> </script>

    </head>
  <body>
  <!--<body ng-controller="MainController as mainController">-->

		<header class="row bg-info">
			<div class="col-sm-5"></div>
			<div class="col-sm-2">
				header
			</div>
			<div class="col-sm-5"></div>
		</header>

		</div>

		<div ng-view>

		</div>


		<footer class="row bg-info">
			<div class="col-sm-5"></div>
			<div class="col-sm-2">
				footer
			</div>
			<div class="col-sm-5"></div>

		</footer>

		<div class="container">
			<hr>
			Usunąć : div.container
			<div class="row">
				<div class="col-sm-3"></div>
				<div class="col-sm-6">
					<form class="form-horizontal" id="formLogin">
						<div class="panel panel-primary">

							<div class="panel-heading">
								<h3 class="panel-title">
									logowanie
								</h3>
							</div>

							<div class="panel-body">

								<div class="form-group">
									<label for="inputNick" class="col-sm-4 control-label">nick</label>
									<div class="col-sm-6">
										<input type="nick" class="form-control" id="inputNick" placeholder="nick">
									</div>
								</div>

								<div class="form-group">
									<label for="inputPassword" class="col-sm-4 control-label">password</label>
									<div class="col-sm-6">
										<input type="password" class="form-control" id="inputPassword" placeholder="password">
									</div>
								</div>

							</div><!-- panel-body -->

							<div class="panel-footer">
								<div class="row">
									<div class="col-sm-2"></div>
									<div class="col-sm-3">
										<input type="button" name="button" class="btn btn-default" id="btnLogin" value="logowanie"/>
									</div>
									<div class="col-sm-2"></div>
									<div class="col-sm-3">
										<input type="button" name="rejestracja" class="btn btn-default" id="btnGotoRejestracja" value="rejestracja"/>
									</div>
									<div class="col-sm-2"></div>
								</div>

							</div> <!-- panel-footer -->


							<div class="col-sm-2"></div>
						</div>
					</form>
				</div>
			</div>
		</div>


		<script src="client/js/config.js"></script>

		<script>
//		 if( $.cookie('logged') ){
//				window.location.href = config.url.form.chat
//			}
		</script>
		<script src="client/js/index.js"></script>

		<script>
			new Index();
		</script>


	</body>
</html>