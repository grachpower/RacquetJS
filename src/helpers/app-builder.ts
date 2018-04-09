import { domHandler } from './dom-handler.service';
import { Component } from '../component/component';

/**
 *
 * @param {HTMLElement} entryElement
 * @param {Component} entryComponent
 */
export function createApp(entryElement: Element, entryComponent: new(...args: any[]) => Component): void {
    const component: Component = new entryComponent();

    entryElement.innerHTML = component.createElementRoot();
    domHandler(component);
}
