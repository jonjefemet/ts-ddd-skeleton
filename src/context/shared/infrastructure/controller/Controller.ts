export default interface Controller<T = unknown, U = unknown> {
    handle( event?: T ): Promise<U>;
}