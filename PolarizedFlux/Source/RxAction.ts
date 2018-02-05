import * as Rx from "rxjs/Rx";
import { IAction } from "./IAction";

/**
 * Class that implements an action based on an observable.
 */
export class RxAction<TParameter> implements IAction<TParameter> {
    private subject: Rx.Subject<TParameter>;

    /**
     * @inheritdoc 
     */
    public execute(parameter: TParameter): void {
        this.subject.next(parameter);
    }

    /**
     * Get an obserable for when the action is executed.
     */
    public observe(): Rx.Observable<TParameter> {
        return this.subject;
    }

    /**
     * Subscribe the action directly.
     * @param next The handler that handles the next action call.
     * @return A subscription that can be canceled when the action should no longer be listened too.
     */
    public subscribe(next: (parameter: TParameter) => void): Rx.Subscription {
        return this.subject.subscribe(next);
    }
}