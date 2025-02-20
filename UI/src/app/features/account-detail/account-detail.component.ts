import { IComponentOptions } from "angular";
import template from "./account-detail.template.html";
import "./account-detail.style.scss";
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

        const birthDateObj = new Date(birthdate);
        const currentDate = new Date();

        let age = currentDate.getFullYear() - birthDateObj.getFullYear();
        const monthDifference = currentDate.getMonth() - birthDateObj.getMonth();
        
        if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDateObj.getDate())) {
            age -= 1;
        }

        return age;
    }

}