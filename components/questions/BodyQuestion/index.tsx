'use client'

import { voronoi } from 'd3-voronoi'
import { Fragment, useEffect, useState } from 'react'
import { Stage, Layer, Image, Shape, Line } from 'react-konva'
import useImage from 'use-image'

const BodyQuestion = ({ width, prevRegion = null, onChoice }: any) => {
  const [background] = useImage('/questions/default-abs.png')
  const [epigastriumHighlight] = useImage(
    '/questions/epigastrium-highlight.png'
  )
  const [epigastriumActive] = useImage('/questions/epigastrium-active.png')
  const [rugHighlight] = useImage('/questions/ruq-highlight.png')
  const [rugActive] = useImage('/questions/ruq-active.png')
  const [rlqHighlight] = useImage('/questions/rlq-highlight.png')
  const [rlqActive] = useImage('/questions/rlq-active.png')
  const [suprapubicHighlight] = useImage('/questions/suprapubic-highlight.png')
  const [suprapubicActive] = useImage('/questions/suprapubic-active.png')
  const [llqHighlight] = useImage('/questions/llq-highlight.png')
  const [llqActive] = useImage('/questions/llq-Active.png')
  const [luqHighlight] = useImage('/questions/luq-highlight.png')
  const [luqActive] = useImage('/questions/luq-active.png')
  const [umbilicusHighlight] = useImage('/questions/umbilicus-highlight.png')
  const [umbilicusActive] = useImage('/questions/umbilicus-active.png')

  const [prevRegionIndex, setPrevRegionIndex] = useState(prevRegion)
  useEffect(() => {
    onChoice(prevRegionIndex)
  }, [onChoice, prevRegionIndex])
  const [voronoiCells, setVoronoiCells] = useState([])
  const images = [
    epigastriumHighlight,
    rugHighlight,
    rlqHighlight,
    suprapubicHighlight,
    llqHighlight,
    luqHighlight,
    umbilicusHighlight,
  ]
  const actives = [
    epigastriumActive,
    rugActive,
    rlqActive,
    suprapubicActive,
    llqActive,
    luqActive,
    umbilicusActive,
  ]
  const points = [
    [242, 235],
    [190, 280],
    [190, 340],
    [240, 370],
    [290, 340],
    [290, 275],
    [240, 310],
  ]
  const height = width * 1.178
  useEffect(() => {
    if (background) {
      const voronoiDiagram = voronoi().extent([
        [0, 0],
        [width, height],
      ])
      const diagram = voronoiDiagram(points as [number, number][])
      setVoronoiCells(diagram.polygons() as never[])
    }
  }, [background, width, height])

  return (
    <Stage width={width} height={height}>
      <Layer>
        <Image alt='background' image={background} width={width} height={height} x={0} y={0} />
        {prevRegionIndex !== null && (
          <>
            <Image
              image={images[prevRegionIndex]}
              x={0}
              y={0}
              width={width}
              height={height}
              opacity={1}
            />
            <Image
              alt='background'
              image={actives[prevRegionIndex]}
              x={0}
              y={0}
              width={width}
              height={height}
              opacity={1}
            />
          </>
        )}
        {voronoiCells.map((cell: any, index: any) => (
          <Fragment key={index}>
            <Line
              points={cell.flat()}
              closed
              stroke="transparent"
              fill="rgba(0, 0, 255, 0)"
              onClick={() => {
                setPrevRegionIndex(index)
              }}
            />
          </Fragment>
        ))}
      </Layer>
    </Stage>
  )
}

export default BodyQuestion
