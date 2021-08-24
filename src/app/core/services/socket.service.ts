
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
 
export interface SocketMessage {
  type: string;
  payload: any;
};
 
@Injectable()
export class SocketService {

  websocket: any;
  
  constructor() {
    this.connectWebSocket();
  }

  connectWebSocket = (): void => {
    const CLUSTER_ID: string = 'us-nyc-2';
    const CHANNEL_ID: string = '1';
    const API_KEY: string = 'kbfzwq1taOwqDyw7GjgDZDZCd6QByYU8uC2B6kGj';

    try {
      this.websocket = new WebSocket(`wss://${ CLUSTER_ID }.piesocket.com/v3/${ CHANNEL_ID }?api_key=${ API_KEY }`);

      this.websocket.onopen = () => {
        const initMessage: SocketMessage = {
          type: 'initial',
          payload: ''
        };
        this.publish(initMessage);
      };
    } catch (error) {
      console.log(error);
    }
  };

  messagesOfType = (type: string): Observable<SocketMessage> => {
    return new Observable(observer => {
      this.websocket.onmessage = (eventString: MessageEvent) => {
        const event: SocketMessage = JSON.parse(eventString.data);
        if (event.type === type) {
          observer.next(event);
        }
      };
    });
  };

  errorHandler = (): Observable<Event> => {
    return new Observable(observer => {
      this.websocket.onerror = (event: Event) => {
        observer.next(event);
      };
    });
  };

  publish = (message: SocketMessage) => {
    try {
      this.websocket.send(JSON.stringify(message));
    } catch (error) {
      console.log(error);
    }
  };

}
