import { API_KEY } from "$env/static/private"

export async function fetchData() {
  try {
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  }
}
