<?php
if(!isset($_SESSION)){
  session_start();
}

/**
 * Class ErrorHandling
 *
 * This class provides static methods to handle error messages using PHP sessions.
 */
class ErrorHandling {
    /**
     * Sets an error message in the session.
     *
     * @param string $message The error message to be set.
     */
    public static function setError($message) {
        // Implementation here
    }

    /**
     * Retrieves and clears the error message from the session.
     *
     * @return string|null The error message if set, or null if no error message is found.
     */
    public static function getError() {
        // Implementation here
    }
}
            return $error;
        }
        return null;
    }
}
?>
