// Animated neural-network illustration for the AI Solutions hero.
export default function AiNeuralNetwork() {
    return (
        <svg viewBox="0 0 400 400" className="w-full max-w-sm lg:max-w-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="centralGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#6EDAA0" />
                    <stop offset="50%" stopColor="#2A9D8F" />
                    <stop offset="100%" stopColor="#1A6FA0" />
                </radialGradient>
                <radialGradient id="nodeGrad1" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#40B87D" />
                    <stop offset="100%" stopColor="#2A9D8F" />
                </radialGradient>
                <radialGradient id="nodeGrad2" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#2A9D8F" />
                    <stop offset="100%" stopColor="#1A6FA0" />
                </radialGradient>
                <radialGradient id="nodeGrad3" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#6EDAA0" />
                    <stop offset="100%" stopColor="#40B87D" />
                </radialGradient>
                <radialGradient id="nodeGrad4" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#1A6FA0" />
                    <stop offset="100%" stopColor="#19376D" />
                </radialGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <filter id="softGlow">
                    <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Soft ambient glow behind centre */}
            <circle cx="200" cy="200" r="90" fill="url(#centralGrad)" opacity="0.14" />
            <circle cx="200" cy="200" r="65" fill="url(#centralGrad)" opacity="0.2" />

            {/* Animated connection lines */}
            <line x1="200" y1="200" x2="80" y2="95" stroke="#2A9D8F" strokeWidth="1.5" strokeOpacity="0.55"
                strokeDasharray="6 4">
                <animate attributeName="stroke-dashoffset" values="0;-20" dur="2.4s" repeatCount="indefinite" />
            </line>
            <line x1="200" y1="200" x2="320" y2="80" stroke="#40B87D" strokeWidth="1.5" strokeOpacity="0.55"
                strokeDasharray="6 4">
                <animate attributeName="stroke-dashoffset" values="0;-20" dur="3s" repeatCount="indefinite" />
            </line>
            <line x1="200" y1="200" x2="340" y2="230" stroke="#2A9D8F" strokeWidth="1.5" strokeOpacity="0.55"
                strokeDasharray="6 4">
                <animate attributeName="stroke-dashoffset" values="0;-20" dur="2s" repeatCount="indefinite" />
            </line>
            <line x1="200" y1="200" x2="270" y2="330" stroke="#6EDAA0" strokeWidth="1.5" strokeOpacity="0.55"
                strokeDasharray="6 4">
                <animate attributeName="stroke-dashoffset" values="0;-20" dur="2.8s" repeatCount="indefinite" />
            </line>
            <line x1="200" y1="200" x2="80" y2="300" stroke="#1A6FA0" strokeWidth="1.5" strokeOpacity="0.55"
                strokeDasharray="6 4">
                <animate attributeName="stroke-dashoffset" values="0;-20" dur="3.5s" repeatCount="indefinite" />
            </line>
            <line x1="200" y1="200" x2="130" y2="340" stroke="#2A9D8F" strokeWidth="1" strokeOpacity="0.25"
                strokeDasharray="5 5">
                <animate attributeName="stroke-dashoffset" values="0;-20" dur="4s" repeatCount="indefinite" />
            </line>
            {/* Cross-connections between nodes */}
            <line x1="80" y1="95" x2="320" y2="80" stroke="#2A9D8F" strokeWidth="1" strokeOpacity="0.3"
                strokeDasharray="4 6">
                <animate attributeName="stroke-dashoffset" values="0;20" dur="5s" repeatCount="indefinite" />
            </line>
            <line x1="320" y1="80" x2="340" y2="230" stroke="#40B87D" strokeWidth="1" strokeOpacity="0.3"
                strokeDasharray="4 6">
                <animate attributeName="stroke-dashoffset" values="0;20" dur="4.5s" repeatCount="indefinite" />
            </line>
            <line x1="80" y1="300" x2="270" y2="330" stroke="#2A9D8F" strokeWidth="1" strokeOpacity="0.3"
                strokeDasharray="4 6">
                <animate attributeName="stroke-dashoffset" values="0;20" dur="6s" repeatCount="indefinite" />
            </line>

            {/* Satellite nodes */}
            {/* Node 1 - top left */}
            <circle cx="80" cy="95" r="32" fill="url(#nodeGrad1)" filter="url(#glow)" opacity="0.9">
                <animate attributeName="opacity" values="0.9;0.6;0.9" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="80" cy="95" r="32" fill="none" stroke="#6EDAA0" strokeWidth="1.5" strokeOpacity="0.4" />

            {/* Node 2 - top right */}
            <circle cx="320" cy="80" r="24" fill="url(#nodeGrad2)" filter="url(#glow)" opacity="0.85">
                <animate attributeName="opacity" values="0.85;0.55;0.85" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="320" cy="80" r="24" fill="none" stroke="#2A9D8F" strokeWidth="1.5" strokeOpacity="0.4" />

            {/* Node 3 - right mid */}
            <circle cx="340" cy="230" r="28" fill="url(#nodeGrad3)" filter="url(#glow)" opacity="0.9">
                <animate attributeName="opacity" values="0.9;0.65;0.9" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="340" cy="230" r="28" fill="none" stroke="#6EDAA0" strokeWidth="1.5" strokeOpacity="0.4" />

            {/* Node 4 - bottom right */}
            <circle cx="270" cy="330" r="20" fill="url(#nodeGrad4)" filter="url(#glow)" opacity="0.8">
                <animate attributeName="opacity" values="0.8;0.5;0.8" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="270" cy="330" r="20" fill="none" stroke="#1A6FA0" strokeWidth="1.5"
                strokeOpacity="0.55" />

            {/* Node 5 - bottom left */}
            <circle cx="80" cy="300" r="26" fill="url(#nodeGrad2)" filter="url(#glow)" opacity="0.85">
                <animate attributeName="opacity" values="0.85;0.55;0.85" dur="4.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="80" cy="300" r="26" fill="none" stroke="#2A9D8F" strokeWidth="1.5" strokeOpacity="0.4" />

            {/* Node 6 - lower left small */}
            <circle cx="130" cy="340" r="14" fill="url(#nodeGrad1)" filter="url(#glow)" opacity="0.75">
                <animate attributeName="opacity" values="0.75;0.45;0.75" dur="5s" repeatCount="indefinite" />
            </circle>

            {/* Central large node */}
            <circle cx="200" cy="200" r="58" fill="url(#centralGrad)" filter="url(#softGlow)" opacity="0.95" />
            <circle cx="200" cy="200" r="58" fill="none" stroke="#6EDAA0" strokeWidth="2" strokeOpacity="0.5">
                <animate attributeName="stroke-opacity" values="0.5;0.2;0.5" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="200" r="70" fill="none" stroke="#2A9D8F" strokeWidth="1" strokeOpacity="0.2"
                strokeDasharray="8 6">
                <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="18s"
                    repeatCount="indefinite" />
            </circle>

            {/* AI icon in centre */}
            <text x="200" y="193" textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="11"
                fontWeight="700" fill="white" opacity="1" letterSpacing="1">AI</text>
            <text x="200" y="213" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="8.5"
                fill="white" opacity="0.8">neural</text>

            {/* Pulse rings on centre */}
            <circle cx="200" cy="200" r="75" fill="none" stroke="#2A9D8F" strokeWidth="1.5" strokeOpacity="0">
                <animate attributeName="r" values="58;85;58" dur="3s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
            </circle>

            {/* Tiny data-flow dots along lines */}
            <circle r="4" fill="#6EDAA0" opacity="0.9">
                <animateMotion dur="2.4s" repeatCount="indefinite" path="M200,200 L80,95" />
            </circle>
            <circle r="3" fill="#40B87D" opacity="0.8">
                <animateMotion dur="3s" repeatCount="indefinite" path="M200,200 L320,80" />
            </circle>
            <circle r="3.5" fill="#2A9D8F" opacity="0.85">
                <animateMotion dur="2s" repeatCount="indefinite" path="M200,200 L340,230" />
            </circle>
            <circle r="3" fill="#6EDAA0" opacity="0.75">
                <animateMotion dur="2.8s" repeatCount="indefinite" path="M200,200 L270,330" />
            </circle>
            <circle r="3.5" fill="#1A6FA0" opacity="0.8">
                <animateMotion dur="3.5s" repeatCount="indefinite" path="M200,200 L80,300" />
            </circle>
        </svg>
    )
}