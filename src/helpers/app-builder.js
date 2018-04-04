import { domHandler } from "./dom-handler";

/**
 *
 * @param {HTMLElement} entryElement
 * @param {Component} entryComponent
 */
export function createApp(entryElement, entryComponent) {
    const component = new entryComponent();

    entryElement.innerHTML = component._createElementRoot();
    domHandler(component);
}
