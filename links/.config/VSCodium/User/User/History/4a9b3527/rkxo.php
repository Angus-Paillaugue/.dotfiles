<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $firstName = $_POST['firstName'];
  $lastName = $_POST['lastName'];
  if (empty($firstName) || empty($lastName)) {
    echo "Please fill in all fields!";
  }

  
  echo "Hello, $firstName $lastName!";
}
?>
