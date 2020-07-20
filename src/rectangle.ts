import Shape from './shape'
import { Polygon } from './polygon'
import { isNumber, isObject } from './utils/type'
import { Point2D, AnyPoint2D } from './point'

export class Rectangle extends Shape {
  x: number = 0
  y: number = 0
  width: number = 0
  height: number = 0

  constructor()
  constructor(points: { from: AnyPoint2D; to: AnyPoint2D })
  constructor(x: number, y: number, width: number, height: number)
  constructor(a?: any, b?: any, c?: any, d?: any) {
    super()

    if (a == null) {
      // new Rectangle()
      this._set(0, 0, 0, 0)
      return
    }

    if (isNumber(a) && isNumber(b) && isNumber(c) && isNumber(d)) {
      // new Rectangle(x, y, width, height)
      this._set(a, b, c, d)
      return
    }

    if (isObject(a)) {
      if ('from' in a) {
        // new Rectangle({ from: Point, to: Point })
        const from = new Point2D(a.from)
        const to = new Point2D(a.to)
        const max = Point2D.max(from, to)
        const min = Point2D.min(from, to)
        const diff = max.subtract(min)
        this._set(min.x, min.y, diff.x, diff.y)
      }
    }
  }

  private _set(x: number, y: number, width: number, height: number) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  get area(): number {
    return this.width * this.height
  }

  get bounds(): Rectangle {
    return this
  }

  get size(): Point2D {
    return new Point2D(this.width, this.height)
  }

  /**
   * The top-left point of the rectangle.
   * @returns top-left point
   **/
  get topLeft(): Point2D {
    return new Point2D(this.x, this.y)
  }

  /**
   * The bottom-left point of the rectangle.
   * @returns bottom-left point
   **/
  get bottomLeft(): Point2D {
    return new Point2D(this.x, this.y + this.height)
  }

  /**
   * The top-right point of the rectangle.
   * @returns top-right point
   **/
  get topRight(): Point2D {
    return new Point2D(this.x + this.width, this.y)
  }

  /**
   * The bottom-right point of the rectangle.
   * @returns bottom-right point
   **/
  get bottomRight(): Point2D {
    return new Point2D(this.x + this.width, this.y + this.height)
  }

  get xywh(): [number, number, number, number] {
    return [this.x, this.y, this.width, this.height]
  }

  get xyxy(): [number, number, number, number] {
    return [this.x, this.y, this.x + this.width, this.y + this.height]
  }

  polygon(): Polygon {
    return new Polygon([
      this.topLeft,
      this.topRight,
      this.bottomRight,
      this.bottomLeft,
    ])
  }

  segmentation(): number[] {
    return this.polygon().segmentation()
  }

  /**
   * Tests if the specified point is inside the boundary of the rectangle.
   *
   * @param point the specified point
   * @return @true if the point is inside the rectangle's boundary
   */
  contains(a: Point2D): boolean

  /**
   * Tests if the interior of the rectangle entirely contains the specified
   * rectangle.
   *
   * @param rect the specified rectangle
   * @return @true if the rectangle entirely contains the specified rectangle
   */
  contains(a: Rectangle): boolean

  contains(a: Point2D | Rectangle): boolean {
    if (a instanceof Point2D)
      return (
        a.x >= this.x &&
        a.y >= this.y &&
        a.x <= this.x + this.width &&
        a.y <= this.y + this.height
      )
    return this.contains(a.topLeft) && this.contains(this.bottomRight)
  }

  /**
   * Returns a new rectangle representing the union of this rectangle with the
   * specified rectangle.
   *
   * @param rect the rectangle to be combined with this rectangle
   * @return the smallest rectangle containing both the specified rectangle and
   * this rectangle
   **/
  unite(rect: Rectangle): Rectangle {
    return new Rectangle(
      Math.min(this.x, rect.x),
      Math.min(this.y, rect.y),
      Math.max(this.width, rect.width),
      Math.max(this.height, rect.height)
    )
  }

  /**
   * Adds a point to this rectangle. The resulting rectangle is the smallest
   * rectangle that contains both the original rectangle and the specified
   * point.
   *
   * @param point point to be included
   * @return the smallest rectangle that contains both the original rectangle
   * and the specified point
   */
  include(point: Point2D): Rectangle {
    const x1 = Math.min(this.x, point.x),
      y1 = Math.min(this.y, point.y),
      x2 = Math.max(this.bottomRight.x, point.x),
      y2 = Math.max(this.bottomRight.y, point.y)
    return new Rectangle(x1, y1, x2 - x1, y2 - y1)
  }
}
