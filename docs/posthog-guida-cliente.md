# Guida PostHog — Libra Colf

Questa guida spiega come leggere e usare la dashboard di analisi della landing page di Libra Colf.

---

## Come accedere

1. Vai su [eu.posthog.com](https://eu.posthog.com)
2. Accedi con le credenziali fornite
3. Seleziona il progetto **"Default project"** (organizzazione SvDev)
4. Clicca su **Dashboards** nel menu a sinistra
5. Apri **"Libra Colf — Performance Landing Page"**

---

## La dashboard: struttura e logica

La dashboard è organizzata in 4 sezioni che seguono il percorso dell'utente, dall'arrivo sul sito fino all'abbonamento.

---

### 🎯 Sezione 1 — Conversione

#### Funnel di conversione

**Cos'è:** Il grafico più importante. Mostra quanti utenti completano ogni fase del processo di acquisto, da quando cliccano su un piano fino all'abbonamento attivato.

**Le 4 fasi:**
1. **Clic sul piano** — l'utente ha cliccato su "Inizia la prova" o "Abbonati" su un piano
2. **Checkout aperto** — il modulo di pagamento si è aperto
3. **Pagamento inviato** — l'utente ha compilato i dati e confermato
4. **Abbonamento creato** — il pagamento è andato a buon fine

**Come leggerlo:** Ogni barra mostra la percentuale di utenti che ha completato quel passaggio rispetto al primo. Se la barra cala bruscamente tra due fasi, lì si trova il problema principale.

**Cosa fare:**
- Calo tra fase 1 e 2 → il modale di checkout non si apre o spaventa l'utente
- Calo tra fase 2 e 3 → i campi del form sono troppo lunghi o poco chiari
- Calo tra fase 3 e 4 → problemi tecnici con il pagamento (controlla anche "Errori checkout")

---

### 💰 Sezione 2 — Abbonamenti

#### Abbonamenti nel tempo

**Cos'è:** Numero di nuovi abbonamenti attivati ogni giorno negli ultimi 30 giorni.

**Come leggerlo:** Una linea che sale è un buon segno. Picchi in certi giorni possono coincidere con campagne marketing o traffico da social.

**Cosa fare se è piatta a zero:** Il sito non ha ancora traffico sufficiente, oppure il tracking non è ancora attivo (gli utenti devono accettare i cookie).

#### Abbonamenti per piano

**Cos'è:** Stessa metrica, divisa per tipo di piano (Base, Premium, Premium+).

**Come leggerlo:** Mostra quali piani vengono scelti di più. Se il piano Base domina, potrebbe valere la pena evidenziare di più i benefici del Premium.

---

### 📣 Sezione 3 — Top of Funnel

#### Clic sull'hero

**Cos'è:** Quante volte gli utenti cliccano sui pulsanti nella sezione hero (la prima schermata del sito), divisi per tipo di bottone.

**Come leggerlo:** Se il bottone "Inizia gratis" riceve molti clic ma pochi arrivano al checkout, c'è un problema nella pagina prezzi o nel modale.

#### Clic CTA finale

**Cos'è:** Quante volte gli utenti cliccano sul bottone "Scegli il tuo piano" nella sezione finale della pagina, sopra il footer.

**Come leggerlo:** Misura l'interesse generato dalla sezione di chiusura. Se il numero è basso rispetto ai clic sull'hero, gli utenti non arrivano in fondo alla pagina — considera di spostare il CTA più in alto.

---

### 🛒 Sezione 4 — Pagina Prezzi & Checkout

#### Clic sui piani per segmento

**Cos'è:** Quante volte viene cliccato il bottone di acquisto su ogni piano, diviso per segmento di utente (datore di lavoro privato, agenzia, ecc.).

**Come leggerlo:** Mostra quale piano attira quale tipo di utente. Se un segmento non clicca mai, forse i piani non sono comunicati bene per quel pubblico.

#### Preferenza fatturazione

**Cos'è:** Quante volte gli utenti cambiano il toggle tra fatturazione mensile e annuale.

**Come leggerlo:** Se molti passano ad annuale, il risparmio è percepito come valore. Se nessuno lo tocca, forse il toggle non è abbastanza visibile.

#### Aperture confronto piani

**Cos'è:** Quante volte gli utenti aprono la tabella "Confronta Piani" in fondo alla sezione prezzi, diviso per segmento.

**Come leggerlo:** Se molti la aprono prima di acquistare, la tabella è utile e vale la pena mantenerla in evidenza. Se nessuno la usa, si potrebbe rimuoverla per semplificare la pagina.

#### Checkout: abbandoni vs completati

**Cos'è:** Confronto tra chi apre il checkout e poi lo chiude senza pagare (abbandoni) e chi completa l'acquisto.

**Come leggerlo:** Se gli abbandoni superano i completati, c'è un problema nel flusso di pagamento. Guarda le sessioni registrate per capire dove gli utenti si bloccano.

#### Utenti senza periodo di prova

**Cos'è:** Divide chi sta avviando il checkout con la prova gratuita disponibile da chi non ce l'ha (perché ha già usato una prova in passato con la stessa email).

**Come leggerlo:** Un numero alto di "senza prova" indica molti utenti di ritorno — positivo se acquistano, da monitorare se abbandonano.

#### Errori checkout

**Cos'è:** Errori tecnici che si verificano durante il pagamento, divisi per fase.

**Come leggerlo:** Questo grafico dovrebbe essere sempre piatto a zero. Qualsiasi picco va investigato immediatamente — clicca sull'evento per vedere i dettagli.

---

## Alert automatici

È configurato un alert che invia un'email a **salvo.visk@gmail.com** se il numero di abbonamenti giornalieri cala del 50% o più rispetto al giorno precedente. Questo serve a rilevare immediatamente problemi tecnici dopo un aggiornamento del sito.

---

## Registrazioni delle sessioni

PostHog registra le sessioni degli utenti che hanno accettato i cookie analitici. Le registrazioni mostrano esattamente cosa ha fatto ogni utente sul sito: dove ha scrollato, cosa ha cliccato, dove si è bloccato.

**Come accedere:**
1. Menu laterale → **Session Replay**
2. Filtra per evento (es. "ha aperto il checkout ma non ha completato")
3. Guarda la registrazione per capire il comportamento reale

**Cosa cercare:**
- Utenti che aprono il checkout e poi tornano indietro senza motivo apparente
- Utenti che scrollano molto prima di trovare il bottone
- Utenti che passano molto tempo sul form di pagamento (probabile confusione)

> **Nota:** Le registrazioni sono attive solo per utenti che hanno accettato i cookie. Nelle prime settimane i dati saranno limitati.

---

## Periodo di riferimento

Tutti i grafici mostrano di default gli **ultimi 30 giorni**. Puoi cambiare il periodo usando il filtro data in alto a destra nella dashboard.

---

## FAQ

**I numeri sono tutti a zero — è normale?**
Sì, nelle prime settimane. I dati si accumulano solo da utenti che accettano i cookie analitici. È normale che ci voglia qualche giorno di traffico reale per vedere i primi dati.

**Cosa significa "trial waived" / "senza periodo di prova"?**
Significa che quell'utente ha già usato una prova gratuita in passato (con la stessa email). Al secondo tentativo di acquisto, la prova non viene offerta di nuovo e l'addebito parte immediatamente.

**Perché il funnel mostra percentuali molto basse?**
All'inizio con pochi utenti le percentuali sembrano strane. Aspetta almeno 100-200 visite prima di trarre conclusioni. Con dati reali, un funnel sano ha tipicamente: 20-40% da clic piano → checkout aperto, e 50-70% da checkout aperto → abbonamento.

**Posso aggiungere altri grafici?**
Sì. Clicca su "+ Add insight" in alto nella dashboard. Se hai bisogno di un grafico specifico, comunicalo e verrà configurato.

**Come faccio a vedere i dati di un solo piano?**
Su qualsiasi grafico, clicca sulla legenda per nascondere/mostrare le serie. Oppure clicca sull'insight → "Edit" → aggiungi un filtro per `plan_name`.

---

## Glossario eventi

| Evento tecnico | Significato |
|---|---|
| `plan_cta_clicked` | Clic sul bottone di acquisto di un piano |
| `checkout_opened` | Apertura del modulo di pagamento |
| `checkout_initiated` | Avvio del processo lato server (carta inserita) |
| `checkout_payment_submitted` | Pagamento inviato dall'utente |
| `checkout_abandoned` | Modulo chiuso senza completare il pagamento |
| `subscription_created` | Abbonamento attivato con successo |
| `hero_cta_clicked` | Clic su un bottone nella sezione hero |
| `lead_magnet_cta_clicked` | Clic sul bottone "Scegli il tuo piano" nella sezione finale |
| `billing_cycle_changed` | Toggle mensile/annuale cambiato |
| `compare_plans_opened` | Apertura tabella confronto piani |
| `cookie_consent_accepted` | Utente ha accettato i cookie analitici |

---

*Ultimo aggiornamento: maggio 2026*
