var parauletes = require("./parauletes.json");
var abreviacions = require("./abreviacions-llibres-biblia.json");

var testos = [
  function citesParauletesOk() {
    let cites = parauletes.map((parauleta) => parauleta.cita);
    let noCorrectes = cites.filter(
      (cita) => !/^[1-9]?[A-Za-z]+\.[1-9][0-9]?[0-9]?\.[0-9-]+$/.test(cita)
    );
    return noCorrectes.length === 0;
  },
  function abreviacionsLlibresBibliaOk() {
    let llibresParauletes = parauletes.map(
      (parauleta) => parauleta.cita.match(/^[1-9]?[A-Za-z]+/)[0]
    );
    let llistaAbreviacions = abreviacions.map(
      (abreviacio) => abreviacio.abreviacio
    );
    let llibresDesconeguts = llibresParauletes.filter(
      (llibre) => !llistaAbreviacions.includes(llibre)
    );
    return llibresDesconeguts.length === 0;
  },
  function parauletesNoMoltLlargues() {
    return (
      parauletes.filter((parauleta) => parauleta.versetCA.length > 278)
        .length === 0
    );
  },
];

var failed = 0;
testos.forEach((func) => {
  var resultOk = func();
  if (!resultOk) {
    console.log(`${func.name} no OK`);
    failed++;
  } else {
    console.log(`${func.name} OK`);
  }
});

console.log(`Number of tests failed = ${failed}`);
