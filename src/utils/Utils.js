export function hitCounter(key) {
  if (process.env.REACT_APP_ACTIVATE_COUNTER !== "false") {
    fetch(`https://api.countapi.xyz/hit/parauletes.netlify.app/${key}`);
  }
}
