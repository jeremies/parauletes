# Parauletes

Parauletes is a React App that gives you a random Bible quote.

## Development

1. `yarn install`
2. `yarn start`

## Generate icons

https://capacitorjs.com/docs/guides/splash-screens-and-icons

## Misc

Notes:

- L'arxiu abreviacions-llibres-biblia.json té les abreviacions que usa la bíblia BCI (Biblia Catalana traducció Interconfessional)
- Per ordenar les parauletes usar:

```js
parauletes.sort((a, b) => (a.cita > b.cita ? 1 : b.cita > a.cita ? -1 : 0));
```

## Executar els tests

```sh
node src/jsonTests.js
```
