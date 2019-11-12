import { SocketService } from "services/socketService";

export type MiddlewareDependencies = {
    socketService: SocketService,
}