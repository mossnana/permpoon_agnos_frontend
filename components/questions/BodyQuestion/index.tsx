'use client'

import { voronoi } from 'd3-voronoi'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { Stage, Layer, Image, Line } from 'react-konva'
import useImage from 'use-image'

/* abs region index
      0
    1   5
      6
    2   4
      3
 */
const BodyQuestion = ({ width, prevRegion = null, onChoice }: any) => {
  const height = useMemo(() => width * 1.178, [width])

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
  const [llqActive] = useImage('/questions/llq-active.png')
  const [luqHighlight] = useImage('/questions/luq-highlight.png')
  const [luqActive] = useImage('/questions/luq-active.png')
  const [umbilicusHighlight] = useImage('/questions/umbilicus-highlight.png')
  const [umbilicusActive] = useImage('/questions/umbilicus-active.png')

  const abs = {
    points: [
      [242, 235], // top
      [190, 280], // top left
      [190, 340], // bottom left
      [240, 370], // bottom
      [290, 340], // bottom right
      [290, 275], // top right
      [240, 310], // center
    ],
    highlights: [
      epigastriumHighlight,
      rugHighlight,
      rlqHighlight,
      suprapubicHighlight,
      llqHighlight,
      luqHighlight,
      umbilicusHighlight,
    ],
    actives: [
      epigastriumActive,
      rugActive,
      rlqActive,
      suprapubicActive,
      llqActive,
      luqActive,
      umbilicusActive,
    ],
  }

  const [prevRegionIndex, setPrevRegionIndex] = useState(prevRegion)
  useEffect(() => {
    onChoice(prevRegionIndex)
  }, [onChoice, prevRegionIndex])

  const [voronoiCells, setVoronoiCells] = useState([])
  useEffect(() => {
    if (background) {
      const voronoiDiagram = voronoi().extent([
        [0, 0],
        [width, height],
      ])
      const diagram = voronoiDiagram(abs.points as [number, number][])
      setVoronoiCells(diagram.polygons() as never[])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [background])

  const renderSelectedRegion = (region: number) => {
    return (
      <>
        <Image
          alt="highlight-area"
          image={abs.highlights[region]}
          x={0}
          y={0}
          width={width}
          height={height}
        />
        <Image
          alt="active-area"
          image={abs.actives[region]}
          x={0}
          y={0}
          width={width}
          height={height}
        />
      </>
    )
  }

  const onClickRegion = (index: number) => () => {
    if (prevRegionIndex === index) {
      setPrevRegionIndex(null)
    } else {
      setPrevRegionIndex(index)
    }
  }

  return (
    <Stage width={width} height={height}>
      <Layer>
        <Image
          alt="background"
          image={background}
          width={width}
          height={height}
          x={0}
          y={0}
        />
        {prevRegionIndex !== null && renderSelectedRegion(prevRegionIndex)}
        {voronoiCells.map((cell: any, index: any) => (
          <Fragment key={index}>
            <Line
              points={cell.flat()}
              closed
              stroke="transparent"
              fill="rgba(0, 0, 255, 0)"
              onClick={onClickRegion(index)}
            />
          </Fragment>
        ))}
      </Layer>
    </Stage>
  )
}

export default BodyQuestion
