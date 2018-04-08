import { ComponentService } from "../helpers/component.service";

export class Component {
    constructor() {
        this.elementRef = undefined;
        this._componentService = new ComponentService();
        this._componentService.addComponent(this);

        this.hash = this._componentService.getComponentHash(this);

        /**
         * Contains children objects links
         *
         * @type {Array<Component>}
         *
         * @private
         */
        this._children = [];

        /**
         * Contains component controls name and hash
         *
         * @type {Array<{name: string, hash: string}>}
         *
         * @private
         */
        this._controls = [];
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
    createTemplate() {
        return '';
    }

    /**
     * Method for setting event handlers here
     * METHOD FOR OVERRIDE
     *
     * @returns {void}
     */
    setHandlers() {
        //...
    }

    /**
     * Default method for doing something after component view rendered
     * METHOD FOR OVERRIDE
     *
     * @returns {void}
     */
    afterViewInit() {
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
    render() {
        this._prerender();

        this.elementRef.innerHTML = this.createTemplate();
        this._renderChildren();

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
    createChild(component) {
        this._children.push(component);

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
        this._controls.push({
            name: controlName,
            hash: `${this.hash}_ctrl_${this._controls.length}`,
        });

        return this._controls[this._controls.length - 1].hash;
    }

    /**
     * Get control hash name by its name
     *
     * @param {string} controlName
     *
     * @return {hash}
     */
    getControlHashByName(controlName) {
        const controlHash = this._controls
            .find(({name}) => name === controlName)
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
    _createElementRoot() {
        return `<my-comp ${this.hash}></my-comp>`;
    }

    /**
     * Create local HTMLElement
     *
     * @private
     *
     * @returns {void}
     */
    _attach() {
        this.elementRef = document.querySelector(`[${this.hash}]`);
    }

    /**
     * Invoke attach and render methods for each child components
     *
     * @private
     *
     * @returns {void}
     */
    _renderChildren() {
        this._children.forEach(child => {
            child._attach();
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
    _prerender() {
        this._refreshChildren();
        this._refreshControls();
    }

    /**
     * Reset component children
     *
     * @private
     *
     * @returns {void}
     */
    _refreshChildren() {
        this._children = [];
    }

    /**
     * Reset component children
     *
     * @private
     *
     * @returns {void}
     */
    _refreshControls() {
        this._controls = [];
    }
}
