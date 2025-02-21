import { IComponentOptions } from "angular";
import template from "./add-account.template.html";
import "./add-account.style.scss";
import { AccountService } from "../../shared/services";
import { AccountSummary } from "../../shared/services";

export class AddAccountComponent {
    static componentName: string = "addAccountComponent";
    static componentDefinition: IComponentOptions = {
        controller: AddAccountComponent,
        controllerAs: "$ctrl",
        template: template,
        bindings: {
            closeModal: "&",
            addAccount: "&"
        }
    };

    public newAccount: Partial<AccountSummary> = {};
    public closeModal!: () => void;
    public addAccount!: (account: AccountSummary) => void;

    static $inject = ["accountService"];

    public isModalOpen: boolean = false;

    constructor(private accountService: AccountService) {}

    public submitForm(): void {
        this.newAccount.createdDate = new Date().toISOString();
        this.accountService.addAccount(this.newAccount as AccountSummary)
            .then(() => {
                this.addAccount(this.newAccount as AccountSummary);
                this.closeModal();
            });
    }
}
