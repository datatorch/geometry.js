import Segment from './segment'

export type CurveValues = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
]

export default class Curve {
  /**
   * Returns array in simple format for easier mathematical manipulation
   * @param s1 first segment
   * @param s2 second segment
   * @param ignoreHandles remove handles between the points
   */
  static toArray(
    s1: Segment,
    s2: Segment,
    ignoreHandles: boolean = false
  ): CurveValues {
    const p1 = s1.point,
      h1 = s1.handleOut,
      h2 = s2.handleIn,
      p2 = s2.point,
      x1 = p1.x,
      y1 = p1.y,
      x2 = p2.x,
      y2 = p2.y
    return ignoreHandles
      ? [x1, y1, x1, y1, x2, y2, x2, y2]
      : [x1, y1, x1 + h1.x, y1 + h1.y, x2 + h2.x, y2 + h2.y, x2, y2]
  }

  static getArea(v: CurveValues) {
    const x0 = v[0],
      y0 = v[1],
      x1 = v[2],
      y1 = v[3],
      x2 = v[4],
      y2 = v[5],
      x3 = v[6],
      y3 = v[7]

    return (
      (3 *
        ((y3 - y0) * (x1 + x2) -
          (x3 - x0) * (y1 + y2) +
          y1 * (x0 - x2) -
          x1 * (y0 - y2) +
          y3 * (x2 + x0 / 3) -
          x3 * (y2 + y0 / 3))) /
      20
    )
  }
}
