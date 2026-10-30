import Hero from '../components/research/Hero.jsx'
import Manifesto from '../components/research/Manifesto.jsx'
import Practices from '../components/research/Practices.jsx'
import Method from '../components/research/Method.jsx'
import Deliverables from '../components/research/Deliverables.jsx'
import DataChart from '../components/research/DataChart.jsx'
import Engage from '../components/research/Engage.jsx'
import ResearchCTA from '../components/research/ResearchCTA.jsx'

// Header and footer come from Layout (see App.jsx), so this page only renders its sections.
export default function Research() {
  return (
    <>
      <Hero />
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
