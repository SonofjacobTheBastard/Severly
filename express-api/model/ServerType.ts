import { IEntity } from "./IEntity";

class ServerType implements IEntity {
    name: string;
    rate: number;


    constructor(name: string, rate: number) {
        this.name = name;
        this.rate = rate;
    }
}


export default ServerType;