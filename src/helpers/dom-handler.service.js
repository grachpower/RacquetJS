import { Component } from "../components/component";

export const domHandler = (component) => {
    if (component instanceof Component) {
        component._attach();
        component.render();
    }
};