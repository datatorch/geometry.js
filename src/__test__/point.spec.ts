import { Point2D } from '../point'

describe('Point2D', () => {
  describe('initialization', () => {
    it('construct from empty', () => {
      const { x, y } = new Point2D()
      expect(x).toEqual(0)
      expect(y).toEqual(0)
    })

    it('construct from array', () => {
      const { x, y } = new Point2D([10, 1])
      expect(x).toEqual(10)
      expect(y).toEqual(1)
    })

    it('construct from object', () => {
      const { x, y } = new Point2D({ x: 10, y: 1 })
      expect(x).toEqual(10)
      expect(y).toEqual(1)
    })

    it('construct from args', () => {
      const { x, y } = new Point2D(10, 1)
      expect(x).toEqual(10)
      expect(y).toEqual(1)
    })

    it('create using zero', () => {
      const { x, y } = Point2D.zero()
      expect(x).toEqual(0)
      expect(y).toEqual(0)
    })
  })

  describe('static methods', () => {
    it('min returns minium point', () => {
      const a = new Point2D(10, 1)
      const b = new Point2D(5, 15)

      const { x, y } = Point2D.min(a, b)

      expect(x).toEqual(5)
      expect(y).toEqual(1)
    })

    it('max returns maximum point', () => {
      const a = new Point2D(10, 1)
      const b = new Point2D(5, 15)

      const { x, y } = Point2D.max(a, b)

      expect(x).toEqual(10)
      expect(y).toEqual(15)
    })
  })

  describe('object methods', () => {
    it('clone does not mutate parent', () => {
      const point = new Point2D(0, 20)
      const clone = point.clone()

      clone.x = 10
      clone.y = 15

      expect(point.x).toEqual(0)
      expect(point.y).toEqual(20)
    })
  })
})
