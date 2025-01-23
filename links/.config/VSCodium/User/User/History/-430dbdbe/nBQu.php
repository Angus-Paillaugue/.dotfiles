<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="POST">
    <input type="text" name="firstName">
    <input type="text" name="lastName">
    <input type="submit" value="Submit">
  </form>

  <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
      $firstName = $_POST["firstName"];
      $email = $_POST["email"];
      $lastName = $_POST["lastName"];
      if (empty($firstName) || empty($lastName)) {
        echo "First name and last name are required";
      } else {
        echo "First name: $firstName, Last name: $lastName";
      }
    }
  ?>
</body>
</html>
