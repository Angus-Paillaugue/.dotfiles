import { API_KEY } from "$env/static/private"

export async function fetchData() {
  try {
    const res = await fetch(`https://getpantry.cloud/apiv1/pantry/${API_KEY}/basket/Changes`);
    if(!res.ok) {
      throw new Error('Network response was not ok');
    }
    return await res.json();
  } catch(err) {
    console.error('There was a problem with the fetch operation:', err);
  }
}
