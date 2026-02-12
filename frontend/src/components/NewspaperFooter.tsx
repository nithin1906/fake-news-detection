export default function NewspaperFooter() {
  return (
    <footer className="border-t border-warm-gray/20 mt-12" id="acerca">
      {/* Double rule */}
      <div className="double-rule max-w-6xl mx-auto" />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          {/* About */}
          <div>
            <h5 className="font-serif text-lg font-bold mb-3 text-ink">
              Acerca de TrueSight
            </h5>
            <div className="h-px bg-editorial-red w-10 mb-4 mx-auto md:mx-0" />
            <p className="font-sans text-sm text-warm-gray leading-relaxed">
              {'Comprometidos con la verdad en la era digital. Nuestra inteligencia artificial analiza patrones linguisticos para detectar desinformacion y proteger la integridad informativa.'}
            </p>
          </div>

          {/* Links */}
          <div className="md:text-center" id="metodologia">
            <h5 className="font-serif text-lg font-bold mb-3 text-ink">
              Metodologia
            </h5>
            <div className="h-px bg-editorial-red w-10 mb-4 mx-auto" />
            <nav className="flex flex-col gap-2.5">
              {['Analisis Semantico', 'Verificacion de Fuentes', 'Machine Learning', 'Transparencia'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[11px] font-bold uppercase tracking-[0.15em] text-warm-gray hover:text-editorial-red transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="md:text-right">
            <h5 className="font-serif text-lg font-bold mb-3 text-ink">
              Contacto
            </h5>
            <div className="h-px bg-editorial-red w-10 mb-4 ml-auto hidden md:block" />
            <div className="h-px bg-editorial-red w-10 mb-4 mx-auto md:hidden" />
            <p className="font-sans text-sm text-warm-gray leading-relaxed mb-3">
              {'Equipo editorial de TrueSight'}
            </p>
            <a
              href="mailto:contacto@truesight.ai"
              className="text-[11px] font-bold uppercase tracking-[0.15em] text-editorial-red hover:text-ink transition-colors duration-300"
            >
              contacto@truesight.ai
            </a>
          </div>
        </div>

        {/* Bottom ornamental section */}
        <div className="mt-12 pt-6 border-t border-warm-gray/20">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-aged-gold/40" />
            <span className="text-aged-gold text-sm">{'\u2766'}</span>
            <div className="h-px w-12 bg-aged-gold/40" />
          </div>
          <p className="text-[10px] text-warm-gray uppercase tracking-[0.3em] text-center">
            {'\u00A9 2026 TrueSight \u2014 Verificacion de noticias impulsada por inteligencia artificial'}
          </p>
        </div>
      </div>
    </footer>
  );
}
