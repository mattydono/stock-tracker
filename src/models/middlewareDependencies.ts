import { SocketService } from "services/socketService";

export type MiddlewareDependencies = {
    socket: SocketService,
    defaultTicker?: string,
}