import crypto from 'crypto'
import { IEntity } from './IEntity';
class Server implements IEntity {
    public id: string;
    public ipAdress: string;
    public name: string;
    public typeId: number;
    public isRunning: boolean;
    public timeRunning: number;


    constructor(ipAdress: string, name: string, typeId: number) {
        this.id = crypto.randomUUID();
        this.ipAdress = ipAdress != null ? ipAdress : '';
        this.name = name != null ? name : '';
        this.typeId = typeId;
        this.isRunning = false;
        this.timeRunning = 0;
    }
}


export default Server;