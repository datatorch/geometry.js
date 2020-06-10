export class Angle {
  static toDegree(rad: number): number {
    return (rad * 180) / Math.PI
  }

  static toRadians(degree: number): number {
    return (degree / 180) * Math.PI
  }
}
