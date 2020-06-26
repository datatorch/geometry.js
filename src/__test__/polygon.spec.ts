import { Polygon } from '../polygon'

describe('Polygon', () => {
  const mp = new Polygon([
    [10, 10],
    [30, 20],
    [30, 50],
    [10, 30],
  ])

  it('gets first point', () => {
    expect(mp.firstPoint!.x).toEqual(10)
    expect(mp.firstPoint!.y).toEqual(10)
  })

  it('gets last point', () => {
    expect(mp.lastPoint!.x).toEqual(10)
    expect(mp.lastPoint!.y).toEqual(30)
  })

  it('calculates correct area of polygon', () => {
    expect(mp.area).toEqual(500)
  })

  it('calculates the correct bounding box', () => {
    const bounds = mp.bounds
    expect(bounds.xywh).toEqual([10, 10, 20, 40])
    expect(bounds.xyxy).toEqual([10, 10, 30, 50])
  })
})
