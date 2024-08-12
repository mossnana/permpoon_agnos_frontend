'use client'

import { WithKey, WithOptionalKey } from '@/types/base'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Stage, Layer, Image } from 'react-konva'
import useImage from 'use-image'

const HandQuestion = ({ width, prevRegion = null, onChoice }: any) => {
  const height = useMemo(() => {
    return width * 1.178
  }, [width])
  const [background] = useImage('/questions/default-finger.png')
  const [dipHighlight] = useImage('/questions/dip-highlight.png')
  const [dipActive] = useImage('/questions/dip-active.png')
  const [pipHighlight] = useImage('/questions/pip-highlight.png')
  const [pipActive] = useImage('/questions/pip-active.png')
  const [mcpHighlight] = useImage('/questions/mcp-highlight.png')
  const [mcpActive] = useImage('/questions/mcp-active.png')
  const regionImageMap: WithKey<
    number,
    WithOptionalKey<'highlight', HTMLImageElement> &
      WithOptionalKey<'active', HTMLImageElement>
  > = {
    1: {
      highlight: dipHighlight,
      active: dipActive,
    },
    2: {
      highlight: pipHighlight,
      active: pipActive,
    },
    3: {
      highlight: mcpHighlight,
      active: mcpActive,
    },
  }

  const [hoveredRegion, setHoveredRegion] = useState<number | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<number | null>(
    prevRegion
  )
  useEffect(() => {
    onChoice(selectedRegion)
  }, [onChoice, selectedRegion])

  const renderRegion = (regionNumber: number) => {
    const region = regionImageMap[regionNumber]
    return (
      <>
        <Image
          id={regionNumber.toString()}
          alt="active-area"
          image={region.active}
          x={0}
          y={0}
          width={width}
          height={height}
        />
        <Image
          id={regionNumber.toString()}
          alt="highlight-area"
          image={region.highlight}
          x={0}
          y={0}
          width={width}
          height={height}
        />
      </>
    )
  }

  const onHoverRegion = (event: any) => {
    const mouseY = event.evt.layerY
    const stepHeight = height / 6.5

    for (let i = 1; i <= 3; i++) {
      if (mouseY <= stepHeight * i) {
        setHoveredRegion(i)
        break
      }

      if (i === 3) {
        setHoveredRegion(null)
      }
    }
  }

  const onClickRegion = (event: any) => {
    const id = parseInt(event.target.attrs.id)
    if (selectedRegion === id) {
      setSelectedRegion(null)
    } else {
      setSelectedRegion(parseInt(event.target.attrs.id))
    }
  }

  const renderSelectedRegion = () => {
    if (!selectedRegion) {
      return <></>
    }
    return renderRegion(selectedRegion)
  }

  const renderHoverRegion = () => {
    if (!hoveredRegion || hoveredRegion === selectedRegion) {
      return <></>
    }
    return renderRegion(hoveredRegion)
  }

  return (
    <Stage
      width={width}
      height={height}
      onMouseMove={onHoverRegion}
      onMouseLeave={() => setHoveredRegion(null)}
      onClick={onClickRegion}
    >
      <Layer>
        <Image
          alt="hand-background"
          image={background}
          x={0}
          y={0}
          width={width}
          height={height}
        />
        {renderSelectedRegion()}
        {renderHoverRegion()}
      </Layer>
    </Stage>
  )
}

export default HandQuestion
