import angular from "angular";
import { accountListState } from "./account-list.state";
import { AccountListComponent } from "./account-list.component";
import { AddAccountComponent } from "../add-account/add-account.component";
import { StateRegistry } from "@uirouter/angularjs";
import { ConfirmationModalComponent } from "../../shared/components/confirmation-modal.component";


configFn.$inject = ["$stateRegistryProvider"]
function configFn($stateRegistryProvider: StateRegistry) {
    $stateRegistryProvider.register(accountListState);
}

export const accountListModule = angular
    .module("accounts", ["ui.router"])
    .config(configFn)
    .component(ConfirmationModalComponent.componentName, ConfirmationModalComponent.componentDefinition)
    .component(AccountListComponent.componentName, AccountListComponent.componentDefinition)
    .component(AddAccountComponent.componentName, AddAccountComponent.componentDefinition);
