<?php
session_start();
include '../loader.php';
include '../Config.php';

if(count($_SESSION)){
	echo json_encode($_SESSION);
}else{
	echo json_encode([]);
}

//print_r($_SESSION);