export async function load() {
  await new Promise((resolve) => setTimeout(resolve, 20000));
  return {
    props: {}
  };
}
