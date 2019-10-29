import io from 'socket.io-client';

const socketMiddleware = () => {
    const socket = io('http://localhost:4000');

    return ({ dispatch }: any) => (next: any) => (action: any) => {
        if (typeof action === 'function') {
            return next(action);
        }

        const {
            event,
            leave,
            handle,
            emit,
            payload,
            ...rest 
        } = action;

        if (!event) return next(action);
        if (leave) {
            socket.disconnect();
        }

        if (emit) {
            socket.emit(event, payload);
            return;
        }

        let handleEvent = handle;
        if (typeof handleEvent === 'string') {
            handleEvent = (result: any) => dispatch({ type: handle, payload: result, ...rest });
        }
        return socket.on(event, handleEvent);
    }
}

export default socketMiddleware;