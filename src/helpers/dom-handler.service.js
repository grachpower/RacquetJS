import { Component } from "../component/component";

export const domHandler = (component) => {
    if (component instanceof Component) {
        component._attach();
        component.render();
    }
};