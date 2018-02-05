import * as Rx from "rxjs/Rx";
import { IAction } from "./IAction";
import { RxAction } from "./RxAction";

/**
 * Common interface for stores.
 */
export interface IStore<TState>
{
    /**
     * Get an obserable for the stores state.
     * @returns An obserable that represents the changing state of the store.
     */
    observe(): Rx.Observable<TState>;

    /**
     * Subscribe the stores state directly.
     * @param next Handler for the next state.
     * @returns A subscription that can be canceled when done.
     */
    subscribe(next: (state: TState) => void): Rx.Subscription;
}

/**
 * Base class for stores.
 */
export class Store<TState> implements IStore<TState> {
    private state: Rx.BehaviorSubject<TState>;

    /**
     * Construct a state.
     * @param initialState The initial state for the store.
     */
    constructor(initialState: TState) {
        this.state = new Rx.BehaviorSubject(initialState);
    }

    /**
     * @inheritdoc 
     */
    public observe(): Rx.Observable<TState> {
        return this.state;
    }

    /**
     * @inheritdoc 
     */
    public subscribe(next: (state: TState) => void): Rx.Subscription {
        return this.state.subscribe(next);
    }

    /**
     * Update the current state of the store.
     * @param modifyState A handler that will receive the current state and modify it.
     */
    protected updateState(modifyState: (currentState: TState) => TState): void {
        this.state.first().subscribe(state => {
            let newState = modifyState(state);
            this.state.next(newState);
        });
    }

    /**
     * Create an RxAction that the store can subscribe.
     */
    protected createAction<TParameter>(): RxAction<TParameter> {
        return new RxAction<TParameter>();
    }

    /**
     * Create an action and subscribe it however you want in the given handler.
     * @param subsribeAction Handler that gets the action and can then subscribe it.
     * @return An plain { @see IAction<T> } interface that can be given to a property.
     */
    protected createActionAdvanced<TParameter>(subscribeAction: (action: RxAction<TParameter>) => void): IAction<TParameter> {
        let action = this.createAction<TParameter>();

        subscribeAction(action);

        return action;
    }

    /**
     * Create an action and subscribe it simply.
     * @param next The handler to handle the next action call.
     */
    protected createActionAndSubscribe<TParameter>(next: (parameter: TParameter) => void): IAction<TParameter>
    {
        return this.createActionAdvanced(action => action.subscribe(next));
    }

    //protected createActionAndBindWithStateFromStores<TParameter, TState1>(store1: I): IAction<TParameter> {
    //    return this.createActionAdvanced(action => {

    //    });
    //}
} 