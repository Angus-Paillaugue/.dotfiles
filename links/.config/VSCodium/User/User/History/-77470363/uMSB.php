
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $title ?? 'My Website'; ?></title>
    <link rel="stylesheet" href="/output.css">
</head>
<body>
    <!-- Shared Navbar -->
    <nav>
        <ul>
            <li><a href="log-in.php">Login</a></li>
            <li><a href="sign-up.php">Sign Up</a></li>
            <li><a href="restricted.php">Restricted</a></li>
        </ul>
    </nav>

    <!-- Main Content -->
    <main>
        <?php echo $content; ?>
    </main>

    <!-- Optional Footer -->
    <footer>
        <p>&copy; 2024 My Website</p>
    </footer>
</body>
</html>
