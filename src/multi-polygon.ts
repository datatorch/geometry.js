import { Rectangle } from './rectangle'
import { Polygon } from './polygon'

import { AnyPoint2D } from './point'

export class MultiPolygon {
  private _area: number | null = null
  private _bounds: Rectangle | null = null
  private _polygons: Polygon[] = []

  constructor(polygons: AnyPoint2D[][]) {
    for (const p of polygons) {
      this._polygons.push(new Polygon(p))
    }
  }

  get area(): number {
    if (this._area == null) this._area = MultiPolygon.getArea(this._polygons)
    return this._area
  }

  get bounds() {
    if (this._bounds == null)
      this._bounds = MultiPolygon.getBounds(this._polygons)
    return this._bounds
  }

  segmentation() {
    return this._polygons.map((p) => p.segmentation())
  }

  static getArea(polygons: (AnyPoint2D[] | Polygon)[]) {
    let a = 0
    for (const p of polygons) {
      a += Polygon.getArea(p)
    }
    return a
  }

  static getBounds(polygons: (AnyPoint2D[] | Polygon)[]): Rectangle {
    if (polygons.length === 0) return new Rectangle()
    let rect = Polygon.getBounds(polygons[0])
    for (const p of polygons) {
      rect = rect.unite(Polygon.getBounds(p))
    }
    return rect
  }
}
