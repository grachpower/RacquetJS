// @TODO Add CRUD data service to connect local storage

let instance = null;

export class DataService {

    constructor(){
        if (!instance) {
            instance = this;
        }

        return instance;
    }
}