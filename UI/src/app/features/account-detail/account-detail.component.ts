import { IComponentOptions } from "angular";
import template from "./account-detail.template.html";
import "./account-detail.style.scss";
import { AccountDetail } from  "../../shared/services";
import { StateService } from "@uirouter/angularjs"


export class AccountDetailComponent {
    static componentName: string = "accountDetailComponent";
    static componentDefinition: IComponentOptions = {
        controller: AccountDetailComponent,
        controllerAs: "$ctrl",
        template: template,
        bindings: {
            account: "<"
        }
    };

    static $inject = ["$state"];

    constructor(private $state: StateService) {}

    goBack() {
        this.$state.go("accounts");
    }
    
    getOwnerAge(birthdate: string): number {
        if (!birthdate) return 0;

        const birthYear = new Date(birthdate).getFullYear();
        const currentYear = new Date().getFullYear();
        return currentYear - birthYear;
    }

}