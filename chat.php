<!DOCTYPE html>

<html lang="pl">
	<head>
		<meta charset="UTF-8">
		<title> chat </title>

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
		<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" integrity="sha256-7s5uDGW3AHqw6xtJmNNtr+OBRJUlgkNJEo78P4b0yRw= sha512-nNo+yCHEyn0smMxSswnf/OnX6/KwJuZTlNZBjauKhTK0c+zT+q5JOCx0UFhXQ6rJR9jg6Es8gPuD2uZcYDLqSw==" crossorigin="anonymous">
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha256-KXn5puMvxCw+dAYznun+drMdG1IFl3agK0p/pqT9KAo= sha512-2e8qq0ETcfWRI4HJBzQiA3UoyFk6tbNyG+qSaIBZLyW9Xf3sWZHN/lxe9fTh1U45DpPf07yj94KsUHHWe4Yk1A==" crossorigin="anonymous"></script>

		<link href="client/css/main.css" rel="stylesheet">


	</head>
	<body>

		<div class="container">
			<div class="row">
				<div class="col-sm-2"></div>

				<div class="col-sm-8">
					<div class="panel panel-primary">
						<div class="panel-heading">
							<h3 class="panel-title">
								Chat :
							</h3>
						</div>
						<div class="panel-body">
							<div id="chat-in">
								dxbgdfgndfgnfsn
							</div>
						</div>
						<div class="panel-footer">
							<input type="text" name="out" id="chat-out"> <input type="button" name="button" value="button"/>
						</div>
					</div>
				</div>
				<div class="col-sm-2"></div>
			</div>
		</div>

		<script src="client/js/config.js"></script>
		<script>
			if( ! document.cookie ){
				window.location = config.url.form.main;
			}
		</script>
		<script src="client/js/chat.js"></script>
		<script>
			new Chat();
		</script>
	</body>
</html>
