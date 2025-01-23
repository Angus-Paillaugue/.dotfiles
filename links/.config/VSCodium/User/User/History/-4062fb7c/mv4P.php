<?php
require_once dirname(__DIR__) .'app/lib/cookies.php';
Cookies::deleteCookie('token');
header('Location: log-in.php', true, 303);
?>
