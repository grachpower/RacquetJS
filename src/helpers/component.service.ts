import { Component } from '../component/component';

let instance: any = null;

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

    public addComponent(component: Component): void {
        this.componentList.push(component);
    }

    public getComponentHash(component: Component): string {
        return this.componentHashPrefix + this.componentList.indexOf(component);
    }

    public removeComponent(component: Component): void {
        this.componentList = this.componentList.filter(elem => elem !== component);
    }
}