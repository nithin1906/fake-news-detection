import { useState } from 'react'
import { checkArticle, type CheckResponse } from './services/api'
import XAIHeatmap from './components/XAIHeatmap'
import { Share2, Search, Bookmark } from 'lucide-react'

// Mock data for initial design verify if needed, but we have real API
// const mockResult = ...

function App() {
  const [tab, setTab] = useState<'text' | 'url'>('text')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CheckResponse | null>(null)
  const [error, setError] = useState<string | null>(null)


  const handleCheck = async () => {
    setLoading(true);
    setError(null);

    // Frontend validation
    if (tab === 'url') {
      if (!input.match(/^(http|https):\/\/[^ "]+$/)) {
        setError("Por favor ingrese una URL válida que comience con http:// o https://");
        setLoading(false);
        return;
      }
    }

    try {
      const isUrl = tab === 'url';
      // Simulating API call for design check if needed, but using real API
      const response = await checkArticle(isUrl ? undefined : input, isUrl ? input : undefined);
      setResult(response);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Error al analizar. Por favor intente de nuevo.";
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const formattedDate = today.charAt(0).toUpperCase() + today.slice(1);

  return (
    <div className="min-h-screen bg-parchment text-ink font-sans selection:bg-editorial-red/20">

      {/* 4a. Masthead / Header */}
      <header className="border-b border-warm-gray/30 relative">
        <div className="h-0.5 bg-editorial-red w-full absolute top-0"></div>

        <div className="max-w-6xl mx-auto px-4 pt-8 pb-4">
          <div className="flex justify-between items-end border-b-2 border-warm-gray mb-1 pb-2">
            <span className="text-xs uppercase tracking-widest font-bold text-warm-gray hidden md:block">
              {formattedDate}
            </span>
            <div className="text-center flex-1">
              <h1 className="font-serif text-5xl md:text-7xl font-black tracking-tighter text-ink mb-2">
                TrueSight
              </h1>
            </div>
            <span className="text-xs uppercase tracking-widest font-bold text-warm-gray hidden md:block">
              Edición Digital
            </span>
          </div>

          <div className="border-t border-warm-gray py-2 flex justify-center space-x-8 text-xs font-bold tracking-[0.2em] text-warm-gray">
            <a href="#" className="hover:text-editorial-red transition-colors">INICIO</a>
            <a href="#" className="hover:text-editorial-red transition-colors text-editorial-red">VERIFICAR</a>
            <a href="#" className="hover:text-editorial-red transition-colors">ACERCA DE</a>
            <a href="#" className="hover:text-editorial-red transition-colors">METODOLOGÍA</a>
          </div>
        </div>
      </header>

      {/* 4b. Hero / Headline Section */}
      <main className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-balance mb-4 text-ink">
            ¿Es verdadera esta noticia?
          </h2>
          <p className="font-serif text-xl italic text-warm-gray text-pretty">
            Detección impulsada por IA con análisis explicable.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8 opacity-60">
            <div className="h-px bg-warm-gray w-24"></div>
            <span className="text-warm-gray text-xl">♦</span>
            <div className="h-px bg-warm-gray w-24"></div>
          </div>
        </div>

        {/* 4c. Input Section — "The Editor's Desk" */}
        <div className="bg-parchment-light border border-warm-gray/40 shadow-sm mb-16 relative">
          <div className="absolute -top-10 left-0 right-0 flex justify-center space-x-4">
            <button
              onClick={() => setTab('text')}
              className={`px-6 py-2 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ${tab === 'text'
                ? 'text-ink border-b-4 border-editorial-red'
                : 'text-warm-gray hover:text-ink'
                }`}
            >
              Pegar Texto
            </button>
            <button
              onClick={() => setTab('url')}
              className={`px-6 py-2 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ${tab === 'url'
                ? 'text-ink border-b-4 border-editorial-red'
                : 'text-warm-gray hover:text-ink'
                }`}
            >
              Analizar URL
            </button>
          </div>

          <div className="p-8 md:p-12">
            {tab === 'text' ? (
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pegue el texto del artículo aquí..."
                className="w-full min-h-[200px] bg-transparent border border-warm-gray/30 p-4 font-serif text-lg leading-relaxed placeholder:text-warm-gray/50 focus:outline-none focus:border-warm-gray focus:ring-1 focus:ring-warm-gray/50 resize-y"
              />
            ) : (
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="https://ejemplo.com/articulo"
                className="w-full bg-transparent border border-warm-gray/30 p-4 font-serif text-lg placeholder:text-warm-gray/50 focus:outline-none focus:border-warm-gray focus:ring-1 focus:ring-warm-gray/50"
              />
            )}

            <div className="mt-8 flex justify-center">
              <button
                onClick={handleCheck}
                disabled={loading || !input}
                className="bg-editorial-red text-parchment hover:brightness-110 active:scale-[0.99] transition-all px-10 py-4 text-sm font-bold tracking-[0.2em] uppercase shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin text-xl">⟳</span> Analizando...
                  </span>
                ) : (
                  'Analizar Credibilidad'
                )}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-12 border-l-4 border-editorial-red bg-red-50/50 p-6 text-editorial-red font-serif italic">
            {error}
          </div>
        )}

        {/* 4d. Results Section — "The Front Page" */}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom duration-700">
            {/* Verdict Banner */}
            <div className={`w-full py-3 mb-8 text-center border-y-2 border-double ${result.label === 'FAKE' ? 'border-editorial-red bg-editorial-red/5' : 'border-green-800 bg-green-50'
              }`}>
              <span className={`text-xl font-bold tracking-[0.3em] uppercase ${result.label === 'FAKE' ? 'text-editorial-red' : 'text-green-900'
                }`}>
                VEREDICTO: {result.label === 'FAKE' ? 'SOSPECHOSO' : 'CREÍBLE'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

              {/* Left Column: Score & Summary */}
              <div className="md:col-span-4 border-r border-warm-gray/20 md:pr-8">
                <div className="mb-8 text-center pt-4">
                  <span className="block text-xs font-bold tracking-widest text-warm-gray mb-2 uppercase">Puntuación de Credibilidad</span>
                  <div className={`font-serif text-8xl font-black leading-none ${result.label === 'FAKE' ? 'text-editorial-red' : 'text-green-900'
                    }`}>
                    {Math.round(result.confidence * 100)}%
                  </div>
                </div>

                <div className="prose prose-p:font-serif prose-p:text-ink prose-headings:font-serif prose-headings:font-bold">
                  <h3 className="uppercase tracking-widest text-xs font-bold border-b border-warm-gray pb-2 mb-4">Resumen Ejecutivo</h3>
                  <p className="first-letter:text-5xl first-letter:font-bold first-letter:font-serif first-letter:mr-2 first-letter:float-left first-letter:leading-none">
                    {/* Using the explanation summary or a default text */}
                    {result.explanation_summary || "El análisis indica que este contenido tiene características consistentes con..."}
                  </p>
                </div>
              </div>

              {/* Center/Right Column: Analysis Details */}
              <div className="md:col-span-8">
                <div className="mb-10">
                  <h3 className="font-serif text-2xl font-bold mb-6 border-b-2 border-black pb-2">Análisis de Inteligencia Artificial</h3>

                  {/* Heatmap Section */}
                  <div className="mb-8">
                    <h4 className="uppercase tracking-widest text-xs font-bold text-warm-gray mb-4">MAPA DE CALOR SEMÁNTICO</h4>
                    <div className="bg-white p-6 border border-warm-gray/20">
                      <XAIHeatmap wordImportances={result.word_importances} />
                    </div>
                  </div>

                  {/* Explainable Insights items would go here if we had detailed breakdown in API, 
                      for now we can structure the explanation summary into points if possible or just leave it */}
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* 4e. Footer */}
      <footer className="border-t border-double border-warm-gray/30 mt-20 bg-parchment-light">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h5 className="font-bold tracking-widest text-xs uppercase mb-4">Acerca de TrueSight</h5>
              <p className="font-serif text-sm text-warm-gray leading-relaxed">
                Comprometidos con la verdad en la era digital. Nuestra inteligencia artificial analiza patrones lingüísticos para detectar desinformación.
              </p>
            </div>
            <div className="md:text-center">
              <h5 className="font-bold tracking-widest text-xs uppercase mb-4">Enlaces Rápidos</h5>
              <div className="flex flex-col space-y-2 text-xs font-bold tracking-wide text-warm-gray">
                <a href="#" className="hover:text-editorial-red">METODOLOGÍA</a>
                <a href="#" className="hover:text-editorial-red">EQUIPO EDITORIAL</a>
                <a href="#" className="hover:text-editorial-red">CONTACTO</a>
              </div>
            </div>
            <div className="md:text-right">
              <h5 className="font-bold tracking-widest text-xs uppercase mb-4">Síguenos</h5>
              <div className="flex justify-center md:justify-end space-x-4 text-warm-gray">
                <Share2 size={16} />
                <Search size={16} />
                <Bookmark size={16} />
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-warm-gray/20 text-center">
            <p className="text-xs text-warm-gray uppercase tracking-widest">
              © 2026 TrueSight — Verificación de noticias impulsada por inteligencia artificial
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
