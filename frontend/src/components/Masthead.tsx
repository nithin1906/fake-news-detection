import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { label: 'INICIO', href: '#top', active: false },
  { label: 'VERIFICAR', href: '#verificar', active: true },
  { label: 'ACERCA DE', href: '#acerca', active: false },
  { label: 'METODOLOGIA', href: '#metodologia', active: false },
];

const TICKER_ITEMS = [
  'La verdad es el fundamento de la democracia',
  'Verificacion impulsada por inteligencia artificial',
  'Analisis semantico en tiempo real',
  'Protegiendo la integridad informativa',
  'Transparencia y confianza editorial',
  'Combatiendo la desinformacion digital',
];

export default function Masthead() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedDate = today.charAt(0).toUpperCase() + today.slice(1);

  return (
    <header
      className={`relative transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      {/* Top red editorial rule */}
      <div className="h-1 bg-editorial-red w-full" />

      {/* News Ticker */}
      <div className="bg-ink/95 text-parchment py-1.5 news-ticker">
        <div className="news-ticker-content">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center text-[10px] uppercase tracking-[0.3em] font-bold">
              <span className="text-editorial-red mx-4">{'\u25C6'}</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-6 pb-2">
        {/* Date and edition line */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-warm-gray hidden md:block">
            {formattedDate}
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-warm-gray hidden md:block">
            {'Ano I'} {'\u2014'} {'No. 001'}
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-warm-gray hidden md:block">
            {'Edicion Digital'}
          </span>
        </div>

        {/* Thin rule above masthead */}
        <div className="h-px bg-warm-gray/60 mb-2" />
        <div className="h-[2px] bg-ink mb-2" />

        {/* Masthead title */}
        <div className="text-center py-4 relative">
          {/* Decorative corner flourishes */}
          <div className="absolute top-0 left-0 text-aged-gold text-2xl opacity-60 hidden lg:block">{'\u2766'}</div>
          <div className="absolute top-0 right-0 text-aged-gold text-2xl opacity-60 hidden lg:block">{'\u2767'}</div>

          <h1 className="font-serif text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tight text-ink leading-none select-none">
            TrueSight
          </h1>
          <p className="font-sans text-sm md:text-base text-warm-gray italic mt-2 tracking-wide">
            {'La voz de la verdad en la era digital'}
          </p>
        </div>

        {/* Double rule below masthead */}
        <div className="h-[2px] bg-ink mt-1" />
        <div className="h-px bg-warm-gray/60 mt-2" />

        {/* Navigation */}
        <nav className="flex justify-center items-center py-3 mt-1">
          <div className="flex items-center gap-1 md:gap-6">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className={`
                  relative px-3 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300
                  ${link.active
                    ? 'text-editorial-red tab-active-underline'
                    : 'text-warm-gray hover:text-ink'
                  }
                `}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Bottom thin rule */}
        <div className="h-px bg-warm-gray/30" />
      </div>
    </header>
  );
}
