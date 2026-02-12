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
        setError('Please enter a valid URL starting with http:// or https://')
        setLoading(false)
        return
      }
    }

    if (tab === 'text' && input.trim().length < 20) {
      setError('Please enter at least 20 characters of text for a reliable analysis.')
      setLoading(false)
      return
    }

    try {
      const isUrl = tab === 'url'
      const response = await checkArticle(isUrl ? undefined : input, isUrl ? input : undefined)
      setResult(response)
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Analysis failed. Please try again.'
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
