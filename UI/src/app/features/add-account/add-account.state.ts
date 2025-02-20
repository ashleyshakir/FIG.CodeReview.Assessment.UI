import { AddAccountComponent } from "./add-account.component";
import { Ng1StateDeclaration } from "@uirouter/angularjs";

export const addAccountState: Ng1StateDeclaration = {
    name: "addAccount",
    url: "/accounts/add",
    component: `${AddAccountComponent.componentName}`
};
