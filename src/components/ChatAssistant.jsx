import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Sparkles, Minimize2 } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { getChatResponse, getQuickReplies } from '../utils/chatAssistant'
import Logo from './ui/Logo'

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          className="w-2 h-2 rounded-full bg-brand-400"
        />
      ))}
    </div>
  )
}

function formatBold(text) {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>
    }
    return part
  })
}

function renderMessage(text) {
  const parts = text.split(/(\[.*?\]\(.*?\))/g)
  return parts.map((part, i) => {
    const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/)
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          className="text-brand-300 underline underline-offset-2 hover:text-brand-200 transition-colors"
        >
          {linkMatch[1]}
        </a>
      )
    }
    return part.split('\n').map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {formatBold(line)}
        {j < arr.length - 1 && <br />}
      </span>
    ))
  })
}

export default function ChatAssistant() {
  const { t, isRtl } = useLanguage()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState([])
  const listRef = useRef(null)
  const inputRef = useRef(null)

  const quickReplies = getQuickReplies(t)

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: 'assistant', text: t('chat.welcome') }])
    }
  }, [open, messages.length, t])

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, typing])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  const sendMessage = (text) => {
    const trimmed = text.trim()
    if (!trimmed || typing) return

    setMessages((prev) => [...prev, { role: 'user', text: trimmed }])
    setInput('')
    setTyping(true)

    const delay = 600 + Math.random() * 700
    setTimeout(() => {
      const reply = getChatResponse(trimmed, { t, locale: isRtl ? 'ar' : 'en' })
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }])
      setTyping(false)
    }, delay)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  const positionClass = isRtl ? 'start-6' : 'end-6'

  return (
    <div className={`fixed bottom-6 ${positionClass} z-[120] flex flex-col items-end gap-3`}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, scale: 0.92, filter: 'blur(8px)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="w-[min(100vw-2rem,380px)] h-[min(70vh,520px)] flex flex-col rounded-2xl overflow-hidden glass border border-white/15 shadow-2xl shadow-brand-500/10 neon-glow"
          >
            {/* Header */}
            <div className="relative px-4 py-3.5 bg-gradient-to-l from-brand-600/90 to-brand-500/80 border-b border-white/10 flex items-center gap-3 shrink-0">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-black/30 flex items-center justify-center backdrop-blur-sm overflow-hidden">
                  <Logo variant="mark" size={28} animated={false} />
                </div>
                <span className="absolute -bottom-0.5 -end-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-brand-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-sm flex items-center gap-1.5">
                  {t('chat.title')}
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                </p>
                <p className="text-xs text-white/70 truncate">{t('chat.subtitle')}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label={t('chat.close')}
              >
                <Minimize2 className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center ${
                      msg.role === 'assistant'
                        ? 'bg-brand-500/20 border border-brand-500/30'
                        : 'bg-accent-500/20 border border-accent-500/30'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <Bot className="w-3.5 h-3.5 text-brand-300" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-accent-300" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'assistant'
                        ? 'bg-slate-800/80 text-slate-200 rounded-ss-sm border border-white/5'
                        : 'bg-brand-600/80 text-white rounded-se-sm'
                    }`}
                  >
                    {renderMessage(msg.text)}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-7 h-7 rounded-lg bg-brand-500/20 border border-brand-500/30 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-brand-300" />
                  </div>
                  <div className="bg-slate-800/80 rounded-2xl rounded-ss-sm border border-white/5">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && !typing && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5 shrink-0">
                {quickReplies.map((q, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 hover:bg-brand-500/20 hover:border-brand-400/50 transition-colors"
                  >
                    {q}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 bg-slate-900/50 shrink-0">
              <div className="flex gap-2 items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('chat.placeholder')}
                  disabled={typing}
                  className="flex-1 bg-slate-800/80 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all disabled:opacity-50"
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || typing}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-brand-500/25"
                  aria-label={t('chat.send')}
                >
                  <Send className={`w-4 h-4 text-white ${isRtl ? 'rotate-180' : ''}`} />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-xl shadow-brand-500/30 neon-glow border border-white/20"
        aria-label={open ? t('chat.close') : t('chat.open')}
      >
        {!open && (
          <span className="absolute inset-0 rounded-full pulse-ring bg-brand-400/30" />
        )}
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
