# Vegetarian Recipe App

Applicazione didattica realizzata per un master sulla materia **React**. Permette di cercare ricette vegetariane tramite Spoonacular e di aprire la pagina con i dettagli di una ricetta.

Il progetto è pensato per esercitarsi con componenti, props, stato, eventi, effetti, chiamate HTTP e navigazione client-side. È una base di studio semplice, non un servizio pronto per la produzione.

## Funzionalità

- Ricerca di ricette vegetariane per parola chiave.
- Visualizzazione dei risultati con ID, titolo e immagine.
- Navigazione alla pagina di dettaglio di una ricetta.
- Messaggi per caricamento, risultati non trovati ed errori di rete.
- Interfaccia e messaggi principalmente in italiano.

## Tecnologie

- **React 19** per costruire l'interfaccia con componenti.
- **TypeScript** per descrivere i dati e verificare i tipi.
- **Vite** per avviare il server di sviluppo e creare la build.
- **React Router** per la navigazione tra le pagine.
- **Axios** per le richieste HTTP all'API.
- **CSS** per gli stili dell'interfaccia, raccolti nei fogli di stile dell'applicazione.
- **Oxlint** per il controllo statico del codice.

## Requisiti

- Node.js e npm installati.
- Una chiave API valida per [Spoonacular](https://spoonacular.com/food-api).
- Accesso a Internet per ottenere le ricette.

## Installazione e avvio

Aprire un terminale nella cartella del progetto ed eseguire:

```bash
npm install
npm run dev
```

Vite mostra l'indirizzo locale nel terminale (di solito `http://localhost:5173`). Aprire tale indirizzo nel browser.

## Comandi disponibili

| Comando | Descrizione |
| --- | --- |
| `npm run dev` | Avvia il server di sviluppo con aggiornamento rapido. |
| `npm run build` | Verifica i tipi TypeScript e crea la build di produzione in `dist/`. |
| `npm run preview` | Serve localmente la build già creata. Eseguire prima `npm run build`. |
| `npm run lint` | Analizza il codice con Oxlint. |

## Configurare l'API

Le richieste a Spoonacular sono raccolte in `src/api/manager.ts`. Il progetto richiede una chiave API per cercare le ricette e caricarne i dettagli.

1. Rigenerare la chiave Spoonacular dal pannello del proprio account se è già stata esposta.
2. Impostare `VITE_SPOONACULAR_API_KEY` nel file `.env` (se non esiste, crearlo copiando `.env.example`) usando la nuova chiave.
3. Riavviare il server Vite dopo aver modificato `.env`.

Il file `.env` è escluso da Git; `.env.example` documenta la variabile richiesta senza contenere credenziali.

**Attenzione:** una chiave inserita nel codice frontend può essere letta dagli utenti e finire nella build pubblica. Non committare chiavi personali o credenziali. Per un progetto pubblico o di produzione, le richieste autenticate dovrebbero passare da un backend che custodisce la chiave. Se si modifica la configurazione per usare variabili d'ambiente Vite, ricordare che le variabili con prefisso `VITE_` vengono comunque incluse nel codice consegnato al browser e non sono segreti.

Se le richieste falliscono, verificare la disponibilità della chiave, i limiti del piano Spoonacular e la connessione Internet.

## Struttura del progetto

```text
src/
  api/
    manager.ts             Tipi e funzioni per comunicare con Spoonacular
  assets/
    logo.png               Logo usato nella barra di navigazione
  components/
    navbar.tsx             Barra di navigazione
    recipes-list.tsx       Ricerca e visualizzazione dei risultati
  pages/
    main-page.tsx          Pagina iniziale con il modulo di ricerca
    recipe-detail.tsx      Pagina con i dettagli di una ricetta
  App.tsx                  Router e composizione delle pagine
  App.css                  Stili dell'applicazione
  index.css                Stili globali
  main.tsx                 Punto di ingresso React
```

## Come funziona

1. `main.tsx` monta l'applicazione React nel nodo `root` di `index.html` e abilita `StrictMode`.
2. `App.tsx` configura il router: `/` mostra la pagina iniziale e `/recipes/:id` mostra il dettaglio della ricetta selezionata.
3. `main-page.tsx` conserva il testo scritto e quello effettivamente inviato in due stati distinti. Il modulo usa `onSubmit`, blocca il ricaricamento standard del browser e passa la ricerca a `RecipesList`.
4. `recipes-list.tsx` riceve la ricerca tramite una prop. Un `useEffect` chiama la funzione `searchRecipes` quando cambia il testo inviato e aggiorna lo stato con i risultati, il caricamento o l'errore.
5. Cliccando sull'ID di una ricetta, React Router apre `/recipes/:id`. `recipe-detail.tsx` legge l'ID con `useParams` e richiede i dettagli con `getRecipeDetails`.
6. `manager.ts` centralizza gli endpoint, i tipi dei dati e le richieste Axios:
   - ricerca: endpoint Spoonacular `recipes/complexSearch`, con il filtro `diet=vegetarian`;
   - dettaglio: endpoint `recipes/{id}/information`.


## Link alla pubblicazione netlify
[vegetarian-vite-app](https://vegetarian-vite-app.netlify.app)

## Note e limiti conosciuti

- La disponibilità dei risultati e dei dettagli dipende dal servizio esterno e dal piano API.
- La risposta del servizio può non contenere istruzioni o tempi di preparazione per ogni ricetta.
- La gestione degli errori è essenziale e didattica; si può estendere con messaggi più specifici e possibilità di riprovare.
- La chiave API non deve essere considerata protetta quando usata direttamente dal browser.

## Licenza

Non è specificata una licenza nel progetto. Verificare le condizioni d'uso di Spoonacular e dei contenuti restituiti prima di riutilizzare o distribuire l'applicazione.
