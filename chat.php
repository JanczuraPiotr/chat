<!DOCTYPE html>

<html lang="pl">
	<head>
		<meta charset="UTF-8">
		<title> chat </title>
	</head>
	<body>

		<div class="container">

			<div class="row">
				<div class="col-sm-2"></div>
				<div class="col-sm-8">
					<div class="panel panel-primary" id="chat">
						<div class="panel-heading">
							<h3 class="panel-title">
								<div class="row">
									<div class="col-sm-2 ">time</div>
									<div class="col-sm-2 ">nick</div>
									<div class="col-sm-8 ">post</div>
								</div>
							</h3>
						</div>
						<div class="panel-body" id="chatAll">
						</div>
						<div class="panel-footer">
							<div class="row">
								<!--<div class="col-sm-1"></div>-->

								<div class="col-sm-5">
									<input type="text" name="chatEdit" id="chatEdit">
								</div>
								<div class="col-sm-3">
									<input type="button" class="btn btn-default" name="btnSend" id="btnSend" value="wyślij" disabled/>
								</div>

								<div class="col-sm-1"></div>

								<div class="col-sm-2">
									<input type="button" class="btn btn-default" name="btnExit" id="btnExit" value="exit"/>
								</div>
						</div>
					</div>
				</div>
				<div class="col-sm-2"></div>
			</div>
		</div>


		<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" integrity="sha256-7s5uDGW3AHqw6xtJmNNtr+OBRJUlgkNJEo78P4b0yRw= sha512-nNo+yCHEyn0smMxSswnf/OnX6/KwJuZTlNZBjauKhTK0c+zT+q5JOCx0UFhXQ6rJR9jg6Es8gPuD2uZcYDLqSw==" crossorigin="anonymous">
		<link href="client/css/main.css" rel="stylesheet">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
		<script src="https://cdn.jsdelivr.net/jquery.cookie/1.4.1/jquery.cookie.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha256-KXn5puMvxCw+dAYznun+drMdG1IFl3agK0p/pqT9KAo= sha512-2e8qq0ETcfWRI4HJBzQiA3UoyFk6tbNyG+qSaIBZLyW9Xf3sWZHN/lxe9fTh1U45DpPf07yj94KsUHHWe4Yk1A==" crossorigin="anonymous"></script>

		<script src="client/js/config.js"></script>
		<script>
			if( ! $.cookie('logged') ){
				window.location.href = config.url.form.main;
			}else{

				console.log($.cookie());
				console.log($.cookie('logged'));
			}
		</script>
		<script src="client/js/chat.js"></script>
		<script>
			new Chat();
		</script>
	</body>
</html>
