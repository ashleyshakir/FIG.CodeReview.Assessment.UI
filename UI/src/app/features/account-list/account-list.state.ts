import { AccountListComponent } from "./account-list.component";
import { Ng1StateDeclaration } from "@uirouter/angularjs";

export const accountListState: Ng1StateDeclaration = {
    name: "accounts",
    url: "/accounts",
    component: `${AccountListComponent.componentName}`
};