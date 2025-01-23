<br/>
<div align="center">
  <img src="https://moodle.iut-tlse3.fr/pluginfile.php/1/core_admin/logocompact/300x300/1724778960/Logo_IUT_ACT_couleurs.png" alt="Logo" height="100">
  <h3 align="center">R3.05 - Programmation système</h3>
  <br />
</div>

# A propos

Ce projet est un proxy ftp qui permet la communication entre un client ftp et un server ftp.

## Les membres

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
  <a href="https://github.com/Angus-Paillaugue" style="display: flex; flex-direction: column; align-items: center; gap: 20px; border: 1px solid #404040; padding: 10px; border-radius:10px;">
    <img src="https://avatars.githubusercontent.com/u/88200698" style="border-radius: 100%; width: 50%" alt="Paillaugue Angus"/>
    <sub>
      <b>Paillaugue Angus</b>
      <br />
      <b>@Angus-Paillaugue</b>
    </sub>
  </a>
  <a href="https://github.com/EtienneNo" style="display: flex; flex-direction: column; align-items: center; gap: 20px; border: 1px solid #404040; padding: 10px; border-radius:10px;">
    <img src="https://avatars.githubusercontent.com/u/127329381" style="border-radius: 100%; width: 50%" alt="Noel Etienne"/>
    <sub>
      <b>Noel Etienne</b>
      <br />
      <b>@EtienneNo</b>
    </sub>
  </a>
</div>

# Utilisation

## Lancer le proxy

```bash
make proxy && make run
```

## Se connecter au proxy

```bash
ftp user@127.0.0.1 <port fournis par le proxy>
```

Proxy testé avec un serveur proxy local.
