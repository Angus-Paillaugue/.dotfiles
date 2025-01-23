<?php
require_once __DIR__ . '/../lib/jwt.php';
require_once __DIR__ . '/../lib/cookies.php';

$jwt = Cookies::getCookie('token');

if ($jwt) {
  $payload = JWT::validateJWT($jwt);
  if ($payload) {
    header('Location: /vue/dashbaord', true, 303);
  } else {
    header('Location: /vue/log-in.php', true, 303);
  }
} else {
  header('Location: /vue/log-in.php', true, 303);
}
?>
