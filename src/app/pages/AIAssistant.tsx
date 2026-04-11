import { useState } from 'react';
import { MessageSquare, CircleDot, Send } from 'lucide-react';

interface ChatMessage {
  id: number;
  role: 'assistant' | 'user';
  text: string;
}

const defaultMessages: ChatMessage[] = [
  {
    id: 1,
    role: 'assistant',
    text: 'Halo! Saya adalah AI Cooking Assistant Anda. Saya siap membantu dengan:\n\n• Saran resep berdasarkan bahan yang tersedia\n• Bahan pengganti ketika bahan utama tidak ada\n• Teknik memasak dan tips dapur\n• Cara memanfaatkan sisa bahan agar tidak terbuang',
  },
];

const quickReplies = [
  'Cara memasak resep ini?',
  'Apa pengganti bahan ini?',
  'Bagaimana memanfaatkan sisa bahan?',
  'Bumbu dasar indor',
];

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(defaultMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNewConversation = () => {
    setMessages(defaultMessages);
    setInput('');
    setError(null);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const trimmed = input.trim();
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      role: 'user',
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!response.ok) {
        throw new Error('Gagal memproses permintaan.');
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: messages.length + 2,
        role: 'assistant',
        text: data.reply || 'Maaf, saya belum bisa menjawab sekarang.',
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan saat mengambil balasan AI. Silakan coba lagi.');
      const assistantMessage: ChatMessage = {
        id: messages.length + 2,
        role: 'assistant',
        text: 'Maaf, saya tidak bisa menjawab sekarang. Silakan coba lagi nanti.',
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    setInput(reply);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F2] px-4 py-8" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[320px_1fr]">
        <div className="rounded-[28px] border border-[#E9E7E2] bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-3 border-b border-[#E9E7E2] pb-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FAF4E9] text-[#C47F2A]">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#2C1B10]">Riwayat Chat</p>
              <p className="text-xs text-[#7F735E]">Percakapan yang tersimpan</p>
            </div>
          </div>

          <button
            onClick={handleNewConversation}
            className="mt-6 flex w-full items-center justify-center rounded-2xl bg-[#2A552F] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#244d28]"
          >
            + Percakapan Baru
          </button>

          <div className="mt-8 space-y-3">
            <div className="rounded-3xl bg-[#F2F4F6] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7C8D]">Chef AI</p>
              <p className="mt-2 text-sm text-[#1E2F31]">AI yang siap membantu Anda memasak lebih pintar dan mengurangi food waste.</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-[#3C522D]">
                <CircleDot className="h-3 w-3 text-[#3C522D]" />
                <span>Online</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-[#E9E7E2] bg-[#F5EAC8] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col gap-4 rounded-[32px] bg-[#274524] p-6 text-white shadow-[0_12px_24px_rgba(0,0,0,0.12)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-[#D4A96A]">AI Cooking Assistant</p>
                <h1 className="mt-2 text-2xl font-semibold">Siap membantu perjalanan memasak Anda</h1>
              </div>
              <div className="rounded-2xl bg-[#2C3F24] px-3 py-2 text-sm text-[#C7D4B3]">Online</div>
            </div>
            <p className="text-sm leading-7 text-[#F0E7C4]">
              Halo! Saya adalah AI Cooking Assistant Anda. Saya siap membantu dengan:
            </p>
            <ul className="space-y-2 text-sm text-[#F0E7C4]">
              <li>• Saran resep berdasarkan bahan yang tersedia</li>
              <li>• Bahan pengganti ketika bahan utama tidak ada</li>
              <li>• Teknik memasak dan tips dapur</li>
              <li>• Cara memanfaatkan sisa bahan agar tidak terbuang</li>
            </ul>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[280px_1fr]">
            <div className="rounded-[28px] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
              <p className="text-sm font-semibold text-[#2E2C29]">Riwayat Chat</p>
              <p className="mt-2 text-xs text-[#817662]">Percakapan terakhir akan tersimpan di sini.</p>
              <div className="mt-4 space-y-3 border-t border-[#ECE6D8] pt-4">
                <div className="rounded-3xl bg-[#F8F4E8] p-4">
                  <p className="text-sm font-semibold text-[#2E2C29]">Percakapan Baru</p>
                  <p className="text-xs text-[#7B7060]">0 pesan</p>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] bg-[#FFFFFF] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`rounded-3xl p-4 ${message.role === 'assistant' ? 'bg-[#F8F4E8] text-[#2E2C29]' : 'bg-[#2A552F] text-white self-end'}`}>
                    <p className="whitespace-pre-line text-sm leading-6">{message.text}</p>
                  </div>
                ))}
                {loading && (
                  <div className="rounded-3xl bg-[#F8F4E8] p-4 text-sm text-[#2E2C29]">Memproses permintaan...</div>
                )}
                {error && (
                  <div className="rounded-3xl bg-[#FFE7E5] p-4 text-sm text-[#8B271B]">{error}</div>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    className="rounded-full border border-[#E8D8B2] bg-[#FFF7E7] px-4 py-2 text-xs font-semibold text-[#7F6A3A] transition hover:bg-[#F1E0C7]"
                  >
                    {reply}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-[24px] border border-[#E6D9B9] bg-[#FFF9EE] p-3">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => event.key === 'Enter' && handleSend()}
                  placeholder="Tanyakan tentang resep, bahan pengganti, atau tips memasak..."
                  className="w-full bg-transparent text-sm text-[#2E2C29] outline-none placeholder:text-[#9E8C6E]"
                  disabled={loading}
                />
                <button
                  onClick={handleSend}
                  disabled={loading}
                  className="rounded-full bg-[#EE3F24] px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(238,63,36,0.2)] transition hover:bg-[#d7371d] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AIAssistant };