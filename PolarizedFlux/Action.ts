import * as Rx from "rxjs/Rx";

export interface IAction<TParameter>
{
    /**
     * Execute the action with the given parameter.
     * @param parameter The parameter that tells the action what to do.
     * @returns {} 
     */
    execute(parameter: TParameter): void;
}