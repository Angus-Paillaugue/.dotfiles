
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
    <nav class="flex flex-row gap-4 items-center px-4 py-2">
      <?php
        // include '../lib/components.php';
        // Components::Link(['href' => 'log-in.php', 'text' => 'Login']);
        // Components::Link(['href' => 'sign-up.php', 'text' => 'Sign Up']);
        // Components::Link(['href' => 'restricted.php', 'text' => 'Restricted']);
      ?>
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
