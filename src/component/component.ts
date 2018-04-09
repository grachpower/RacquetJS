import { ComponentService } from '../helpers/component.service';
import { ControlInterface } from './models/control.interface';

export class Component {
    private elementRef: HTMLElement = undefined;
    private hash: string;
    private componentService: ComponentService = new ComponentService();
    private children: Component[] = [];
    private controls: ControlInterface[] = [];

    constructor() {
        this.componentService.addComponent(this);

        this.hash = this.componentService.getComponentHash(this);
    }


    /**
     * ________METHODS TO OVERRIDE________
     */

    /**
     * Method for creating default template
     * METHOD FOR OVERRIDE
     *
     * @returns {string}
     */
    protected createTemplate(): string {
        return '';
    }

    /**
     * Method for setting event handlers here
     * METHOD FOR OVERRIDE
     *
     * @returns {void}
     */
    protected setHandlers(): void {
        //...
    }

    /**
     * Default method for doing something after component view rendered
     * METHOD FOR OVERRIDE
     *
     * @returns {void}
     */
    protected afterViewInit(): void {
        //...
    }


    /**
     * ________METHODS U CAN USE IN YOUR COMPONENT________
     */

    /**
     * Update current component element
     *
     * @returns {void}
     */
    public render() {
        this.prerender();

        this.elementRef.innerHTML = this.createTemplate();
        this.renderChildren();

        this.setHandlers();
        this.afterViewInit();
    }

    /**
     * Create child none
     *
     * @param component
     *
     * @returns {string}
     */
    protected createChild(component) {
        this.children.push(component);

        return component._createElementRoot();
    }

    /**
     * Get current component DOM element link
     *
     * @returns {HTMLElement}
     */
    getElementRef() {
        return this.elementRef;
    }

    /**
     * Add new control to component controls and returns component hash name
     *
     * @param {string} controlName
     *
     * @returns {string}
     */
    addControlByName(controlName) {
        this.controls.push({
            name: controlName,
            hash: `${this.hash}_ctrl_${this.controls.length}`,
        });

        return this.controls[this.controls.length - 1].hash;
    }

    /**
     * Get control hash name by its name
     *
     * @param {string} controlName
     *
     * @return {hash}
     */
    getControlHashByName(controlName: string): string {
        const controlHash = this.controls
            .find((control: ControlInterface) => control.name === controlName)
            .hash;

        return `${controlHash}`;
    }


    /**
     * ________LOCAL METHODS NOT TO USE OUTSIDE THIS CLASS________
     */

    /**
     * Creates html tag for template with hash name
     *
     * @private
     *
     * @returns {string}
     */
    public createElementRoot() {
        return `<my-comp ${this.hash}></my-comp>`;
    }

    /**
     * Create local HTMLElement
     *
     * @private
     *
     * @returns {void}
     */
    public attach() {
        this.elementRef = document.querySelector(`[${this.hash}]`);
    }

    /**
     * Invoke attach and render methods for each child components
     *
     * @private
     *
     * @returns {void}
     */
    private renderChildren(): void {
        this.children.forEach(child => {
            child.attach();
            child.render();
        });
    }

    /**
     * What we should do before component render start
     *
     * @private
     *
     * @returns {void}
     */
    private prerender(): void {
        this.refreshChildren();
        this.refreshControls();
    }

    /**
     * Reset component children
     *
     * @private
     *
     * @returns {void}
     */
    private refreshChildren(): void {
        this.children = [];
    }

    /**
     * Reset component children
     *
     * @private
     *
     * @returns {void}
     */
    private refreshControls(): void {
        this.controls = [];
    }
}
