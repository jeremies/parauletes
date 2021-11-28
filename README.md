Notes:

- L'arxiu abreviacions-llibres-biblia.json té les abreviacions que usa la bíblia BCI (Biblia Catalana traducció Interconfessional)
- Per ordenar les parauletes usar:

```js
parauletes.sort((a, b) => (a.cita > b.cita ? 1 : b.cita > a.cita ? -1 : 0));
```

# Executar els tests

```sh
node src/jsonTests.js
```
