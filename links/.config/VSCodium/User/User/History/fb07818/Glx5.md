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


# A propos

Ce projet est un proxy ftp qui permet la communication entre un client ftp et un server ftp.


## Les membres

<table>
  <tbody>
    <tr>
      <td align="center" valign="top">
        <a href="https://gitlab.info.iut-tlse3.fr/pln5132a">
          <img src="https://avatars.githubusercontent.com/u/88200698" style="border-radius: 100%;" width="100px;" alt="Paillaugue Angus"/>
          <br />
          <sub>
            <b>Paillaugue Angus</b>
            <br />
            <b>@pln5132a</b>
          </sub>
        </a>
        <br />
        <small>angus.paillaugue@etu.iut-tlse3.fr</small>
      </td>
      <td align="center" valign="top">
        <a href="https://gitlab.info.iut-tlse3.fr/llm5249a">
          <img src="https://secure.gravatar.com/avatar/0e1f8305f74e1a8238285c719a7a75ac79f01dec7d3039df142413f7449495da?s=80&d=identicon&width=100" style="border-radius: 100%;" width="100px;" width="100px;" alt="Allart Matheo"/>
          <br />
          <sub>
            <b>Allart Matheo</b>
            <br />
            <b>@llm5249a</b>
          </sub>
        </a>
        <br />
        <small>matheo.allart@etu.iut-tlse3.fr</small>
      </td>
    </tr>
  </tbody>
</table>



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
