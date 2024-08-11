'use client'

import React, { useState } from 'react'
import { Stage, Layer, Image } from 'react-konva'
import useImage from 'use-image'

const HandQuestion = ({ width, height }: any) => {
  const [background] = useImage('/questions/default-finger.png')
  const [hoveredRegion, setHoveredRegion] = useState<number | null>(null)

  const handleMouseMove = (event: any) => {
    const mouseY = event.evt.layerY
    const stepHeight = 150

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

  const [image1] = useImage('/questions/dip-highlight.png')
  const [image2] = useImage('/questions/pip-highlight.png')
  const [image3] = useImage('/questions/mcp-highlight.png')

  return (
    <Stage
      width={width}
      height={height}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredRegion(null)}
    >
      <Layer>
        {/* Background Image */}
        <Image image={background} x={0} y={0} width={width} height={height} />

        {/* Overlapping Images */}
        {hoveredRegion === 1 && (
          <Image image={image1} x={0} y={0} width={width} height={height} />
        )}
        {hoveredRegion === 2 && (
          <Image image={image2} x={0} y={0} width={width} height={height} />
        )}
        {hoveredRegion === 3 && (
          <Image image={image3} x={0} y={0} width={width} height={height} />
        )}
      </Layer>
    </Stage>
  )
}

export default HandQuestion
