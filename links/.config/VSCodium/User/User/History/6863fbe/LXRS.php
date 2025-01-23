<?php

class Cookies
{
	public static function getCookie($name)
	{
		return $_COOKIE[$name] ?? null;
	}

	public static function setCookie($name, $value, $expires = 0)
	{
		setcookie($name, $value, [
			'expires' => $expires,
			'path' => '/',
			'samesite' => 'Strict',
			'httponly' => true,
			'secure' => true,
		]);
	}
}
?>
