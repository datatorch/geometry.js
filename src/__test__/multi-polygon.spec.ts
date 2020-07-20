import { MultiPolygon } from '..'

describe('MultiPolygon', () => {
  const mp = new MultiPolygon([
    [
      [10, 10],
      [30, 20],
      [30, 50],
      [10, 30],
    ],
  ])

  it('calculates correct area of polygon', () => {
    expect(mp.area).toEqual(500)
  })

  it('calculates the correct bounding box', () => {
    const bounds = mp.bounds
    expect(bounds.xywh).toEqual([10, 10, 20, 40])
    expect(bounds.xyxy).toEqual([10, 10, 30, 50])
  })
})
