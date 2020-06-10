import { AnyPoint2D, Point2D } from './point'

export default class Segment {
  point: Point2D
  handleIn: Point2D
  handleOut: Point2D

  constructor(
    x: number,
    y: number,
    inX?: number,
    inY?: number,
    outX?: number,
    outY?: number
  )

  constructor(obj: {
    point: AnyPoint2D
    handleIn?: AnyPoint2D
    handleOut?: AnyPoint2D
  })

  constructor(...args: any[]) {
    if (args.length == 1) {
      this.point = new Point2D(args[0].point)
      this.handleIn = new Point2D(args[0].handleIn || [0, 0])
      this.handleOut = new Point2D(args[0].handleOut || [0, 0])
      return
    }

    this.point = new Point2D(args[0], args[1])
    this.handleIn = new Point2D(args[2] || 0, args[3] || 0)
    this.handleOut = new Point2D(args[4] || 0, args[5] || 0)
  }
}
