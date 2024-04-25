import { Device } from "@capacitor/device";

const info = await Device.getInfo();

export function hitCounter(key) {
  if (key === "requests") {
    let apikey = "";
    if (info.platform === "web") {
      apikey = "Jo79x+Q5SRIajvMGuXUKbA==WX1kUV4RMuFOTeNM";
    } else {
      apikey = "dKaL7qrDFbaPDJuTNG/0zw==RiK5bKNmTKbvCJxN";
    }

    fetch(`https://api.api-ninjas.com/v1/counter?id=${key}`, {
      headers: { "X-Api-Key": apikey },
    });
  }
}
