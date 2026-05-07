export type Persona = "private" | "pro";
export type Billing = "monthly" | "yearly";

export type WorkflowStep = {
  id: string;
  step: string;
  headline: string;
  subtext: string;
  imageSrc: string;
  imageAlt: string;
};

export type PricePlan = {
  name: string;
  description: string;
  monthly: string;
  annual: string;
  cta: string;
  featured?: boolean;
  note?: string;
  features: string[];
  tiers?: Array<{
    label: string;
    monthly: string;
    annual: string;
  }>;
};

export type PricingEnginePlan = {
  id: string;
  name: string;
  description: string;
  monthly: string | null;
  yearly: string | null;
  cta: string;
  featured?: boolean;
  badge?: string;
  note?: string;
  contactOnly?: boolean;
  featureSummary: string[];
  stripePriceIdMonthly?: string;
  stripePriceIdYearly?: string;
  trialDays?: number;
};

export type PricingCompareValue = boolean | "minus" | "contact" | string;

export type PricingCompareCategory = {
  name: string;
  rows: Array<{
    label: string;
    values: PricingCompareValue[];
  }>;
};

export type ValueReason = {
  id: string;
  index: string;
  title: string;
  description: string;
};

export type PersonaBentoCard = {
  id: string;
  icon: "fileUp" | "mailSend" | "refresh" | "receipt";
  title: string;
  description: string;
  variant?: "primary" | "secondary";
  chips?: string[];
};

export type PersonaProblemItem = {
  id: string;
  label: string;
  title: string;
  description: string;
};

export const navItems = [
  { label: "Come funziona", href: "#funzionalita" },
  { label: "Per chi è", href: "#persona-switcher" },
  { label: "Prezzi", href: "#prezzi" },
  { label: "FAQ", href: "#faq" },
];

export const heroCopy = {
  badge: "Versione 2.0",
  kicker: "Software per buste paga colf, contributi INPS e documenti in un'unica piattaforma",
  title: "Il software per gestire il lavoro domestico",
  highlight: "con precisione operativa",
  description:
    "Libra Colf centralizza buste paga per colf e badanti, contributi INPS, archivio documentale e attività ricorrenti in una piattaforma pensata per famiglie, CAF e studi professionali.",
};

export const heroStats = [
  { value: "1.240+", label: "famiglie attive" },
  { value: "0", label: "errori di calcolo" },
  { value: "CCNL 2024", label: "sempre aggiornato" },
];

export const valueReasonsCopy: {
  title: string;
  highlight: string;
  reasons: ValueReason[];
} = {
  title: "Libra Colf è",
  highlight: "unico",
  reasons: [
    {
      id: "variations",
      index: "01",
      title: "Solo le variazioni",
      description:
        "Il sistema assume una gestione regolare mese su mese: inserisci solo eccezioni e variazioni, senza ricostruire ogni volta il rapporto da zero.",
    },
    {
      id: "import",
      index: "02",
      title: "Import da PDF INPS",
      description:
        "Il PDF del contratto INPS si trasforma in anagrafica completa in pochi secondi, riducendo inserimenti ripetitivi e attivita di copia-incolla.",
    },
    {
      id: "automation",
      index: "03",
      title: "Tutto automatizzato",
      description:
        "Buste paga, bollettini, reminder e attivita ricorrenti partono da un flusso unico, mantenendo continuita operativa su ogni contratto.",
    },
    {
      id: "updates",
      index: "04",
      title: "Sempre aggiornato",
      description:
        "Aggiornamenti CCNL, parametri e logiche applicative restano allineati in piattaforma, evitando adeguamenti manuali e margini di errore.",
    },
  ],
};

export const workflowCopy: {
  eyebrow: string;
  heading: string;
  subheading: string;
  steps: WorkflowStep[];
} = {
  eyebrow: "Cosa fa Libra Colf per te",
  heading: "Dalla creazione del rapporto alle scadenze di fine anno",
  subheading:
    "Dall'inserimento iniziale alle scadenze ricorrenti, Libra Colf accompagna l'intero ciclo operativo in un'unica esperienza chiara.",
  steps: [
    {
      id: "setup",
      step: "01",
      headline: "Inserisci i dati del contratto",
      subtext:
        "Nome, livello, ore settimanali e data di inizio. Ci vogliono meno di 5 minuti.",
      imageSrc: "/pagina-variazioni.jpg",
      imageAlt: "Interfaccia di configurazione del contratto",
    },
    {
      id: "monthly-calc",
      step: "02",
      headline: "Il sistema calcola tutto automaticamente",
      subtext:
        "Stipendio, contributi INPS, trattenute, tredicesima e TFR: calcolati ogni mese nel rispetto del CCNL.",
      imageSrc: "/dashboard.jpg",
      imageAlt: "Dashboard con i calcoli mensili del rapporto",
    },
    {
      id: "payslip-send",
      step: "03",
      headline: "La busta paga parte da sola ogni 27",
      subtext:
        "Ogni mese la busta paga viene generata e inviata automaticamente via email alla tua collaboratrice.",
      imageSrc: "/pagina-busta-paga-mensile.jpg",
      imageAlt: "Anteprima della busta paga mensile generata",
    },
    {
      id: "inps-reminder",
      step: "04",
      headline: "Ricevi il promemoria per i bollettini INPS",
      subtext:
        "Prima di ogni scadenza trimestrale ricevi una notifica con il bollettino già calcolato e pronto da pagare.",
      imageSrc: "/documenti.jpg",
      imageAlt: "Archivio documentale con bollettini e documenti pronti",
    },
  ],
};

export const personaBentoCopy: {
  eyebrow: string;
  title: string;
  description: string;
  cards: Record<Persona, PersonaBentoCard[]>;
} = {
  eyebrow: "Funzionalità",
  title: "Cosa cambia con Libra Colf",
  description: "",
  cards: {
    private: [
      {
        id: "private-import",
        icon: "fileUp",
        title: "Import automatico dal contratto INPS",
        description:
          "Basta caricare il PDF del contratto INPS: il sistema estrae tutti i dati e configura l'anagrafica in pochi secondi. Addio data-entry manuale.",
        variant: "primary",
        chips: ["PDF Parsing", "Zero Errori"],
      },
      {
        id: "private-send",
        icon: "mailSend",
        title: "Invio automatico buste paga",
        description:
          "Il 27 di ogni mese il sistema genera e invia automaticamente le buste paga via email. Senza che tu debba cliccare nulla.",
      },
      {
        id: "private-variations",
        icon: "refresh",
        title: "Solo le variazioni mensili",
        description:
          "Non inserisci più le presenze standard. Il sistema prevede che tutto sia regolare, inserisci solo le variazioni (ferie, malattie, straordinari).",
      },
      {
        id: "private-bollettini",
        icon: "receipt",
        title: "Bollettini Trimestrali Automatici",
        description:
          "Download dei bollettini MAV/PagoPA e inoltro automatico ai datori di lavoro via email. Zero click da parte tua.",
      },
      {
        id: "private-future",
        icon: "refresh",
        title: "Aggiornamento Buste Future",
        description:
          "Ogni modifica contrattuale si riflette istantaneamente su tutti i periodi futuri, mantenendo il ledger sempre coerente.",
      },
    ],
    pro: [
      {
        id: "pro-import",
        icon: "fileUp",
        title: "Import automatico contratti INPS",
        description:
          "Carichi il PDF del contratto INPS e il sistema configura rapidamente i dati del rapporto, riducendo il lavoro ripetitivo su ogni nuova pratica.",
        variant: "primary",
        chips: ["Onboarding Rapido", "Meno Data Entry"],
      },
      {
        id: "pro-send",
        icon: "mailSend",
        title: "Invio automatico buste paga",
        description:
          "Il 27 di ogni mese le buste paga vengono generate e recapitate in automatico, alleggerendo il carico operativo dello studio.",
      },
      {
        id: "pro-variations",
        icon: "refresh",
        title: "Solo le variazioni mensili",
        description:
          "Gli operatori non reinseriscono i mesi regolari: intervengono solo su ferie, malattie, straordinari o eccezioni reali del portafoglio clienti.",
      },
      {
        id: "pro-bollettini",
        icon: "receipt",
        title: "Bollettini Trimestrali Automatici",
        description:
          "I bollettini vengono prodotti e distribuiti piu rapidamente, riducendo passaggi manuali ripetitivi e tempi morti sul portafoglio clienti.",
      },
      {
        id: "pro-updates",
        icon: "refresh",
        title: "Aggiornamento Buste Future",
        description:
          "Ogni modifica contrattuale si riflette istantaneamente su tutti i periodi futuri, mantenendo il ledger sempre coerente.",
      },
    ],
  },
};

export const personaProblemCopy: {
  eyebrow: string;
  content: Record<
    Persona,
    {
      title: string;
      highlight: string;
      description: string;
      pains: PersonaProblemItem[];
    }
  >;
} = {
  eyebrow: "Il problema",
  content: {
    private: {
      title: "Gestire una colf è più complicato di quanto sembra",
      highlight: "ogni scadenza vive da sola",
      description: "",
      pains: [
        {
          id: "private-calcoli",
          label: "Attrito Principale",
          title: "Calcoli che non tornano",
          description:
            "Stipendio, tredicesima, TFR, contributi INPS… capire esattamente quanto pagare ogni mese è un rebus.",
        },
        {
          id: "private-scadenze",
          label: "Ricorrenza",
          title: "Scadenze che si dimenticano",
          description:
            "I bollettini INPS scadono ogni trimestre. Dimenticarli significa sanzioni e interessi che si accumulano.",
        },
        {
          id: "private-burocrazia",
          label: "Effetto a Catena",
          title: "Burocrazia da labirinto",
          description:
            "CCNL, livelli di inquadramento, comunicazioni INPS… La normativa cambia e tenersi aggiornati richiede ore.",
        },
      ],
    },
    pro: {
      title: "Gestire decine di contratti è",
      highlight: "un lavoro dentro il lavoro",
      description: "",
      pains: [
        {
          id: "pro-data-entry",
          label: "Attrito Principale",
          title: "Inserimento Dati Ripetitivo",
          description:
            "Ore perse a riportare le stesse presenze ogni mese, aumentando esponenzialmente il rischio di sviste e omissioni.",
        },
        {
          id: "pro-task",
          label: "Ricorrenza",
          title: "Task Ricorsivi Inutili",
          description:
            "Mail ogni mese per le buste paga, bollettini INPS da scaricare e inoltrare. Automatizza tutte queste azioni.",
        },
        {
          id: "pro-errori",
          label: "Effetto a Catena",
          title: "Errori Costosi",
          description:
            "Un calcolo sbagliato su decine di contratti genera sanzioni e perdita di credibilità con i datori di lavoro assistiti.",
        },
      ],
    },
  },
};

export const pricingCopy: Record<
  Persona,
  { saveCopy: string; plans: PricePlan[] }
> = {
  private: {
    saveCopy: "Risparmia fino al 25%",
    plans: [
      {
        name: "Base",
        description:
          "Per una gestione essenziale ma completa di un singolo rapporto.",
        monthly: "4,99",
        annual: "44,90",
        cta: "Inizia con Base",
        features: [
          "1 rapporto di lavoro domestico",
          "Dashboard scadenze e promemoria",
          "12 buste paga mensili automatiche",
          "Invio email busta paga il 27",
          "Calcolo 13a, TFR e CU",
          "Stampa bollettini INPS trimestrali",
        ],
      },
      {
        name: "Premium",
        description:
          "Il piano consigliato per chi vuole automazioni e notifiche proattive.",
        monthly: "5,99",
        annual: "49,90",
        cta: "Inizia con Premium",
        featured: true,
        note: "Piu scelto",
        features: [
          "Tutto del piano Base",
          "WhatsApp mensile arrivo busta paga",
          "WhatsApp trimestrale scadenza bollettini",
          "Invio automatico bollettini INPS",
          "Formulario online",
          "Accesso assistente AI",
        ],
      },
    ],
  },
  pro: {
    saveCopy: "Risparmia fino al 29%",
    plans: [
      {
        name: "Base",
        description:
          "Per iniziare a gestire i rapporti domestici dei tuoi assistiti.",
        monthly: "8,90",
        annual: "64,90",
        cta: "Inizia con Base",
        features: [
          "Buste paga e archivio documentale",
          "Formulario online e area normativa",
          "Servizi INPS a tariffe agevolate",
          "CU annuale e bollettini trimestrali",
          "Supporto ticket",
        ],
      },
      {
        name: "Premium",
        description:
          "Per studi che vogliono precisione, simulazioni e automazioni operative.",
        monthly: "19,90",
        annual: "169,90",
        cta: "Cresci con Premium",
        featured: true,
        note: "Piu scelto",
        features: [
          "Calcolo inquadramento corretto",
          "Simulazione costi dipendente",
          "INPS e adempimenti avanzati",
          "Workflow piu rapidi per operatori",
          "Supporto prioritario",
        ],
      },
      {
        name: "Premium+",
        description:
          "Per team con collaborazione interna e allineamento dati dedicato.",
        monthly: "25,90",
        annual: "249,90",
        cta: "Concediti piu tempo",
        features: [
          "Fino a 3 sotto-utenti di studio",
          "Assistenza caricamento e allineamento RDL",
          "Accesso assistente AI",
          "Gestione operativa condivisa",
        ],
      },
      {
        name: "Enterprise",
        description:
          "Per CAF e network con filiali, multi-sede e volumi elevati.",
        monthly: "199,00",
        annual: "1.699,00",
        cta: "Scala con Enterprise",
        features: [
          "Multi-sede centralizzata",
          "Sedi territoriali fino a 200",
          "Controllo gerarchico utenti",
          "Supporto enterprise",
        ],
        tiers: [
          { label: "fino a 20", monthly: "199,00", annual: "1.699,00" },
          { label: "fino a 50", monthly: "497,50", annual: "4.247,50" },
          { label: "fino a 100", monthly: "995,00", annual: "8.495,00" },
          { label: "fino a 200", monthly: "1.990,00", annual: "16.990,00" },
        ],
      },
    ],
  },
};

export const pricingEngineCopy: {
  eyebrow: string;
  title: string;
  description: string;
  personae: Array<{ id: Persona; label: string }>;
  billing: { monthly: string; yearly: string; yearlyBadge: string };
  saveCopy: Record<Persona, string>;
  plans: Record<Persona, PricingEnginePlan[]>;
  compare: Record<Persona, PricingCompareCategory[]>;
} = {
  eyebrow: "Abbonamenti",
  title: "Piani che crescono con il tuo profilo operativo",
  description:
    "Confronta i piani per privati e professionisti, passa da mensile ad annuale e approfondisci tutte le differenze.",
  personae: [
    { id: "private", label: "Privato" },
    { id: "pro", label: "Professionista" },
  ],
  billing: {
    monthly: "Mensile",
    yearly: "Annuale",
    yearlyBadge: "-20%",
  },
  saveCopy: {
    private: "Risparmia fino al 25%",
    pro: "Risparmia fino al 29%",
  },
  plans: {
    private: [
      {
        id: "private-base",
        name: "Base",
        description:
          "Per chi ha una collaboratrice e vuole gestire tutto senza stress",
        monthly: "4,99",
        yearly: "44,90",
        cta: "Prova gratis 30 giorni",
        note: "1 rapporto di lavoro",
        featureSummary: [
          "1 rapporto",
          "Buste paga automatiche",
          "Bollettini INPS",
        ],
        stripePriceIdMonthly: "price_1TTMwHB0QWhiSWCbGk2eniSh",
        stripePriceIdYearly: "price_1TTMwHB0QWhiSWCb4LLVLFgx",
        trialDays: 30,
      },
      {
        id: "private-premium",
        name: "Premium",
        description: "Per chi vuole il massimo della comodità",
        monthly: "5,99",
        yearly: "49,90",
        cta: "Inizia con Premium",
        featured: true,
        badge: "Consigliato",
        note: "Base + notifiche WhatsApp",
        featureSummary: [
          "WhatsApp mensile",
          "INPS automatica",
          "Assistente AI",
        ],
        stripePriceIdMonthly: "price_1TTMwIB0QWhiSWCbz44lQLRS",
        stripePriceIdYearly: "price_1TTMwIB0QWhiSWCbAfeodbp4",
      },
    ],
    pro: [
      {
        id: "pro-base",
        name: "Base",
        description:
          "Inizia a gestire facilmente i rapporti di lavoro domestici dei tuoi assistiti.",
        monthly: "8,90",
        yearly: "64,90",
        cta: "Prova gratis 30 giorni",
        note: "fino a 5 rapporti",
        featureSummary: [
          "Gestione fino a 5 RDL",
          "Area normativa",
          "Servizi INPS",
        ],
        stripePriceIdMonthly: "price_1TTMwJB0QWhiSWCb2fSJGY6w",
        stripePriceIdYearly: "price_1TTMwJB0QWhiSWCb84XatMXU",
        trialDays: 30,
      },
      {
        id: "pro-premium",
        name: "Premium",
        description:
          "Perfetto per strutture operative con alto volume di pratiche.",
        monthly: "19,90",
        yearly: "169,90",
        cta: "Cresci con Premium",
        featured: true,
        badge: "Consigliato",
        note: "fino a 25 rapporti",
        featureSummary: [
          "Simulazione costi",
          "Inquadramento corretto",
          "Workflow più rapidi",
        ],
        stripePriceIdMonthly: "price_1TTMwJB0QWhiSWCbH79CNK3D",
        stripePriceIdYearly: "price_1TTMwKB0QWhiSWCbUYQLSptr",
      },
      {
        id: "pro-premium-plus",
        name: "Premium+",
        description:
          "Per reti e strutture multi-sede che richiedono accesso completo.",
        monthly: "25,90",
        yearly: "249,90",
        cta: "Concediti più tempo",
        note: "fino a 200 rapporti",
        featureSummary: [
          "Fino a 3 sotto-utenti",
          "Allineamento RDL",
          "Assistente AI",
        ],
        stripePriceIdMonthly: "price_1TTMwKB0QWhiSWCb5TgZspw0",
        stripePriceIdYearly: "price_1TTMwLB0QWhiSWCbqP4xHauE",
      },
      {
        id: "pro-enterprise",
        name: "Enterprise",
        description:
          "Per strutture di grandi dimensioni con team di collaboratori e necessità evolute.",
        monthly: null,
        yearly: null,
        cta: "Contattaci",
        contactOnly: true,
        note: "custom",
        featureSummary: [
          "Multi-sede",
          "Sedi territoriali",
          "Supporto prioritario",
        ],
      },
    ],
  },
  compare: {
    private: [
      {
        name: "Gestione Contabile",
        rows: [
          { label: "Rapporti di lavoro gestibili", values: ["1", "1"] },
          {
            label: "Elaborazione automatica 12 buste paga mensili",
            values: [true, true],
          },
          { label: "Invio automatico busta paga il 27", values: [true, true] },
          { label: "Anteprima buste paga future", values: [true, true] },
          { label: "Calcolo 13ª mensilità e TFR", values: [true, true] },
          { label: "Generazione CU annuale", values: [true, true] },
        ],
      },
      {
        name: "Adempimenti Normativi",
        rows: [
          { label: "Dashboard scadenze e promemoria", values: [true, true] },
          {
            label: "Gestione completa rapporto di lavoro",
            values: [true, true],
          },
          { label: "Stampa bollettini INPS trimestrali", values: [true, true] },
          {
            label: "Messaggio WhatsApp trimestrale bollettini",
            values: ["minus", true],
          },
          {
            label: "Inoltro automatico bollettini INPS",
            values: ["minus", true],
          },
        ],
      },
      {
        name: "Supporto",
        rows: [
          { label: "Assistenza ticket gratuita", values: [true, true] },
          {
            label: "Messaggio WhatsApp mensile busta paga",
            values: ["minus", true],
          },
          { label: "Accesso Formulario online", values: ["minus", true] },
          { label: "Accesso Assistente AI", values: ["minus", true] },
        ],
      },
    ],
    pro: [
      {
        name: "Gestione Contabile",
        rows: [
          {
            label: "Rapporti di lavoro gestibili",
            values: ["fino a 5", "fino a 25", "fino a 200", "custom"],
          },
          {
            label: "Elaborazione automatica 12 buste paga mensili",
            values: [true, true, true, true],
          },
          {
            label: "Invio automatico busta paga il 27",
            values: [true, true, true, true],
          },
          {
            label: "Anteprima buste paga future",
            values: [true, true, true, true],
          },
          {
            label: "Calcolo 13ª mensilità e TFR",
            values: [true, true, true, true],
          },
          { label: "Generazione CU annuale", values: [true, true, true, true] },
        ],
      },
      {
        name: "Adempimenti Normativi",
        rows: [
          { label: "Formulario online", values: [true, true, true, true] },
          { label: "Area normativa", values: [true, true, true, true] },
          {
            label: "Servizi INPS a tariffe agevolate",
            values: [true, true, true, true],
          },
          {
            label: "Calcolo inquadramento corretto",
            values: ["minus", true, true, true],
          },
          {
            label: "Simulazione costi del dipendente",
            values: ["minus", true, true, true],
          },
        ],
      },
      {
        name: "Supporto",
        rows: [
          {
            label: "Assistenza ticket gratuita",
            values: [true, true, true, true],
          },
          {
            label: "Reminder WhatsApp mensile",
            values: ["minus", "minus", true, true],
          },
          {
            label: "Reminder WhatsApp trimestrale",
            values: ["minus", "minus", true, true],
          },
          {
            label: "Inoltro automatico bollettini INPS",
            values: ["minus", "minus", true, true],
          },
          {
            label: "Sotto-utenti collaboratori di studio",
            values: ["minus", "minus", "fino a 3", "Sì"],
          },
          {
            label: "Accesso Assistente AI",
            values: ["minus", "minus", true, true],
          },
          {
            label: "Supporto dedicato prioritario",
            values: ["minus", "minus", "minus", true],
          },
        ],
      },
    ],
  },
};

export const resourceItems = [
  {
    title: "Guide CCNL domestico",
    description:
      "Aggiornamenti normativi, tabelle e casi pratici per famiglie e studi.",
  },
  {
    title: "Centro assistenza",
    description: "Procedure operative, risposte rapide e onboarding guidato.",
  },
  {
    title: "Webinar operativi",
    description:
      "Sessioni dedicate a payroll, INPS e gestione massiva del portfolio clienti.",
  },
];

