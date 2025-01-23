<?php
if(!isset($_SESSION)){
  session_start();
}

class ErrorHandling {
    public static function setError($message) {
        $_SESSION['error'] = $message;
    }

    public static function getError() {
        if (isset($_SESSION['error'])) {
            $error = $_SESSION['error'];
            unset($_SESSION['error']); // Clear error after retrieving
            return $error;
        }
        return null;
    }
}
?>
