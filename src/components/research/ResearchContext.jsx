import { createContext, useContext } from 'react'
import * as defaults from '../../pages/researchData.js'

// Holds the research page content. Starts with the built-in defaults, and Research.jsx
// replaces them with the copy saved in the CMS once it has loaded.
export const ResearchContext = createContext(defaults)

export const useResearch = () => useContext(ResearchContext)
