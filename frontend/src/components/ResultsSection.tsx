import { useEffect, useState } from 'react';
import type { CheckResponse } from '../services/api';
import XAIHeatmap from './XAIHeatmap';

interface ResultsSectionProps {
  result: CheckResponse;
}

function AnimatedScore({ target, isFake }: { target: number; isFake: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame: number;
    const duration = 1200;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return (
    <span className={`font-serif text-7xl md:text-8xl font-black leading-none ${isFake ? 'text-editorial-red' : 'text-green-900'}`}>
      {count}
      <span className="text-4xl">%</span>
    </span>
  );
}

function ConfidenceBar({ value, isFake }: { value: number; isFake: boolean }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(value), 300);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="w-full h-2 bg-warm-gray/15 mt-4 overflow-hidden">
      <div
        className={`h-full transition-all duration-1000 ease-out ${isFake ? 'bg-editorial-red' : 'bg-green-800'}`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

export default function ResultsSection({ result }: ResultsSectionProps) {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const isFake = result.label === 'FAKE';
  const score = Math.round(result.confidence * 100);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100);
    const t2 = setTimeout(() => setShowDetails(true), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const analysisPoints = [
    {
      title: 'Analisis Linguistico',
      description: isFake
        ? 'El texto presenta patrones linguisticos frecuentemente asociados con contenido manipulado, incluyendo lenguaje emocional excesivo y afirmaciones absolutas.'
        : 'El texto muestra patrones linguisticos consistentes con periodismo profesional, con tono equilibrado y fuentes citadas.',
    },
    {
      title: 'Patron Semantico',
      description: isFake
        ? 'Se detectaron multiples indicadores de contenido sensacionalista y tecnicas de desinformacion conocidas.'
        : 'La estructura semantica es coherente y sigue los estandares de redaccion periodistica reconocidos.',
    },
    {
      title: 'Indicadores de Confianza',
      description: isFake
        ? 'El nivel de confianza del analisis sugiere una alta probabilidad de que el contenido sea enganoso o fabricado.'
        : 'Los indicadores de confianza senalan que el contenido es probablemente autentico y verificable.',
    },
  ];

  return (
    <section
      className={`max-w-5xl mx-auto px-4 mb-20 transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Section divider */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 h-px bg-warm-gray/30" />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-aged-gold">
          Resultados del Analisis
        </span>
        <div className="flex-1 h-px bg-warm-gray/30" />
      </div>

      {/* Verdict Banner */}
      <div
        className={`relative overflow-hidden mb-10 transition-all duration-700 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className={`w-full py-4 text-center border-y-2 ${
            isFake
              ? 'border-editorial-red bg-editorial-red/[0.04]'
              : 'border-green-800 bg-green-900/[0.04]'
          }`}
        >
          {/* Animated stamp effect */}
          <div className="verdict-stamp">
            <span className={`text-lg md:text-xl font-black tracking-[0.4em] uppercase ${
              isFake ? 'text-editorial-red' : 'text-green-900'
            }`}>
              {'VEREDICTO: '}
              {isFake ? 'SOSPECHOSO' : 'CREIBLE'}
            </span>
          </div>
        </div>
        {/* Decorative corners */}
        <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${isFake ? 'border-editorial-red/40' : 'border-green-800/40'}`} />
        <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${isFake ? 'border-editorial-red/40' : 'border-green-800/40'}`} />
        <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${isFake ? 'border-editorial-red/40' : 'border-green-800/40'}`} />
        <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${isFake ? 'border-editorial-red/40' : 'border-green-800/40'}`} />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0">

        {/* Left Column: Score */}
        <div className="md:col-span-4 md:pr-8 md:border-r md:border-warm-gray/20">
          <div className="text-center pt-2">
            <span className="section-header inline-block border-none pb-0 mb-3">
              Puntuacion de Credibilidad
            </span>

            <div className="my-4">
              <AnimatedScore target={score} isFake={isFake} />
            </div>

            <ConfidenceBar value={score} isFake={isFake} />

            <p className="text-[10px] uppercase tracking-widest text-warm-gray mt-3">
              {'Nivel de confianza: '}
              {score > 80 ? 'Muy Alto' : score > 60 ? 'Alto' : score > 40 ? 'Moderado' : 'Bajo'}
            </p>
          </div>

          {/* Executive summary */}
          <div className="mt-8 pt-6 border-t border-warm-gray/20">
            <h3 className="section-header">Resumen Ejecutivo</h3>
            <p className="font-sans text-sm leading-relaxed text-ink/80 drop-cap">
              {result.explanation_summary ||
                (isFake
                  ? 'El analisis indica que este contenido presenta caracteristicas consistentes con desinformacion. Se recomienda verificar con fuentes adicionales antes de compartir.'
                  : 'El analisis indica que este contenido presenta caracteristicas consistentes con periodismo profesional y verificable.'
                )}
            </p>
          </div>
        </div>

        {/* Right Column: Analysis Details */}
        <div
          className={`md:col-span-8 md:pl-8 transition-all duration-700 ${
            showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Heatmap */}
          <div className="mb-10">
            <h3 className="font-serif text-2xl font-bold mb-1 text-ink">
              {'Analisis de Inteligencia Artificial'}
            </h3>
            <div className="h-[2px] bg-ink mb-6" />

            <div className="mb-8">
              <h4 className="section-header">Mapa de Calor Semantico</h4>
              <div className="bg-parchment-light border border-warm-gray/15 p-5 md:p-6">
                <XAIHeatmap wordImportances={result.word_importances} />
              </div>
              <p className="text-[10px] text-warm-gray mt-2 italic">
                {'Rojo indica contribucion a "sospechoso", verde indica contribucion a "creible". Intensidad proporcional a importancia.'}
              </p>
            </div>
          </div>

          {/* Analysis breakdown in newspaper columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {analysisPoints.map((point, i) => (
              <div
                key={point.title}
                className={`${i < 2 ? 'md:border-r md:border-warm-gray/15 md:pr-6' : ''} transition-all duration-500`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <h4 className="font-serif text-sm font-bold uppercase tracking-wider border-b-2 border-ink pb-1.5 mb-3 text-ink">
                  {point.title}
                </h4>
                <p className="font-sans text-[13px] leading-relaxed text-ink/75">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
