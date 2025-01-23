import keytar from 'keytar';

function storeToken(token: string) {
  // Store the token in a secure location
  keytar.setPassword('env-managment', 'token', token);
}

function getToken() {
  // Retrieve the token from a secure location
  return keytar.getPassword('env-managment', 'token');
}
