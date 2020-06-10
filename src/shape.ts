import { Rectangle } from './rectangle'

/**
 * @internal
 */
export default abstract class Shape {
  abstract get area(): number
  abstract get bounds(): Rectangle
}
