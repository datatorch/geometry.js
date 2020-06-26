import Shape from './shape'
import { Rectangle } from './rectangle'

import { AnyPoint2D, Point2D } from './point'

export class Polygon extends Shape {
  private _bound: Rectangle | null = null
  private _area: number | null = null
  private _points: Point2D[]

  constructor(array: AnyPoint2D[])
  constructor(array: number[])

  constructor(arg0: any) {
    super()
    this._points = []
    const length = arg0.length

    if (Array.isArray(arg0) && length > 0) {
      const first = arg0[0]

      if (typeof first === 'number') {
        for (let i = 0; i < length; i += 2)
          this._points.push(new Point2D(arg0[i], arg0[i + 1]))
        return
      }

      this._points = arg0.map((point) => new Point2D(point))
    }
  }

  _updateRequired() {
    this._area = null
    this._bound = null
  }

  add(point: AnyPoint2D) {
    this._points.push(new Point2D(point))
    this._updateRequired()
  }

  get points(): Point2D[] {
    return this._points
  }

  get firstPoint(): Point2D | null {
    return this._points[0] || null
  }

  get lastPoint(): Point2D | null {
    return this._points[this._points.length - 1] || null
  }

  get bounds(): Rectangle {
    if (this._bound == null) this._bound = Polygon.getBounds(this._points)
    return this._bound
  }

  get area(): number {
    if (this._area == null) this._area = Polygon.getArea(this._points)
    return this._area
  }

  segmentation(): number[] {
    const points: number[] = []
    for (const p of this._points) {
      points.push(p.x)
      points.push(p.y)
    }
    return points
  }

  isEmpty() {
    return this._points.length === 0
  }

  static getArea(
    polygon: AnyPoint2D[] | Polygon,
    signed: boolean = false
  ): number {
    let a = 0
    const vertices = Array.isArray(polygon) ? polygon : polygon.points

    for (let i = 0, l = vertices.length; i < l; i++) {
      const v0 = new Point2D(vertices[i]),
        v1 = new Point2D(vertices[i === l - 1 ? 0 : i + 1])

      a += v0.x * v1.y
      a -= v1.x * v0.y
    }

    return (signed ? a : Math.abs(a)) / 2
  }

  static getBounds(polygon: AnyPoint2D[] | Polygon): Rectangle {
    const vertices = Array.isArray(polygon) ? polygon : polygon.points
    if (vertices.length === 0) return new Rectangle()

    let min = new Point2D(vertices[0]).array
    let max = new Point2D(vertices[0]).array

    for (const point of vertices) {
      const asPoint = new Point2D(point)
      min = [Math.min(min[0], asPoint.x), Math.min(min[1], asPoint.y)]
      max = [Math.max(max[0], asPoint.x), Math.max(max[1], asPoint.y)]
    }

    return new Rectangle({ from: min!, to: max! })
  }

  static getCentroid(polygon: AnyPoint2D[] | Polygon): Point2D {
    const vertices = Array.isArray(polygon) ? polygon : polygon.points
    let a = 0,
      point = new Point2D(),
      l = vertices.length

    for (let i = 0; i < l; i++) {
      const s = i === l - 1 ? 0 : i + 1,
        v0 = new Point2D(vertices[i]),
        v1 = new Point2D(vertices[s]),
        f = v0.x * v1.y - v1.x * v0.y

      a += f
      point.x += (v0.x + v1.x) * f
      point.y += (v0.y + v1.y) * f
    }
    return point.divide(a * 3)
  }
}
