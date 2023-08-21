export function hitCounter(key) {
  if (
    key === "requests" &&
    process.env.REACT_APP_ACTIVATE_COUNTER !== "false"
  ) {
    fetch(`https://api.api-ninjas.com/v1/counter?id=${key}`, {
      headers: { "X-Api-Key": "dKaL7qrDFbaPDJuTNG/0zw==RiK5bKNmTKbvCJxN" },
    });
  }
}
