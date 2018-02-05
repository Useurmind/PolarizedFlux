import * as Rx from "rxjs/Rx";
import { IAction } from "../Source/IAction";
import { RxAction } from "../Source/RxAction";
import { IStore, Store } from "../Source/Store";

export interface IApiTestStoreState
{
    value: number;
}

export interface IApiTestStore extends IStore<IApiTestStoreState>
{
    increment: IAction<void>;
    add: IAction<number>;
}

export class ApiTestStore extends Store<IApiTestStoreState> implements IApiTestStore
{
    public readonly increment: IAction<void>;
    public readonly add: IAction<number>;

    constructor()
    {
        super({
            value: 1
        });

        this.increment = this.createActionAndSubscribe<void>(_ => this.onIncrement());
        this.add = this.createActionAdvanced<number>(action => { action.subscribe(n => this.onAdd(n)); });
    }

    private onAdd(n: number): void {
        this.updateState(state => ({ ...state, value: state.value + n }));
    }

    private onIncrement(): void
    {
        this.updateState(state => ({ ...state, value: state.value + 1 }));
    }
}