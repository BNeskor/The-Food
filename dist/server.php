<?php
$_POST = json_decode(file_get_contents("php://unput"),true);
echo var_dump($_POST);