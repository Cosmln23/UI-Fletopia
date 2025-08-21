"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./ChatWidget.module.css";

export const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  type Side = "me" | "peer";
  const [messages, setMessages] = useState<{ from: Side; text: string }[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (open) {
      // mock peer-to-peer seed
      setMessages([
        { from: "peer", text: "Salut! Aici TransCorp. Detalii despre cursă?" },
        { from: "me", text: "Bună! 3 paleți, 1200kg, Cluj → București mâine dimineață." },
        { from: "peer", text: "Perfect, pot ridica la 08:00. Trimite te rog adresa exactă." },
        { from: "me", text: "Str. Memorandumului 10, Cluj. Rampa 5." },
        { from: "peer", text: "Confirm. Trimit quote imediat." },
      ]);
      setTimeout(() => inputRef.current?.focus(), 0);
      setTimeout(() => { listRef.current?.scrollTo({ top: 99999 }); }, 30);
    } else {
      setMessages([]);
    }
  }, [open]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => { setOpen(false); setClosing(false); }, 300);
  };

  return (
    <div className={styles.root}>
      {!open && (
        <button aria-label="Open chat" className={`glass-border ${styles.fab} bg-black text-white hover:bg-white/10 transition`} onClick={() => setOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden>
            <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
          </svg>
        </button>
      )}

      {open && (
        <div className={`glass-card rounded-xl text-gray-100 ${styles.panel} ${closing ? styles.panelClosing : ""} bg-black/90`} role="dialog" aria-label="Chat" aria-modal="true">
          <div className={styles.header}>
            <div className="flex items-center gap-2 text-sm text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 15a4 4 0 0 1-4 4H7l-4 4V5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>
              Live Chat
            </div>
            <button className={`${styles.iconBtn} text-gray-300 hover:text-white`} aria-label="Close" onClick={handleClose}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
          <div ref={listRef} className={styles.messages}>
            {messages.map((m, i) => (
              <div key={i} className={`${styles.bubbleRow} ${m.from === "me" ? styles.bubbleRight : styles.bubbleLeft}`}>
                {m.from !== "me" && <div className={styles.avatar}>T</div>}
                <div className={`${styles.bubble} ${m.from === "me" ? styles.rightBubble : styles.leftBubble}`}>{m.text}</div>
                {m.from === "me" && <div className={styles.avatar}>Me</div>}
              </div>
            ))}
          </div>
          <form className={styles.inputRow} onSubmit={(e) => { e.preventDefault(); }}>
            <input ref={inputRef} className="glass-input flex-1 px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Scrie un mesaj..." />
            <button className={`glass-border ${styles.iconBtn} px-3 py-2 rounded-lg text-sm text-white bg-black hover:bg-white/5 transition`} type="submit">Trimite</button>
          </form>
        </div>
      )}
    </div>
  );
};


