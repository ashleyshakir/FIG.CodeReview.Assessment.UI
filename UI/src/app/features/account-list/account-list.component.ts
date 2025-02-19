import { IComponentOptions } from "angular";
import template from "./account-list.template.html";
import "./account-list.style.scss";
import { AccountService } from "../../shared/services";
import { AccountSummary } from "../../shared/services";

export class AccountListComponent {
    static componentName: string = "accountListComponent";
    static componentDefinition: IComponentOptions = {
        controller: AccountListComponent,
        controllerAs: "$ctrl",
        template: template,
        bindings: {}
    };

    static $inject = ["accountService"];
    accounts: AccountSummary[] = [];
    formattedAccounts: {
        accountId: number;
        accountName: string;
        ownerName: string;
        createdDate: string;
        checkingAmount: string;
        savingsAmount: string;
    }[] = [];
    
    constructor(private accountService: AccountService) {}

    $onInit(): void {
        this.accountService.getAllAccounts().then((data => {
            this.accounts = data;
            this.formattedAccounts = data.map(account => ({
                accountId: account.accountId,
                accountName: account.accountName,
                ownerName: account.ownerName,
                createdDate: new Date(account.createdDate).toLocaleDateString("en-US"),
                checkingAmount: new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD"
                }).format(account.checkingAmount),
                savingsAmount: new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD"
                }).format(account.savingsAmount),
            }));
        }));
    }
}