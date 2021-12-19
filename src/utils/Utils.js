export function hitCounter(key) {
  if (
    window.location.hostname !== "localhost" &&
    window.location.hostname !== "dev--parauletes.netlify.app"
  ) {
    fetch(`https://api.countapi.xyz/hit/parauletes.netlify.app/${key}`);
  }
}
