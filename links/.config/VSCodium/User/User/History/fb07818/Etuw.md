<br/>
<div align="center">
  <img src="https://moodle.iut-tlse3.fr/pluginfile.php/1/core_admin/logocompact/300x300/1724778960/Logo_IUT_ACT_couleurs.png" alt="Logo" height="100">
  <h3 align="center">S.A.E. S3.A01 - Application de gestion de bien immobiliers</h3>
  <b align="center">
    Équipe n°1
  </b>
  <br />
  <br />
  <br />
</div>


# proxy ftp

Proxy ftp pour un devoir de cours de la ressource R3.05

## utilisation

Lancer le proxy

```bash
make proxy && make run
```

Se connecter au proxy
```bash
ftp 127.0.0.1 <port fournis par le proxy>
```

Proxy testé avec un serveur proxy local.
Il faut donc se connecter au serveur utilisateurLocal@localhost, avec le meme mdp que celui de l'utilisateur.
