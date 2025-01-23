<br/>
<div align="center">
  <img src="https://moodle.iut-tlse3.fr/pluginfile.php/1/core_admin/logocompact/300x300/1724778960/Logo_IUT_ACT_couleurs.png" alt="Logo" height="100">
  <h3 align="center">R3.05 - Programmation système</h3>
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
        <a href="https://github.com/Angus-Paillaugue">
          <img src="https://avatars.githubusercontent.com/u/88200698" style="border-radius: 100%;" width="100px;" alt="Paillaugue Angus"/>
          <br />
          <sub>
            <b>Paillaugue Angus</b>
            <br />
            <b>@Angus-Paillaugue</b>
          </sub>
        </a>
      </td>
      <td align="center" valign="top">
        <a href="https://github.com/EtienneNo">
          <img src="https://avatars.githubusercontent.com/u/127329381" style="border-radius: 100%;" width="100px;" width="100px;" alt="Allart Matheo"/>
          <br />
          <sub>
            <b>Noel Etienne</b>
            <br />
            <b>@EtienneNo</b>
          </sub>
        </a>
      </td>
    </tr>
  </tbody>
</table>


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
