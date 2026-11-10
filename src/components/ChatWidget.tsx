import { FormEvent, useEffect, useId, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import './chat-widget.css';

type Source = { title?: string; file?: string };
type Msg = { id: string; role: 'user' | 'bot'; text: string; sources?: Source[] };

const SESSION_KEY = 'vku_site_chat_session';
const FALLBACK_SUGGESTIONS = [
  'Học phí học kỳ 1 năm 2025-2026?',
  'Thời gian thu học phí học kỳ 2?',
  'Địa chỉ VKU ở đâu?',
];

function sourceLabel(source: Source) {
  return source.title || source.file || 'Tài liệu';
}

/** On EC2 preview (:5173), call FastAPI on :8000 directly. */
function apiUrl(path: string) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (typeof window === 'undefined') return normalized;
  const fromEnv = import.meta.env.VITE_API_BASE as string | undefined;
  if (fromEnv) return `${fromEnv.replace(/\/$/, '')}${normalized}`;
  const { protocol, hostname, port } = window.location;
  if (port === '5173' || port === '4173') {
    return `${protocol}//${hostname}:8000${normalized}`;
  }
  return normalized;
}

export default function ChatWidget() {
  const titleId = useId();
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [suggestions, setSuggestions] = useState(FALLBACK_SUGGESTIONS);
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 'hello',
      role: 'bot',
      text: 'Xin chào! Mình là trợ lý học vụ và tuyển sinh VKU. Bạn có thể hỏi về học phí, quy chế hoặc tuyển sinh.',
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const sessionRef = useRef<string | null>(
    typeof localStorage === 'undefined' ? null : localStorage.getItem(SESSION_KEY),
  );

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    let cancelled = false;
    fetch(apiUrl('/api/suggestions'))
      .then((response) => {
        if (!response.ok) throw new Error('suggestions');
        return response.json() as Promise<{ suggestions?: string[] }>;
      })
      .then((data) => {
        if (!cancelled && data.suggestions?.length) {
          setSuggestions(data.suggestions.slice(0, 3));
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [open]);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, open, busy]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      setOpen(false);
      launcherRef.current?.focus();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  function close() {
    setOpen(false);
    launcherRef.current?.focus();
  }

  async function send(text: string) {
    const message = text.trim();
    if (!message || busy) return;
    setInput('');
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'user', text: message }]);
    setBusy(true);
    try {
      const response = await fetch(apiUrl('/api/chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, session_id: sessionRef.current }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = (await response.json()) as {
        session_id?: string;
        answer?: string;
        sources?: Source[];
      };
      if (data.session_id) {
        sessionRef.current = data.session_id;
        localStorage.setItem(SESSION_KEY, data.session_id);
      }
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'bot',
          text: data.answer || 'Mình chưa có câu trả lời cho câu này.',
          sources: Array.isArray(data.sources) ? data.sources.slice(0, 2) : [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'bot',
          text: 'Không kết nối được trợ lý. Hãy chắc backend đang chạy ở cổng 8000 rồi thử lại.',
        },
      ]);
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void send(input);
  }

  const asked = messages.some((message) => message.role === 'user');

  return (
    <div className="vku-chat">
      {open && (
        <section className="vku-chat-panel" id={panelId} role="dialog" aria-labelledby={titleId}>
          <header className="vku-chat-header">
            <div>
              <p className="vku-chat-kicker">VKU</p>
              <h2 id={titleId}>Trợ lý học vụ</h2>
            </div>
            <button type="button" className="vku-chat-close" onClick={close} aria-label="Đóng khung chat">
              <X size={18} aria-hidden="true" />
            </button>
          </header>
          <div className="vku-chat-messages" ref={listRef} aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={`vku-chat-msg vku-chat-msg-${message.role}`}>
                <p>{message.text}</p>
                {message.sources && message.sources.length > 0 && (
                  <ul className="vku-chat-sources">
                    {message.sources.map((source, index) => (
                      <li key={`${sourceLabel(source)}-${index}`}>{sourceLabel(source)}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            {busy && (
              <div className="vku-chat-msg vku-chat-msg-bot">
                <p>Đang tìm trong tài liệu…</p>
              </div>
            )}
          </div>
          {!asked && (
            <div className="vku-chat-suggestions">
              {suggestions.map((question) => (
                <button key={question} type="button" onClick={() => void send(question)} disabled={busy}>
                  {question}
                </button>
              ))}
            </div>
          )}
          <form className="vku-chat-composer" onSubmit={onSubmit}>
            <label className="sr-only" htmlFor="vku-chat-input">
              Câu hỏi cho trợ lý
            </label>
            <input
              id="vku-chat-input"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Nhập câu hỏi…"
              autoComplete="off"
              disabled={busy}
            />
            <button type="submit" aria-label="Gửi câu hỏi" disabled={busy || !input.trim()}>
              <Send size={18} aria-hidden="true" />
            </button>
          </form>
        </section>
      )}
      <button
        ref={launcherRef}
        type="button"
        className="vku-chat-launcher"
        aria-label={open ? 'Đóng trợ lý ảo' : 'Mở trợ lý ảo'}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={26} aria-hidden="true" /> : <MessageCircle size={26} aria-hidden="true" />}
      </button>
    </div>
  );
}
