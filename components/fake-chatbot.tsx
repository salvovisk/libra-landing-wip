"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";

import type { Persona } from "@/lib/site-data";

const CHATBOT_STORAGE_KEY = "libra:fake-chatbot";

type FlowOption = {
  label: string;
  next: string;
  data?: Record<string, string>;
};

type FlowNode = {
  msg: string;
  opts?: FlowOption[];
  collect?: boolean;
};

type ChatItem =
  | {
      id: string;
      type: "message";
      role: "assistant" | "user";
      content: string;
    }
  | {
      id: string;
      type: "options";
      options: FlowOption[];
      disabled: boolean;
    };

type PersistedChatState = {
  isOpen: boolean;
  items: ChatItem[];
  hasStarted: boolean;
  hasSeenChat: boolean;
  isCollectingEmail: boolean;
  userData: Record<string, string>;
  emailValue: string;
  lastSeenItemCount: number;
};

const FLOW: Record<string, FlowNode> = {
  start: {
    msg: "Ciao! 👋 Sono il tuo assistente virtuale di Libra Colf.\nDimmi: come posso aiutarti oggi?",
    opts: [
      { label: "👤 Datore di lavoro privato", next: "a1", data: { PROFILO: "privati" } },
      { label: "🏢 CAF / Professionista", next: "b1", data: { PROFILO: "pro" } },
    ],
  },
  a1: {
    msg: "Hai già una colf, badante o baby-sitter assunta, oppure devi iniziare?",
    opts: [
      {
        label: "✅ Sì, ho già la mia colf / badante",
        next: "a2a",
        data: { SITUAZIONE: "contratto_attivo" },
      },
      {
        label: "🆕 Sto per assumere qualcuno",
        next: "a2b",
        data: { SITUAZIONE: "nuova_assunzione" },
      },
      { label: "🤔 Sto solo guardando", next: "a_lead", data: { SITUAZIONE: "curioso" } },
    ],
  },
  a2a: {
    msg: "Come gestisci buste paga e contributi INPS ogni mese?",
    opts: [
      { label: "📊 Con Excel o carta", next: "a3", data: { GESTIONE: "excel" } },
      {
        label: "🧑‍💼 Ci pensa un consulente",
        next: "a_consulente",
        data: { GESTIONE: "consulente" },
      },
      {
        label: "😰 Onestamente… non sempre",
        next: "a_disorganizzato",
        data: { GESTIONE: "disorganizzato" },
      },
    ],
  },
  a2b: {
    msg: "Conosci già gli adempimenti per assumere regolarmente?",
    opts: [
      {
        label: "✅ Sì, ho già le idee chiare",
        next: "a_nuova_chiara",
        data: { CONOSCENZA: "chiara" },
      },
      {
        label: "❓ No, ho bisogno di capire",
        next: "a_nuova_incerta",
        data: { CONOSCENZA: "incerta" },
      },
    ],
  },
  a3: {
    msg: "Quanto tempo ci dedichi ogni mese?",
    opts: [
      {
        label: "⚡ Meno di 1 ora, me la cavo",
        next: "a_excel_ok",
        data: { TEMPO: "meno_1h" },
      },
      {
        label: "⏰ 2-3 ore, ma mi pesa",
        next: "a_excel_stress",
        data: { TEMPO: "2_3h" },
      },
      {
        label: "😤 Troppo. Mi stresso ogni volta",
        next: "a_excel_molto",
        data: { TEMPO: "troppo" },
      },
    ],
  },
  a_lead: {
    collect: true,
    msg: "Nessun problema! 😊 Se vuoi, lasciami la tua email: ti invio una guida gratuita con tutto quello che devi sapere come datore di lavoro domestico.",
  },
  a_consulente: {
    collect: true,
    msg: "Sapevi che con Libra Colf puoi fare tutto da solo in 5 minuti al mese, senza consulente? 💡 Lasciami la tua email e ti mando i dettagli del piano più adatto a te.",
  },
  a_disorganizzato: {
    collect: true,
    msg: "È una situazione più comune di quanto pensi! 😅 Libra Colf ti aiuta a non dimenticare niente: scadenze, buste paga, contributi. Lasciami la tua email per una demo gratuita.",
  },
  a_nuova_chiara: {
    collect: true,
    msg: "Sei nel momento giusto per partire con il piede giusto! ✅ Lasciami la tua email: ti mostro come Libra Colf rende semplicissima tutta la procedura di assunzione.",
  },
  a_nuova_incerta: {
    collect: true,
    msg: "Nessun problema — ti aiutiamo noi! 🤝 Libra Colf guida passo per passo anche chi parte da zero. Lasciami la tua email e ti contatteremo per spiegarti tutto.",
  },
  a_excel_ok: {
    collect: true,
    msg: "Bene, sei già organizzato! 👍 Ma lo sapevi che con Libra Colf puoi ridurre quell'ora a meno di 5 minuti? Lasciami la tua email per scoprire come.",
  },
  a_excel_stress: {
    collect: true,
    msg: "Quelle 2-3 ore al mese potrebbero diventare 5 minuti. ⏱️ Senza errori, senza stress. Lasciami la tua email: ti mostriamo come funziona Libra Colf.",
  },
  a_excel_molto: {
    collect: true,
    msg: "Sei esattamente il tipo di persona per cui abbiamo costruito Libra Colf. 💪 Lasciami la tua email e ti contatteremo per una demo personalizzata — gratuita.",
  },
  b1: {
    msg: "Quanti rapporti di lavoro domestico gestisci mediamente?",
    opts: [
      { label: "📁 Fino a 10", next: "b2", data: { PRATICHE: "fino_10" } },
      { label: "📂 Da 11 a 50", next: "b2", data: { PRATICHE: "11_50" } },
      { label: "🗂 Da 51 a 200", next: "b2", data: { PRATICHE: "51_200" } },
      { label: "🏗 Oltre 200", next: "b2", data: { PRATICHE: "oltre_200" } },
    ],
  },
  b2: {
    msg: "Come li gestisci attualmente?",
    opts: [
      {
        label: "📄 Con un altro software",
        next: "b3",
        data: { GESTIONE: "altro_software" },
      },
      { label: "📊 Con Excel / fogli manuali", next: "b_excel", data: { GESTIONE: "excel" } },
      {
        label: "🧩 Ognuno si gestisce da solo",
        next: "b_disorganizzato",
        data: { GESTIONE: "disorganizzato" },
      },
    ],
  },
  b3: {
    msg: "Cosa ti manca nel tuo strumento attuale?",
    opts: [
      {
        label: "🔔 Notifiche e reminder automatici",
        next: "b_notifiche",
        data: { MANCA: "notifiche" },
      },
      { label: "⚡ Velocità di elaborazione", next: "b_velocita", data: { MANCA: "velocita" } },
      { label: "💰 Il prezzo è troppo alto", next: "b_prezzo", data: { MANCA: "prezzo" } },
      { label: "🤷 Voglio solo confrontare", next: "b_confronto", data: { MANCA: "confronto" } },
    ],
  },
  b_excel: {
    collect: true,
    msg: "Con Excel stai lasciando soldi sul tavolo — e rischiando errori costosi. 📉 Libra Colf automatizza tutto. Lasciami la tua email per una demo dedicata ai professionisti.",
  },
  b_disorganizzato: {
    collect: true,
    msg: "Se ogni assistito si gestisce da solo, il rischio errori (e le tue responsabilità) si moltiplicano. ⚠️ Lasciami la tua email: ti mostriamo come centralizzare tutto in un click.",
  },
  b_notifiche: {
    collect: true,
    msg: "Libra Colf invia reminder automatici via email e WhatsApp per ogni scadenza. 🔔 Zero dimenticanze, zero sanzioni. Lasciami la tua email per una demo gratuita.",
  },
  b_velocita: {
    collect: true,
    msg: "I nostri clienti elaborano 50 buste paga in meno di 20 minuti. ⚡ Lasciami la tua email: ti facciamo vedere come funziona in una demo live.",
  },
  b_prezzo: {
    collect: true,
    msg: "Libra Colf parte da 8,90€/mese — spesso meno del costo di un errore contributivo. 💰 Lasciami la tua email e ti inviamo il confronto prezzi completo.",
  },
  b_confronto: {
    collect: true,
    msg: "Ottima idea confrontare prima di decidere! 🔍 Lasciami la tua email: ti inviamo una scheda comparativa con tutti i dettagli di Libra Colf rispetto alle alternative.",
  },
};

const initialState: PersistedChatState = {
  isOpen: false,
  items: [],
  hasStarted: false,
  hasSeenChat: false,
  isCollectingEmail: false,
  userData: {},
  emailValue: "",
  lastSeenItemCount: 0,
};

function readPersistedState(): PersistedChatState {
  if (typeof window === "undefined") return initialState;

  const raw = window.sessionStorage.getItem(CHATBOT_STORAGE_KEY);
  if (!raw) return initialState;

  try {
    const parsed = { ...initialState, ...JSON.parse(raw) } as PersistedChatState;

    if (!Array.isArray(parsed.items)) {
      parsed.items = [];
    }

    if (parsed.items.length === 0) {
      parsed.hasStarted = false;
      parsed.isCollectingEmail = false;
    }

    return parsed;
  } catch {
    return initialState;
  }
}

function writePersistedState(state: PersistedChatState) {
  window.sessionStorage.setItem(CHATBOT_STORAGE_KEY, JSON.stringify(state));
}

function scrollToBottom(container: HTMLDivElement | null) {
  if (!container) return;

  window.setTimeout(() => {
    container.scrollTop = container.scrollHeight;
  }, 50);
}

export function FakeChatbot({ persona }: { persona: Persona }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<ChatItem[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasSeenChat, setHasSeenChat] = useState(false);
  const [isCollectingEmail, setIsCollectingEmail] = useState(false);
  const [userData, setUserData] = useState<Record<string, string>>({});
  const [emailValue, setEmailValue] = useState("");
  const [lastSeenItemCount, setLastSeenItemCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<number[]>([]);

  const hasUnreadMessage = !isOpen && items.length > lastSeenItemCount;
  const showTriggerDot = hasUnreadMessage || !hasSeenChat;

  const clearTimers = useCallback(() => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  const addAssistantMessage = useCallback((content: string) => {
    setItems((current) => [
      ...current,
      {
        id: `assistant-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        type: "message",
        role: "assistant",
        content,
      },
    ]);
  }, []);

  const addUserMessage = useCallback((content: string) => {
    setItems((current) => [
      ...current,
      {
        id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        type: "message",
        role: "user",
        content,
      },
    ]);
  }, []);

  const showOptions = useCallback((options: FlowOption[]) => {
    setItems((current) => [
      ...current,
      {
        id: `options-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        type: "options",
        options,
        disabled: false,
      },
    ]);
  }, []);

  const showTypingThen = useCallback(
    (callback: () => void) => {
      setIsTyping(true);
      const timeoutId = window.setTimeout(
        () => {
          setIsTyping(false);
          callback();
        },
        900 + Math.random() * 500
      );

      timeoutsRef.current.push(timeoutId);
    },
    []
  );

  const goToState = useCallback(
    (stateId: string, extraData?: Record<string, string>) => {
      const node = FLOW[stateId];
      if (!node) return;

      if (extraData) {
        setUserData((current) => ({ ...current, ...extraData }));
      }

      showTypingThen(() => {
        addAssistantMessage(node.msg);

        if (node.collect) {
          setIsCollectingEmail(true);
        } else if (node.opts) {
          setIsCollectingEmail(false);
          showOptions(node.opts);
        }
      });
    },
    [addAssistantMessage, showOptions, showTypingThen]
  );

  const startChat = useCallback(() => {
    setHasStarted(true);
    setUserData({ form_type: "chatbot", profile: persona });
    goToState("start");
  }, [goToState, persona]);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setHasSeenChat(true);
    setLastSeenItemCount(items.length);

    if (!hasStarted || items.length === 0) {
      startChat();
    }
  }, [hasStarted, items.length, startChat]);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOptionClick = useCallback(
    (option: FlowOption, itemId: string) => {
      setItems((current) =>
        current.map((item) =>
          item.type === "options" && item.id === itemId ? { ...item, disabled: true } : item
        )
      );

      addUserMessage(option.label);
      goToState(option.next, option.data);
    },
    [addUserMessage, goToState]
  );

  const handleEmailSubmit = useCallback(async () => {
    const trimmedEmail = emailValue.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!isValid) {
      setInputError("Inserisci un'email valida.");
      return;
    }

    setInputError(null);
    setIsCollectingEmail(false);
    setIsSubmitting(true);
    addUserMessage(trimmedEmail);

    setUserData((current) => ({ ...current, email: trimmedEmail }));

    showTypingThen(() => {
      addAssistantMessage("Perfetto! 🎉 Ti contatteremo al più presto. A presto!");
    });

    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...userData,
          email: trimmedEmail,
          form_type: "chatbot",
          profile: userData.PROFILO ?? persona,
        }),
      });
    } catch {
      // Silent by design to preserve the conversational flow.
    } finally {
      setIsSubmitting(false);
      setEmailValue("");
    }
  }, [addAssistantMessage, addUserMessage, emailValue, persona, showTypingThen, userData]);

  useEffect(() => {
    const persisted = readPersistedState();

    setIsOpen(persisted.isOpen);
    setItems(persisted.items);
    setHasStarted(persisted.hasStarted);
    setHasSeenChat(persisted.hasSeenChat);
    setIsCollectingEmail(persisted.isCollectingEmail);
    setUserData(persisted.userData);
    setEmailValue(persisted.emailValue);
    setLastSeenItemCount(persisted.lastSeenItemCount);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    writePersistedState({
      isOpen,
      items,
      hasStarted,
      hasSeenChat,
      isCollectingEmail,
      userData,
      emailValue,
      lastSeenItemCount,
    });
  }, [
    emailValue,
    hasSeenChat,
    hasStarted,
    isCollectingEmail,
    isHydrated,
    isOpen,
    items,
    lastSeenItemCount,
    userData,
  ]);

  useEffect(() => {
    if (!isHydrated || hasSeenChat) return;

    const timeoutId = window.setTimeout(() => {
      openChat();
    }, 5000);

    timeoutsRef.current.push(timeoutId);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [hasSeenChat, isHydrated, openChat]);

  useEffect(() => {
    if (!isHydrated) return;

    if (hasStarted && items.length === 0) {
      setHasStarted(false);
    }
  }, [hasStarted, isHydrated, items.length]);

  useEffect(() => {
    if (isOpen) {
      setLastSeenItemCount(items.length);
    }

    scrollToBottom(scrollRef.current);
  }, [isCollectingEmail, isOpen, isTyping, items]);

  useEffect(() => clearTimers, [clearTimers]);

  return (
    <>
      <AnimatePresence>
        {isOpen ? (
          <motion.aside
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-24 right-6 z-[180] flex h-[450px] w-[350px] flex-col overflow-hidden rounded-[24px] bg-white shadow-2xl ring-1 ring-black/8 max-sm:bottom-0 max-sm:right-0 max-sm:h-[78svh] max-sm:w-full max-sm:rounded-b-none max-sm:rounded-t-[24px]"
          >
            <div className="flex items-center justify-between bg-[#00377e] px-4 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/16 font-[var(--font-manrope)] text-sm font-extrabold">
                  LC
                </div>
                <div>
                  <p className="text-sm font-semibold">Assistente Libra Colf</p>
                  <p className="text-xs text-blue-100/80">Percorso guidato</p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Chiudi chat"
                onClick={closeChat}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/12 transition hover:bg-white/18"
              >
                <X className="h-4.5 w-4.5" strokeWidth={2.2} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4">
              <AnimatePresence initial={false}>
                {items.map((item) =>
                  item.type === "message" ? (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ type: "spring", stiffness: 360, damping: 28 }}
                      className={`flex ${item.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[86%] whitespace-pre-line rounded-[18px] px-4 py-3 text-sm leading-6 shadow-sm ${
                          item.role === "user"
                            ? "rounded-br-[6px] bg-blue-600 text-white"
                            : "rounded-bl-[6px] bg-white text-slate-800 ring-1 ring-slate-200"
                        }`}
                      >
                        {item.content}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ type: "spring", stiffness: 360, damping: 28 }}
                      className="grid gap-2"
                    >
                      {item.options.map((option) => (
                        <button
                          key={`${item.id}-${option.label}`}
                          type="button"
                          disabled={item.disabled}
                          onClick={() => handleOptionClick(option, item.id)}
                          className="flex items-center justify-between rounded-full border border-blue-600 bg-white px-4 py-3 text-left text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-600 hover:text-white disabled:cursor-default disabled:opacity-45 disabled:hover:bg-white disabled:hover:text-blue-700"
                        >
                          <span>{option.label}</span>
                          <span className="text-lg font-bold">›</span>
                        </button>
                      ))}
                    </motion.div>
                  )
                )}

                {isTyping ? (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ type: "spring", stiffness: 360, damping: 28 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-1 rounded-[18px] rounded-bl-[6px] bg-white px-4 py-3 ring-1 ring-slate-200">
                      {[0, 1, 2].map((index) => (
                        <motion.span
                          key={index}
                          animate={{ y: [0, -4, 0], opacity: [0.35, 1, 0.35] }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 0.9,
                            delay: index * 0.18,
                            ease: "easeInOut",
                          }}
                          className="h-2 w-2 rounded-full bg-slate-400"
                        />
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <AnimatePresence initial={false}>
              {isCollectingEmail ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-slate-200 bg-white p-3"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="email"
                      value={emailValue}
                      onChange={(event) => setEmailValue(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          void handleEmailSubmit();
                        }
                      }}
                      placeholder="La tua email…"
                      autoComplete="email"
                      className="min-h-11 flex-1 rounded-xl border border-slate-300 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600"
                    />
                    <button
                      type="button"
                      onClick={() => void handleEmailSubmit()}
                      disabled={isSubmitting}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700 disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" strokeWidth={2.4} />
                    </button>
                  </div>
                  {inputError ? (
                    <p className="mt-2 text-xs font-medium text-rose-500">{inputError}</p>
                  ) : null}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.aside>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        aria-label="Apri assistente guidato"
        onClick={openChat}
        className="fixed bottom-6 right-6 z-[170] inline-flex h-16 items-center gap-3 rounded-full bg-blue-600 pl-4 pr-5 text-white shadow-[0_18px_42px_rgba(37,99,235,0.42)] transition hover:-translate-y-0.5 hover:bg-blue-700"
      >
        <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/14">
          <MessageCircle className="h-5.5 w-5.5" strokeWidth={2.1} />
          {showTriggerDot ? (
            <>
              <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-rose-500" />
              <span className="absolute -right-1 -top-1 h-4 w-4 animate-ping rounded-full bg-rose-400/70" />
            </>
          ) : null}
        </span>
        <span className="text-sm font-semibold">Hai dubbi? Scrivici</span>
      </button>
    </>
  );
}
