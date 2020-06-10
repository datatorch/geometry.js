import { isNumber, isObject } from './utils/type'
import { Angle } from '.'

export type AnyPoint2D = Point2D | { x: number; y: number } | [number, number]
export type AnyPoint3D =
  | Point3D
  | { x: number; y: number; z: number }
  | [number, number, number]

abstract class Point {}

/**
 * WIP: This class is incomplete
 */
export class Point3D extends Point {}

/**
 * The Point2D object represents a point in the two dimensional space. It is
 * also used to represent two dimensional vector objects.
 */
export class Point2D extends Point {
  /**
   * The x coordinate of the point
   */
  x: number = 0

  /**
   * The y coordinate of the point
   */
  y: number = 0

  /**
   * Creates an empty Point object.
   *
   * @example
   * ```js
   * // Create a point at x: 10, y: 5
   * const point = new Point();
   * console.log(point.x); // { x: 0, y: 0 }
   * ```
   */
  constructor()

  /**
   * Creates a Point object with a x and y value of scalar
   *
   * @param scalar the scalar value
   *
   * @example
   * ```js
   * const point = new Point(5)
   * console.log(point) // { x: 5, y: 5 }
   * ```
   */
  constructor(scalar: number)

  /**
   * Creates a Point object with the given x and y coordinates.
   *
   * @param x the x coordinate
   * @param y the y coordinate
   *
   * @example
   * ```js
   * // Create a point at x: 10, y: 5
   * const point = new Point(10, 5);
   * console.log(point.x); // 10
   * console.log(point.y); // 5
   * ```
   */
  constructor(x: number, y: number)

  /**
   * Creates a Point object using the properties in the given object.
   *
   * @param point the object describing the point's properties
   *
   * @example
   * ```js
   * // Creating a point using an array literal:
   *
   * var point = new Point([10, 20]);
   * console.log(point.x); // 10
   * console.log(point.y); // 20
   * ```
   *
   * @example
   * ```js
   * // Creating a point at x: 10, y: 20 using an object literal:
   *
   * var point = new Point({
   *     x: 10,
   *     y: 20
   * });
   * console.log(point.x); // 10
   * console.log(point.y); // 20
   * ```
   */
  constructor(point: AnyPoint2D)
  constructor(a?: any, b?: any) {
    super()

    if (a == null) {
      this._set(0, 0)
      return
    }

    if (Array.isArray(a)) {
      this._set(a[0], a[1])
      return
    }

    if (isNumber(a) && isNumber(b)) {
      this._set(a, b)
      return
    }

    if (isNumber(a)) {
      this._set(a, a)
      return
    }

    if (isObject(a)) {
      this._set(a.x, a.y)
      return
    }
  }

  /**
   * @internal
   */
  private _set(x: number, y: number) {
    this.x = x
    this.y = y
    return this
  }

  /**
   * The vector's angle in radians, measured from the x-axis to the vector.
   *
   * @readonly
   */
  get angleRadians() {
    return Math.atan2(this.y, this.x)
  }

  /**
   * The vector's angle in degrees, measured from the x-axis to the vector.
   *
   * @readonly
   */
  get angle(): number {
    return Angle.toDegree(this.angleRadians)
  }

  /**
   * The length of the vector that is represented by this point's coordinates.
   * Each point can be interpreted as a vector that points from the origin (`x =
   * 0`, `y = 0`) to the point's location. Setting the length changes the
   * location but keeps the vector's angle.
   */
  get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  set length(length: number) {
    const scale = length / this.length
    this.x *= scale
    this.y *= scale
  }

  toString() {
    return `{ x: ${this.x}, y: ${this.y} }`
  }

  /**
   * Returns a copy of the point.
   *
   * @return the cloned point
   *
   * @example
   * ```js
   * var point1 = new Point();
   * var point2 = point1;
   * point2.x = 1; // also changes point1.x
   *
   * var point2 = point1.clone();
   * point2.x = 1; // doesn't change point1.x
   * ```
   */
  clone() {
    return new Point2D(this)
  }

  /**
   * The quadrant of the {@link #angle} of the point.
   *
   * Angles between 0 and 90 degrees are in quadrant `1`. Angles between 90 and
   * 180 degrees are in quadrant `2`, angles between 180 and 270 degrees are in
   * quadrant `3` and angles between 270 and 360 degrees are in quadrant `4`.
   *
   * @example
   * ```js
   * const point = new Point(1, 1);
   * console.log(point.quadrant); // 1
   * ```
   *
   * @readonly
   */
  get quadrant(): 1 | 2 | 3 | 4 {
    return this.x >= 0 ? (this.y >= 0 ? 1 : 4) : this.y >= 0 ? 2 : 3
  }

  /**
   * Returns the distance between the point and another point.
   *
   * @param point
   * @return point representing the distance
   *
   * @example
   * ```js
   * const point = new Point(1, 0)
   * const distance = point1.getDistance({ x: 2, y: 0})
   * console.log(distance.length) // 1
   * console.log(distance) // { x: 1, y: 0 }
   * ```
   */
  getDistance(point: AnyPoint2D): Point2D {
    point = new Point2D(point)
    const x = this.x - point.x
    const y = this.y - point.y
    return new Point2D(x, y)
  }

  /**
   * Returns the addition of the supplied point to the point as a new point. The
   * object itself is not modified!
   *
   * @param point the point to add
   * @return the addition of the two points as a new point
   *
   * @example
   * ```js
   * const point1 = new Point(5, 10);
   * const point2 = new Point(10, 20);
   * const result = point1.add(point2);
   * console.log(result); // {x: 15, y: 30}
   * ```
   */
  add(point: AnyPoint2D | number) {
    point = new Point2D(point as any)
    return new Point2D(this.x + point.x, this.y + point.y)
  }

  /**
   * Returns the subtraction of the supplied point to the point as a new point.
   *
   * @param point the number to subtract
   * @return the subtraction of the point and the value as a new point
   *
   * @example
   * ```js
   * const point = new Point(10, 20);
   * const result = point.subtract({ x: 5, y: 10 });
   * console.log(result); // {x: 5, y: 10}
   * ```
   */
  subtract(point: AnyPoint2D | number) {
    point = new Point2D(point as any)
    return new Point2D(this.x - point.x, this.y - point.y)
  }

  multiply(point: AnyPoint2D | number) {
    point = new Point2D(point as any)
    return new Point2D(this.x * point.x, this.y * point.y)
  }

  modulo(point: AnyPoint2D | number) {
    point = new Point2D(point as any)
    return new Point2D(this.x % point.x, this.y % point.y)
  }

  /**
   * Returns the division of the supplied point to the point as a new point. The
   * object itself is not modified!
   *
   * @param point the point to divide by
   * @return the division of the two points as a new point
   *
   * @example
   * ```js
   * const firstPoint = new Point(8, 10);
   * const secondPoint = new Point(2, 5);
   * const result = firstPoint.divide(secondPoint);
   * console.log(result); // {x: 4, y: 2}
   * ```
   */
  divide(point: AnyPoint2D | number) {
    point = new Point2D(point as any)
    return new Point2D(this.x / point.x, this.y / point.y)
  }

  /**
   * Returns the dot product of the point and another point.
   *
   * @param point
   * @return the dot product of the two points
   */
  dot(point: AnyPoint2D | number): number {
    point = new Point2D(point as any)
    return this.x * point.x + this.y * point.y
  }

  /**
   * Returns the cross product of the point and another point.
   *
   * @param point
   * @return the cross product of the two points
   */
  cross(point: AnyPoint2D | number) {
    point = new Point2D(point as any)
    return this.x * point.y - this.y * point.x
  }

  rotate(angle: number, center?: Point2D): Point2D {
    if (angle === 0) return this.clone()
    angle = (angle * Math.PI) / 180

    let point = center ? this.subtract(center) : this,
      sin = Math.sin(angle),
      cos = Math.cos(angle)

    point = new Point2D(
      point.x * cos - point.y * sin,
      point.x * sin + point.y * cos
    )
    return center ? point.add(center) : point
  }

  /**
   * Checks whether the coordinates of the point are equal to that of the
   * supplied point.
   *
   * @example
   * ```js
   * var point = new Point(5, 10);
   * console.log(point == new Point(5, 10)); // true
   * console.log(point == new Point(1, 1)); // false
   * console.log(point != new Point(1, 1)); // true
   * ```
   *
   * @param point point to compare
   * @return @true if the points are equal
   */
  equals(point: AnyPoint2D) {
    point = new Point2D(point)
    return point.x === this.x && point.y === this.y
  }

  /**
   * Checks if the point is within a given distance of another point.
   *
   * @param point the point to check against
   * @param tolerance the maximum distance allowed
   * @return @true if it is within the given distance
   */
  isClose(point: Point2D, tolerance: number): Boolean {
    const distance = this.getDistance(point)
    return distance.length <= tolerance
  }

  /**
   * Creates a zero point with both x and y values of zero.
   *
   * @returns an empty point with x and y of zero
   *
   * @example
   * ```js
   * const zero = Point.zero
   * console.log(zero) // { x: 0, y: 0 }
   * ```
   */
  static zero(): Point2D {
    return new Point2D(0)
  }

  /**
   * Returns a new point object with the smallest {@link #x} and {@link #y} of
   * the supplied points.
   *
   * @static
   * @param a
   * @param b
   * @return the newly created point object
   *
   * @example
   * ```js
   * const point1 = new Point(10, 100);
   * const point2 = new Point(200, 5);
   * const minPoint = Point.min(point1, point2);
   * console.log(minPoint); // {x: 10, y: 5}
   * ```
   *
   * @example
   * ```js
   * // Find the minimum of multiple points:
   * var point1 = new Point(60, 100);
   * var point2 = new Point(200, 5);
   * var point3 = new Point(250, 35);
   * [point1, point2, point3].reduce(Point.min) // {x: 60, y: 5}
   * ```
   */
  static min(a: Point2D, b: Point2D) {
    return new Point2D(Math.min(a.x, b.x), Math.min(a.y, b.y))
  }

  /**
   * Returns a new point object with the largest {@link #x} and {@link #y} of
   * the supplied points.
   *
   * @static
   * @param a
   * @param b
   * @return the newly created point object
   *
   * @example
   * ```js
   * const point1 = new Point(10, 100);
   * var point2 = new Point(200, 5);
   * var maxPoint = Point.max(point1, point2);
   * console.log(maxPoint); // {x: 200, y: 100}
   * ```
   *
   * @example
   * ```js
   * // Find the maximum of multiple points:
   * var point1 = new Point(60, 100);
   * var point2 = new Point(200, 5);
   * var point3 = new Point(250, 35);
   * [point1, point2, point3].reduce(Point.max) // {x: 250, y: 100}
   * ```
   */
  static max(a: Point2D, b: Point2D) {
    return new Point2D(Math.max(a.x, b.x), Math.max(a.y, b.y))
  }
}
