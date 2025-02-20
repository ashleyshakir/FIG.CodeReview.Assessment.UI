import angular from "angular";
import { accountDetailState } from "./account-detail.state";
import { AccountDetailComponent } from "./account-detail.component";
import { StateRegistry } from "@uirouter/angularjs";

configFn.$inject = ["$stateRegistryProvider"]
function configFn($stateRegistryProvider: StateRegistry) {
    $stateRegistryProvider.register(accountDetailState);
}

export const accountDetailModule = angular
    .module("accountDetail", ["ui.router"])
    .config(configFn)
    .component(AccountDetailComponent.componentName, AccountDetailComponent.componentDefinition);
