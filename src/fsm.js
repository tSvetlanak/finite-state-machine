class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) {
            throw new error();
        }
        this.initialState = config.initial;
        this.configStates = config.states;
        this.state = this.initialState;
        this.prevState = null;
        this.deletedStates = null;

    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        this.prevState = this.state;
        if (this.configStates[state]) {
            this.state = state;
        } else {
            throw new error();
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        this.prevState = this.state;

        if (this.configStates[this.state].transitions[event]) {
            this.changeState(this.configStates[this.state].transitions[event]);
        } else {
            throw new error();
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.prevState = null;
        this.state = this.initialState;
        return this.state;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (!event) {
            return Object.keys(this.configStates);
        } else {
            let configStates = [];
            for (let key in this.configStates) {
                if (this.configStates[key].transitions[event]) {
                    configStates.push(key);
                }
            }
            return configStates;
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.prevState) {
            this.deletedStates = this.state;
            this.state = this.prevState;
            this.prevState = null;
            return true;
        } else {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.deletedStates) {
            this.prevState = this.state;
            this.state = this.deletedStates;
            this.deletedStates = null;
            return true;
        } else {
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.prevState = null;
    }
}
module.exports = FSM;

/** @Created by Uladzimir Halushka **/