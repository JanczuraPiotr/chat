<!DOCTYPE html>
  <html>
    <head>
			<meta charset="UTF-8">
			<title> chat </title>

			<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
			<script src="https://cdn.jsdelivr.net/jquery.cookie/1.4.1/jquery.cookie.min.js"></script>
			<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" integrity="sha256-7s5uDGW3AHqw6xtJmNNtr+OBRJUlgkNJEo78P4b0yRw= sha512-nNo+yCHEyn0smMxSswnf/OnX6/KwJuZTlNZBjauKhTK0c+zT+q5JOCx0UFhXQ6rJR9jg6Es8gPuD2uZcYDLqSw==" crossorigin="anonymous">
			<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha256-KXn5puMvxCw+dAYznun+drMdG1IFl3agK0p/pqT9KAo= sha512-2e8qq0ETcfWRI4HJBzQiA3UoyFk6tbNyG+qSaIBZLyW9Xf3sWZHN/lxe9fTh1U45DpPf07yj94KsUHHWe4Yk1A==" crossorigin="anonymous"></script>

			<link href="client/css/main.css" rel="stylesheet">

    </head>
  <body>

		<div class="container">
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

		<script src="client/js/config.js"></script>
		<script>

		 if( $.cookie('logged') ){
				window.location.href = config.url.form.chat
			}
		</script>
		<script src="client/js/index.js"></script>
		<script>
			new Index();
		</script>
	</body>
</html>