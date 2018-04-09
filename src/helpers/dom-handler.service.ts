import { Component } from "../component/component";

export const domHandler = (component: Component) => {
    if (component instanceof Component) {
        component.attach();
        component.render();
    }
};