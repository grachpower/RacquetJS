import { Component } from '../component/component';

let instance = null;

export class ComponentService {
    private componentList: Component[];
    private componentHashPrefix = 'c_';

    constructor(){
        if (!instance) {
            instance = this;
        }

        this.componentList = [];

        return instance;
    }

    public addComponent(component): void {
        this.componentList.push(component);
    }

    public getComponentHash(component): string {
        return this.componentHashPrefix + this.componentList.indexOf(component);
    }

    public removeComponent(component): void {
        this.componentList = this.componentList.filter(elem => elem !== component);
    }
}