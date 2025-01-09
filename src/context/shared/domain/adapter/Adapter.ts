export default interface Adapter<T, U> {
  adapt: ( data: T ) => U;
}
