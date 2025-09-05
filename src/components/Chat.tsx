import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  id: string;
  from: string; // userId
  to: string;   // userId
  content: string;
  at: string;
}

export function Chat() {
  const { user } = useAuth();
  const [target, setTarget] = useState<any>(() => (window as any).__chat_target__ || null);
  const [text, setText] = useState('');
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const t = (window as any).__chat_target__;
    if (t) setTarget(t);
  }, []);

  const key = useMemo(() => {
    if (!user || !target) return null;
    const ids = [user.id, target.id].sort().join('_');
    return `chat_${ids}`;
  }, [user, target]);

  const readMessages = (): Message[] => {
    if (!key) return [];
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Message[]) : [];
  };

  const [messages, setMessages] = useState<Message[]>(readMessages());

  useEffect(() => {
    setMessages(readMessages());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const send = () => {
    if (!user || !target || !key) return;
    const content = text.trim();
    if (!content) return;
    const next: Message[] = [...messages, { id: String(Date.now()), from: user.id, to: target.id, content, at: new Date().toISOString() }];
    setMessages(next);
    localStorage.setItem(key, JSON.stringify(next));
    setText('');
  };

  if (!user || !target) {
    return <div className="max-w-2xl mx-auto text-center text-gray-600">チャット相手が選択されていません。</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="font-semibold">{target.name} さんとのチャット</div>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'profile', userId: target.id, user: target } }))}
          className="text-blue-600 text-sm hover:underline"
        >
          プロフィールを見る
        </button>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.from === user.id ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-3 py-2 rounded-lg max-w-[70%] text-sm ${m.from === user.id ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200'}`}>
              <div>{m.content}</div>
              <div className="text-[10px] opacity-70 mt-1">{new Date(m.at).toLocaleString('ja-JP')}</div>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="p-3 border-t border-gray-200 flex space-x-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="メッセージを入力"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={send}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          送信
        </button>
      </div>
    </div>
  );
}


