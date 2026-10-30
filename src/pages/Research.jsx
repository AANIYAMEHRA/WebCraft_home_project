import { useEffect, useState } from 'react'
import * as defaults from './researchData.js'
import { ResearchContext } from '../components/research/ResearchContext.jsx'
import Hero from '../components/research/Hero.jsx'
import Manifesto from '../components/research/Manifesto.jsx'
import Practices from '../components/research/Practices.jsx'
import Method from '../components/research/Method.jsx'
import Deliverables from '../components/research/Deliverables.jsx'
import DataChart from '../components/research/DataChart.jsx'
import Engage from '../components/research/Engage.jsx'
import ResearchCTA from '../components/research/ResearchCTA.jsx'

const API = 'http://localhost:5000/api/research'
const CONTENT_KEYS = Object.keys(defaults)

// Header and footer come from Layout (see App.jsx). The copy comes from the CMS when the
// API is reachable; otherwise the built-in copy in researchData.js is shown.
export default function Research() {
  const [content, setContent] = useState(defaults)

  useEffect(() => {
    let active = true

    fetch(API)
      .then((response) => {
        if (!response.ok) throw new Error('Could not load research content.')
        return response.json()
      })
      .then((data) => {
        const saved = data.research || {}
        const merged = { ...defaults }
        for (const key of CONTENT_KEYS) {
          if (saved[key] !== undefined && saved[key] !== null) merged[key] = saved[key]
        }
        if (active) setContent(merged)
      })
      .catch(() => {
        // Keep the built-in copy.
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <ResearchContext.Provider value={content}>
      <Hero />
      <Manifesto />
      <Practices />
      <Method />
      <Deliverables />
      <DataChart />
      <Engage />
      <ResearchCTA />
    </ResearchContext.Provider>
  )
}
