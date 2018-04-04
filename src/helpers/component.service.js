let instance = null;

export class ComponentService {

    constructor(){
        if (!instance) {
            instance = this;
        }

        this.componentList = [];
        this.componentHashPrefix = 'c_';

        return instance;
    }

    addComponent(component) {
        this.componentList.push(component);
    }

    getComponentHash(component) {
        return this.componentHashPrefix + this.componentList.indexOf(component);
    }

    removeComponent(component) {
        this.componentList = this.componentList.filter(elem => elem !== component);
    }
}