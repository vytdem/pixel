class WebsocketHandler {
    constructor() {
        this.ws = new WebSocket('ws://127.0.0.1:8000/ws/foobar');
        this.ws.onopen = this.onOpen;
        this.ws.onmessage = this.onMessage;
        this.ws.onerror = this.onError;
        this.ws.onclose = this.onClose;
    }

    sendMessage()
    {
        this.ws.send('test');
    }

    onOpen(e)
    {
        console.log("websocket connected");
    }

    onMessage(e)
    {
        console.log("Received: " + e.data);
    }

    onError(e)
    {
        console.error(e);
    }

    onClose(e)
    {
        console.log("connection closed");
    }
}