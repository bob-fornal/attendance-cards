
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
 
export interface BroadcastMessage {
  type: string;
  payload: any;
};
 
@Injectable()
export class BroadcastService {

  websocket: any;
  
  constructor() {
    const CLUSTER_ID: string = 'us-nyc-1';
    const CHANNEL_ID: string = '1';
    const API_KEY: string = 'kbfzwq1taOwqDyw7GjgDZDZCd6QByYU8uC2B6kGj';

    this.websocket = new WebSocket(`wss://${ CLUSTER_ID }.piesocket.com/v3/${ CHANNEL_ID }?api_key=${ API_KEY }`);

    this.websocket.onopen = () => {
      const initMessage: BroadcastMessage = {
        type: 'initial',
        payload: ''
      };
      this.publish(initMessage);
    };    
  }

  messagesOfType = (type: string): Observable<BroadcastMessage> => {
    return new Observable(observer => {
      this.websocket.onmessage = (eventString: MessageEvent) => {
        const event: BroadcastMessage = JSON.parse(eventString.data);
        if (event.type === type) {
          observer.next(event);
        }
      }
    });
  }

  publish = (message: BroadcastMessage) => {
    this.websocket.send(JSON.stringify(message));
  };

}