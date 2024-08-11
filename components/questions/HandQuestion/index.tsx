'use client'

import { useEffect, useState } from 'react'
import { Stage, Layer, Image } from 'react-konva'
import useImage from 'use-image'

const HandQuestion = ({ width, prevRegion = null, onChoice }: any) => {
  const [background] = useImage('/questions/default-finger.png')
  const [dipHighlight] = useImage('/questions/dip-highlight.png')
  const [dipActive] = useImage('/questions/dip-active.png')
  const [pipHighlight] = useImage('/questions/pip-highlight.png')
  const [pipActive] = useImage('/questions/pip-active.png')
  const [mcpHighlight] = useImage('/questions/mcp-highlight.png')
  const [mcpActive] = useImage('/questions/mcp-active.png')

  const [hoveredRegion, setHoveredRegion] = useState<number | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<number | null>(prevRegion)
  useEffect(() => {
    onChoice(selectedRegion)
  })

  const positionMapping: Record<number, any> = {
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

  const height = width * 1.178

  const onMouseMove = (event: any) => {
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

  const onClick = (event: any) => {
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

    const selected = positionMapping[selectedRegion]
    return (
      <>
        <Image
          image={selected.active}
          x={0}
          y={0}
          width={width}
          height={height}
        />
        <Image
          image={selected.highlight}
          x={0}
          y={0}
          width={width}
          height={height}
        />
      </>
    )
  }

  const renderHoverRegion = () => {
    if (!hoveredRegion || hoveredRegion === selectedRegion) {
      return <></>
    }

    const selected = positionMapping[hoveredRegion]
    if (!selected) {
      return <></>
    }

    return (
      <>
        <Image
          id={`${hoveredRegion}`}
          image={selected.active}
          x={0}
          y={0}
          width={width}
          height={height}
        />
        <Image
          id={`${hoveredRegion}`}
          image={selected.highlight}
          x={0}
          y={0}
          width={width}
          height={height}
        />
      </>
    )
  }

  return (
    <Stage
      width={width}
      height={height}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setHoveredRegion(null)}
      onClick={onClick}
    >
      <Layer>
        <Image image={background} x={0} y={0} width={width} height={height} />
        {renderSelectedRegion()}
        {renderHoverRegion()}
      </Layer>
    </Stage>
  )
}

export default HandQuestion
