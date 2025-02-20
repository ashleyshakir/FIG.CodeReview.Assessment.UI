import { AccountDetailComponent } from "./account-detail.component";
import { Ng1StateDeclaration } from "@uirouter/angularjs";

export const accountDetailState: Ng1StateDeclaration = {
    name: "accountDetail",
    url: '/account/:accountId',
    component: `${AccountDetailComponent.componentName}`
};