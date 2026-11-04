import { useEffect, useState } from 'react'
import Hero from '../components/research/Hero.jsx'
import Manifesto from '../components/research/Manifesto.jsx'
import Practices from '../components/research/Practices.jsx'
import Method from '../components/research/Method.jsx'
import Deliverables from '../components/research/Deliverables.jsx'
import DataChart from '../components/research/DataChart.jsx'
import Engage from '../components/research/Engage.jsx'
import ResearchCTA from '../components/research/ResearchCTA.jsx'
import { hero as staticHero } from './researchData.js'
 
const API = 'http://localhost:5000/api/research'
 
// Header and footer come from Layout (see App.jsx), so this page only renders its sections.
export default function Research() {
  const [hero, setHero] = useState(staticHero)
 
  useEffect(() => {
    let active = true
 
    fetch(API)
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        const saved = data?.content || data
        if (active && saved?.hero) {
          setHero({ ...staticHero, ...saved.hero })
        }
      })
      .catch(() => {})
 
    return () => {
      active = false
    }
  }, [])
 
  return (
    <>
      <Hero hero={hero} />
      <Manifesto />
      <Practices />
      <Method />
      <Deliverables />
      <DataChart />
      <Engage />
      <ResearchCTA />
    </>
  )
}