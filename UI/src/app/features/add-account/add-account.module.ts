import angular from "angular";
import { addAccountState } from "./add-account.state";
import { AddAccountComponent } from "./add-account.component";
import { StateRegistry } from "@uirouter/angularjs";

configFn.$inject = ["$stateRegistryProvider"];
function configFn($stateRegistryProvider: StateRegistry) {
    $stateRegistryProvider.register(addAccountState);
}

export const addAccountModule = angular
    .module("addAccount", ["ui.router"])
    .config(configFn)
    .component(AddAccountComponent.componentName, AddAccountComponent.componentDefinition);
