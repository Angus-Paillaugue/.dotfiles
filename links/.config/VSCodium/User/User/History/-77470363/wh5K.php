
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $title ?? 'My Website'; ?></title>
    <link rel="stylesheet" href="/output.css">
</head>
<body class="flex flex-col min-h-screen gap-4">
    <!-- Shared Navbar -->
    <nav class="flex flex-row gap-4 items-center px-4 py-2">
      <?php
        require_once '../lib/components.php';
        Components::Link(['href' => 'log-in.php', 'label' => 'Login']);
        Components::Link(['href' => 'sign-up.php', 'label' => 'Sign Up']);
        Components::Link(['href' => 'restricted.php', 'label' => 'Restricted']);
      ?>
    </nav>

    <!-- Main Content -->
    <main class="grow p-2">
        <?php echo $content; ?>
    </main>

    <!-- Optional Footer -->
    <footer class="max-w-screen-xl w-full mx-auto px-4 py-2 rounded-xl bg-neutral-900 mb-2">
      <p class="text-neutral-100 font-bold text-base">&copy; 2024 My Website</p>
    </footer>
</body>
</html>
