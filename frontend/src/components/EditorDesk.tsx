import { useEffect, useState, useRef } from 'react';

interface EditorDeskProps {
  tab: 'text' | 'url';
  setTab: (tab: 'text' | 'url') => void;
  input: string;
  setInput: (val: string) => void;
  loading: boolean;
  onSubmit: () => void;
}

export default function EditorDesk({ tab, setTab, input, setInput, loading, onSubmit }: EditorDeskProps) {
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 700);
    return () => clearTimeout(timer);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      onSubmit();
    }
  };

  return (
    <section
      id="verificar"
      className={`max-w-3xl mx-auto px-4 mb-16 transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {/* Section label */}
      <div className="text-center mb-6">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-aged-gold">
          {'Mesa del Editor'}
        </span>
      </div>

      {/* Main card */}
      <div
        className={`relative bg-parchment-light border transition-all duration-500 ${
          focused ? 'border-warm-gray shadow-lg shadow-warm-gray/10' : 'border-warm-gray/30 shadow-sm'
        }`}
      >
        {/* Decorative top border */}
        <div className="h-[3px] bg-editorial-red" />

        {/* Tab bar */}
        <div className="flex border-b border-warm-gray/20">
          <button
            onClick={() => { setTab('text'); setInput(''); }}
            className={`
              flex-1 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 relative
              ${tab === 'text'
                ? 'text-ink bg-parchment-light'
                : 'text-warm-gray bg-parchment hover:text-ink'
              }
            `}
          >
            {'Pegar Texto'}
            {tab === 'text' && (
              <span className="absolute bottom-0 left-[10%] right-[10%] h-[3px] bg-editorial-red animate-underline-grow origin-left" />
            )}
          </button>

          <div className="w-px bg-warm-gray/20" />

          <button
            onClick={() => { setTab('url'); setInput(''); }}
            className={`
              flex-1 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 relative
              ${tab === 'url'
                ? 'text-ink bg-parchment-light'
                : 'text-warm-gray bg-parchment hover:text-ink'
              }
            `}
          >
            {'Analizar URL'}
            {tab === 'url' && (
              <span className="absolute bottom-0 left-[10%] right-[10%] h-[3px] bg-editorial-red animate-underline-grow origin-left" />
            )}
          </button>
        </div>

        {/* Input area */}
        <div className="p-6 md:p-10">
          {tab === 'text' ? (
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder="Pegue el texto del articulo aqui..."
              rows={7}
              className="w-full bg-transparent border border-warm-gray/25 p-5 font-sans text-base leading-relaxed placeholder:text-warm-gray/40 placeholder:italic focus:outline-none focus:border-warm-gray/60 resize-y transition-colors duration-300"
              aria-label="Texto del articulo"
            />
          ) : (
            <input
              ref={inputRef}
              type="url"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder="https://ejemplo.com/articulo"
              className="w-full bg-transparent border border-warm-gray/25 p-5 font-sans text-base placeholder:text-warm-gray/40 placeholder:italic focus:outline-none focus:border-warm-gray/60 transition-colors duration-300"
              aria-label="URL del articulo"
            />
          )}

          {/* Character/length hint */}
          <div className="flex items-center justify-between mt-3">
            <span className="text-[10px] text-warm-gray/50 font-bold uppercase tracking-wider">
              {tab === 'text'
                ? `${input.length} caracteres`
                : input ? 'URL ingresada' : 'Ingrese una URL valida'}
            </span>
            <span className="text-[10px] text-warm-gray/40 hidden md:block">
              {'Ctrl + Enter para analizar'}
            </span>
          </div>

          {/* Submit button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={onSubmit}
              disabled={loading || !input.trim()}
              className="group relative bg-editorial-red text-parchment-light hover:brightness-110 active:scale-[0.98] transition-all duration-300 px-12 py-4 text-[12px] font-bold tracking-[0.25em] uppercase disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden"
              aria-label="Analizar credibilidad"
            >
              {/* Hover fill effect */}
              <span className="absolute inset-0 bg-ink/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />

              <span className="relative flex items-center gap-3">
                {loading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-parchment/30 border-t-parchment rounded-full animate-spin" />
                    {'Analizando...'}
                  </>
                ) : (
                  'Analizar Credibilidad'
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
