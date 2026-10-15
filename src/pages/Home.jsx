import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from '../components/Hero.jsx'
import Belief from '../components/Belief.jsx'
import WhatWeDo from '../components/WhatWeDo.jsx'
import WhyWebcraft from '../components/WhyWebcraft.jsx'
import Approach from '../components/Approach.jsx'
import Products from '../components/Products.jsx'
import AiStack from '../components/AiStack.jsx'
import CtaSection from '../components/CtaSection.jsx'

export default function Home() {
  // Images/videos lazy loading
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    const t = setTimeout(refresh, 300)
    window.addEventListener('load', refresh)
    return () => {
      clearTimeout(t)
      window.removeEventListener('load', refresh)
    }
  }, [])

  return (
    <>
      <Hero />
      <Belief />
      <WhatWeDo />
      <WhyWebcraft />
      <Approach />
      <Products />
      <AiStack />
      <CtaSection />
    </>
  )
}
