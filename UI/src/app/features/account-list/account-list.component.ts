import { IComponentOptions } from "angular";
import template from "./account-list.template.html";
import "./account-list.style.scss";

export class AccountListComponent {
    static componentName: string = "accountListComponent";
    static componentDefinition: IComponentOptions = {
        controller: AccountListComponent,
        controllerAs: "$ctrl",
        template: template,
        bindings: {}
    };
}