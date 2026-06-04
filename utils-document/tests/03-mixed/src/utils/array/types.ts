export interface ArrayFilter<T> {
  (item: T, index: number): boolean
}