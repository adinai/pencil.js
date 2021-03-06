
/**
 * Able to listen and fire events
 * @abstract
 * @class
 */
export default class EventEmitter {
    /**
     * EventEmitter constructor
     */
    constructor () {
        this.eventListeners = {};
    }

    /**
     * Listen to an event
     * @param {String|Array<String>} eventName - Name of event (or a list of event names) to listen to
     * @param {Function} callback - Function to call when event fire
     * @param {Boolean} [isTargeted=false] - Should only listen to event targeting itself
     * @return {EventEmitter} Itself
     */
    on (eventName, callback, isTargeted = false) {
        const event = {
            callback,
            element: this,
            isTargeted,
        };
        (Array.isArray(eventName) ? eventName : [eventName]).forEach((name) => {
            if (!this.eventListeners[name]) {
                this.eventListeners[name] = [];
            }
            this.eventListeners[name].push(event);
        });
        return this;
    }

    /**
     * Trigger an event
     * @param {BaseEvent} event - Event to trigger
     * @return {EventEmitter} Itself
     */
    fire (event) {
        const listeners = this.eventListeners[event.name];
        if (listeners && listeners.length) {
            listeners.forEach((listener) => {
                if (!listener.isTargeted || listener.element === event.target) {
                    listener.callback.call(this, event);
                }
            });
        }
        return this;
    }

    /**
     * @typedef {Object} EventEmitterEvents
     */
    /**
     * @return {EventEmitterEvents}
     */
    static get events () {
        return {};
    }
}
