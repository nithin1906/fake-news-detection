import { useEffect, useState } from 'react';

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="max-w-4xl mx-auto px-4 pt-12 md:pt-20 pb-8" id="top">
      <div
        className={`text-center transition-all duration-1000 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Small dateline above headline */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-8 bg-editorial-red" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-editorial-red">
            News Verification
          </span>
          <div className="h-px w-8 bg-editorial-red" />
        </div>

        {/* Main editorial headline */}
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-black text-ink leading-[0.95] mb-6 text-balance">
          {'Is this news'}
          <br />
          <span className="relative inline-block">
            {'story true?'}
            {/* Animated underline accent */}
            <span
              className={`absolute -bottom-2 left-0 h-[3px] bg-editorial-red transition-all duration-1000 ease-out delay-700 ${
                visible ? 'w-full' : 'w-0'
              }`}
            />
          </span>
        </h2>

        {/* Subtitle */}
        <p
          className={`font-sans text-lg md:text-xl italic text-warm-gray max-w-xl mx-auto text-pretty transition-all duration-700 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {'AI-powered detection with explainable analysis. Our artificial intelligence examines every word to protect the truth.'}
        </p>

        {/* Feature badges */}
        <div
          className={`flex flex-wrap items-center justify-center gap-3 mt-8 transition-all duration-700 delay-500 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {['Semantic Analysis', 'Source Verification', 'Explainable AI'].map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-1.5 px-3 py-1 border border-warm-gray/30 text-[10px] font-bold uppercase tracking-[0.15em] text-warm-gray hover:border-editorial-red hover:text-editorial-red transition-colors duration-300"
            >
              <span className="w-1 h-1 bg-editorial-red rounded-full" />
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Ornamental flourish */}
      <div className="flourish-divider mt-12">
        <span className="text-aged-gold">{'\u2756'}</span>
      </div>
    </section>
  );
}
