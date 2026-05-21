import { useEffect, useRef } from 'react'
import { NeatGradient } from '@firecms/neat'

const GRADIENT_CONFIG = {
  colors: [
    { color: '#F5E6A3', enabled: true },
    { color: '#C8EFD4', enabled: true },
    { color: '#FDDBB8', enabled: true },
    { color: '#D9D4F0', enabled: true },
    { color: '#F2CEDD', enabled: true },
    { color: '#C5E0F5', enabled: true },
  ],
  speed: 2.5,
  horizontalPressure: 3,
  verticalPressure: 4,
  waveFrequencyX: 2,
  waveFrequencyY: 3,
  waveAmplitude: 5,
  shadows: 1,
  highlights: 5,
  colorBrightness: 1,
  colorSaturation: 5,
  wireframe: false,
  colorBlending: 8,
  backgroundColor: '#F6F4EF',
  backgroundAlpha: 1,
  grainScale: 0,
  grainSparsity: 0,
  grainIntensity: 0,
  grainSpeed: 1,
  resolution: 1,
  yOffset: 94,
  yOffsetWaveMultiplier: 4,
  yOffsetColorMultiplier: 4,
  yOffsetFlowMultiplier: 4,
  flowDistortionA: 0,
  flowDistortionB: 0,
  flowScale: 1,
  flowEase: 0,
  flowEnabled: true,
  enableProceduralTexture: false,
  textureVoidLikelihood: 0.45,
  textureVoidWidthMin: 200,
  textureVoidWidthMax: 486,
  textureBandDensity: 2.15,
  textureColorBlending: 0.01,
  textureSeed: 333,
  textureEase: 0.5,
  proceduralBackgroundColor: '#000000',
  textureShapeTriangles: 20,
  textureShapeCircles: 15,
  textureShapeBars: 15,
  textureShapeSquiggles: 10,
  domainWarpEnabled: false,
  domainWarpIntensity: 0,
  domainWarpScale: 3,
  vignetteIntensity: 0,
  vignetteRadius: 0.8,
  fresnelEnabled: false,
  fresnelPower: 2,
  fresnelIntensity: 0.5,
  fresnelColor: '#FFFFFF',
  iridescenceEnabled: false,
  iridescenceIntensity: 0.5,
  iridescenceSpeed: 1,
  bloomIntensity: 0,
  bloomThreshold: 0.7,
  chromaticAberration: 0,
}

export function NeatGradientBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gradientRef = useRef<NeatGradient | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    gradientRef.current = new NeatGradient({
      ref: canvasRef.current,
      ...GRADIENT_CONFIG,
    })

    const handleScroll = () => {
      if (gradientRef.current) {
        gradientRef.current.yOffset = window.scrollY
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      gradientRef.current?.destroy()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
    />
  )
}
