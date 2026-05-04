# RicettAi - Recipe Generator

RicettAi è un'applicazione React che permette di inserire una lista di ingredienti e ricevere una ricetta suggerita dall'intelligenza artificiale, utilizzando il modello Google Gemini 2.5 Flash Lite.

## Funzionalità

- Aggiungi ingredienti personalizzati alla lista.
- Rimuovi ingredienti con un click.
- Genera ricette su misura basate sugli ingredienti forniti (minimo 4).
- Interfaccia utente semplice e moderna con React e Bootstrap.
- Supporto per markdown nella visualizzazione della ricetta.
- Chiave API protetta tramite Netlify Functions (mai esposta nel browser).

## Tecnologie utilizzate

- React 19
- React Markdown
- Bootstrap 5
- Google Gemini 2.5 Flash Lite (API Google AI)
- Vite 7
- Netlify Functions (backend serverless)

## Come eseguire il progetto in locale

1. Clona il repository:
```bash
   git clone https://github.com/DomenicoFoglia/RicettAi-React-AIGemini.git
```

2. Installa le dipendenze:
```bash
   npm install
```

3. Crea un file `.env` nella root del progetto:

GEMINI_API_KEY=la_tua_chiave_google_qui

Ottieni la chiave gratuitamente su [Google AI Studio](https://aistudio.google.com/apikey).

4. Installa Netlify CLI e avvia il progetto:
```bash
   npm install -g netlify-cli
   netlify dev
```

5. Apri il browser su `http://localhost:8888`

> **Nota:** Usare solo `npm run dev` non è sufficiente perché Vite non simula le Netlify Functions.

## Deploy

L'app è deployata su Netlify con deploy automatico da GitHub. La chiave API è salvata come variabile d'ambiente su Netlify e non è mai inclusa nel codice.

App live: [https://ricettai.netlify.app](https://ricettai.netlify.app)