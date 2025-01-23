
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contacts</title>
  <link rel="stylesheet" href="/school/output.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
  <script src="https://rawcdn.githack.com/nextapps-de/flexsearch/0.7.31/dist/flexsearch.bundle.js"></script>
</head>
<body>

  <?php
  require '../controleur/ObtenirTousLesContacts.php';

  $error = null;

  $conn = sql_connector::getInstance('section4', 'localhost', 'school', "\$iutinfo");
  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $prenom = $_POST['prenom'];
    $nom = $_POST['nom'];
    $adresse = $_POST['adresse'];
    $code_postal = $_POST['code_postal'];
    $ville = $_POST['ville'];
    $telephone = $_POST['telephone'];

    if (
      empty($prenom) ||
      empty($nom) ||
      empty($adresse) ||
      empty($code_postal) ||
      empty($ville) ||
      empty($telephone)
    ) {
      $error = 'Tous les champs sont obligatoires';
    } else {
      $prenom = htmlspecialchars($prenom);
      $nom = htmlspecialchars($nom);
      $adresse = htmlspecialchars($adresse);
      $code_postal = htmlspecialchars($code_postal);
      $ville = htmlspecialchars($ville);
      $telephone = htmlspecialchars($telephone);

      $exists = $conn->run_query(
        'SELECT * FROM contact WHERE nom = ? AND prenom = ?',
        $nom,
        $prenom
      );
      if (count($exists) > 0) {
        $error = 'Ce contact existe déjà';
      } else {
        $res = $conn->run_query(
          'INSERT INTO contact (nom, prenom, adresse, code_postal, ville, telephone) VALUES (?, ?, ?, ?, ?, ?);',
          $nom,
          $prenom,
          $adresse,
          $code_postal,
          $ville,
          $telephone
        );
        header('Location: index.php?formSubmitted=true');
      }
    }
  }
  ?>

  <div class="fixed inset-0 bg-black/50 p-2 transition-opacity flex flex-col items-center justify-center" id="modal" style="z-index:<?php echo $error
    ? '10'
    : '-10'; ?>; opacity:<?php echo $error ? '1' : '0'; ?>;">
    <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']) .
      '?' .
      http_build_query(
        $_GET
      ); ?>" method="POST" class="p-4 border mb-8 grid grid-cols-2 gap-6 rounded-xl relative max-w-screen-md bg-white">
      <button class="button absolute top-2 right-2 size-8" variant="ghost square" type="button" id="close-modal">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-6"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
      <h1 class="col-span-2 mb-4">Ajouter un contact</h1>
      <div class="flex flex-col">
        <label for="prenom">Prénom</label>
        <input type="text" name="prenom" placeholder="Votre prenom">
      </div>
      <div class="flex flex-col">
        <label for="nom">Nom</label>
        <input type="text" name="nom" placeholder="Votre nom">
      </div>
      <div class="flex flex-col">
        <label for="adresse">Adresse</label>
        <input type="text" name="adresse" placeholder="Votre adresse">
      </div>
      <div class="flex flex-col">
        <label for="code_postal">Code postal</label>
        <input type="text" name="code_postal" placeholder="Votre code postal">
      </div>
      <div class="flex flex-col">
        <label for="ville">Ville</label>
        <input type="text" name="ville" placeholder="Votre ville">
      </div>
      <div class="flex flex-col">
        <label for="telephone">N° tel</label>
        <input type="text" name="telephone" placeholder="Votre n° de téléphone">
      </div>
      <button type="submit" variant="primary" class="button col-span-2">Ajouter</button>
      <?php if ($error) {
        echo "<div class='alert col-span-2' role='alert'>$error</div>";
      } ?>
    </form>
  </div>
  <div class="max-w-screen-lg mx-auto w-full p-4">
    <div class="border p-4 rounded-xl">
      <div class='flex flex-row justify-between w-full mb-4'>
        <h1 class='m-0'>Contact</h1>
        <button type='button' variant='primary square' class='button p-2 rounded-full' id='open-modal'>
          <svg xmlns='http://www.w3.org/2000/svg' class='size-10 text-white' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M5 12h14'/><path d='M12 5v14'/></svg>
        </button>
      </div>
      <div class='flex flex-col mb-4'>
        <label for='search'>Rechercher</label>
        <input type='text' name='search' id='search' placeholder='Par nom ou prénom'>
      </div>
      <table class='table-auto border-collapse text-sm w-full rounded border m-0'>
        <thead>
          <tr>
            <th class='py-0.5 px-2'>Nom</th
            ><th class='py-0.5 px-2'>Prénom</th>
            <th class='py-0.5 px-2'>Adresse</th>
            <th class='py-0.5 px-2'>Code postal</th>
            <th class='py-0.5 px-2'>Ville</th>
            <th class='py-0.5 px-2'>Téléphone</th>
            <th class='py-0.5 px-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          <?php
          $data = ObtenirTousLesContacts::exec();
          foreach ($data as $row) {
            echo "
                <tr class='border-y odd:bg-neutral-100'>
                  <td class='py-0.5 px-2'>" .
              $row.getNom() .
              "</td>
                  <td class='py-0.5 px-2'>" .
              $row['prenom'] .
              "</td>
                  <td class='py-0.5 px-2'>" .
              $row['adresse'] .
              "</td>
                  <td class='py-0.5 px-2'>" .
              $row['code_postal'] .
              "</td>
                  <td class='py-0.5 px-2'>" .
              $row['ville'] .
              "</td>
                  <td class='py-0.5 px-2'>" .
              $row['telephone'] .
              "</td>
                  <td class='py-0.5 px-2'>
                    <button class='button p-1 rounded-full relative group'>
                      <svg xmlns='http://www.w3.org/2000/svg' class='size-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='1'/><circle cx='12' cy='5' r='1'/><circle cx='12' cy='19' r='1'/></svg>
                      <div class='absolute top-full -mt-1 -z-10 bg-white opacity-0 group-hover:opacity-100 hover:opacity-100 hover:z-10 group-hover:z-10 right-0 transition-opacity flex flex-col w-fit rounded-xl overflow-hidden border shadow-sm'>
                        <a href='edit.php?id=" .
              $row['id'] .
              "' class='px-4 py-2 no-underline transition-colors hover:bg-neutral-100'>Modifier</a>
                        <a href='delete.php?id=" .
              $row['id'] .
              "' class='px-4 py-2 no-underline transition-colors hover:bg-neutral-100'>Supprimer</a>
                      </div>
                    </button>
                  </td>
                </tr>
              ";
          }
          ?>
        </tbody>
      </table>
    </div>
  </div>

  <script>
    const pagesIndex = new FlexSearch.Index({ tokenize: 'forward' });
    const modal = document.querySelector('#modal');
    const openModal = document.querySelector('#open-modal');
    const closeModal = document.querySelector('#close-modal');
    const modalOpenOnLoad = new URLSearchParams(window.location.search).get('formSubmitted');

    if(modalOpenOnLoad) {
      modal.style.opacity = '1';
      modal.style.zIndex = '10';
    }

    openModal.addEventListener('click', () => {
      modal.style.opacity = '1';
      modal.style.zIndex = '10';
    });
    modal.addEventListener('click', (e) => {
      if(e.target === modal) {
        modal.style.opacity = '0';
        modal.style.zIndex = '-10';
      }
    });
    closeModal.addEventListener('click', () => {
      modal.style.opacity = '0';
      modal.style.zIndex = '-10';
    });

    document.querySelectorAll('tbody > tr').forEach((row, i) => {
      const nom = row.children[0].textContent;
      const prenom = row.children[1].textContent;
      // index the title and content together
      const item = `${nom} ${prenom }`;
      // add the item to the index 👍️
      pagesIndex.add(i, item);
    });

    function searchPagesIndex(searchTerm) {
      // escape special regex characters
      const match = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // return matching page indexes 💪
      const results = pagesIndex.search(match);
      // show the results 🚀
      document.querySelectorAll('tbody > tr').forEach((row, i) => {
        row.style.display = results.includes(i) ? 'table-row' : 'none';
      });
    }

    document.querySelector('input#search').addEventListener('input', (e) => {
      const val = e.target.value;
      if(val === '') {
        document.querySelectorAll('tbody > tr').forEach((row) => {
          row.style.display = 'table-row';
        });
        return;
      }
      searchPagesIndex(val);
    });
  </script>

</body>
</html>
