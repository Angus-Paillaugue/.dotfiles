<?php

/**
 * Class Cookies
 *
 * A utility class for handling HTTP cookies.
 */
class Cookies
{
	/**
	 * Retrieves the value of a cookie by its name.
	 *
	 * @param string $name The name of the cookie.
	 * @return mixed|null The value of the cookie, or null if the cookie does not exist.
	 */
	public static function getCookie($name)
	{
		return $_COOKIE[$name] ?? null;
	}

	/**
	 * Sets a cookie with the specified name, value, and expiration time.
	 *
	 * @param string $name The name of the cookie.
	 * @param string $value The value of the cookie.
	 * @param int $expires The expiration time of the cookie as a Unix timestamp. Defaults to 0 (session cookie).
	 * @return void
	 */
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
