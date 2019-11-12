export type MiddlewareDependencies = {
    socket: SocketIOClient.Socket,
    defaultTicker?: string,
}