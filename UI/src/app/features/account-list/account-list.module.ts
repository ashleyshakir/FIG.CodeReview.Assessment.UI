import angular from "angular";
import { accountListState } from "./account-list.state";
import { AccountListComponent } from "./account-list.component";
import { StateRegistry } from "@uirouter/angularjs";

configFn.$inject = ["$stateRegistryProvider"]
function configFn($stateRegistryProvider: StateRegistry) {
    $stateRegistryProvider.register(accountListState);
}

export const accountListModule = angular
    .module("accounts", ["ui.router"])
    .config(configFn)
    .component(AccountListComponent.componentName, AccountListComponent.componentDefinition);