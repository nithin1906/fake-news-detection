import { useState, useRef, useEffect } from 'react'
import { checkArticle, type CheckResponse } from './services/api'
import Masthead from './components/Masthead'
import Hero from './components/Hero'
import EditorDesk from './components/EditorDesk'
import ResultsSection from './components/ResultsSection'
import ErrorBanner from './components/ErrorBanner'
import NewspaperFooter from './components/NewspaperFooter'

function App() {
  const [tab, setTab] = useState<'text' | 'url'>('text')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CheckResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleCheck = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    if (tab === 'url') {
      if (!input.match(/^(http|https):\/\/[^ "]+$/)) {
        setError('Por favor ingrese una URL valida que comience con http:// o https://')
        setLoading(false)
        return
      }
    }

    if (tab === 'text' && input.trim().length < 20) {
      setError('Por favor ingrese al menos 20 caracteres de texto para un analisis confiable.')
      setLoading(false)
      return
    }

    try {
      const isUrl = tab === 'url'
      const response = await checkArticle(isUrl ? undefined : input, isUrl ? input : undefined)
      setResult(response)
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Error al analizar. Por favor intente de nuevo.'
      setError(errorMessage)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Scroll to results when they appear
  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [result])

  return (
    <div className="min-h-screen bg-parchment text-ink font-sans">
      <Masthead />

      <main>
        <Hero />
        <EditorDesk
          tab={tab}
          setTab={setTab}
          input={input}
          setInput={setInput}
          loading={loading}
          onSubmit={handleCheck}
        />

        {error && <ErrorBanner message={error} />}

        <div ref={resultsRef}>
          {result && <ResultsSection result={result} />}
        </div>
      </main>

      <NewspaperFooter />
    </div>
  )
}

export default App
