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

    static $inject = ["accountService", "$state"];

    public accounts: AccountSummary[] = [];
    public filteredAccounts: AccountSummary[] = [];
    public searchQuery: string = "";
    public sortColumn: keyof AccountSummary | null = null;
    public sortAscending: boolean = true;

    public isModalOpen: boolean = false;
    public isLoading: boolean = true;

    public isDeleteModalOpen: boolean = false;
    public accountToDelete: number | null = null;

    constructor(private accountService: AccountService, private $state: any) {
        this.$state = $state;
    }

    $onInit(): void {
        this.loadAccounts();
    }

    private loadAccounts(): void {
        this.isLoading = true;
        this.accountService.getAllAccounts().then((accounts) => {
            this.accounts = accounts.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());

            this.filteredAccounts = [...accounts];
        }).catch((error) => {
            console.error("Error fetching accounts:", error);
        }).finally(() => {
            this.isLoading = false;
        });
    }

    public openModal(): void {
        this.isModalOpen = true;
    }

    public closeModal(): void {
        this.loadAccounts();
        this.isModalOpen = false;
    }

    public filterAccounts(): void {
        const query = this.searchQuery.toLowerCase();
        this.filteredAccounts = this.accounts.filter((account) =>
            Object.keys(account).some((key =>
                account[key as keyof AccountSummary]?.toString().toLowerCase().includes(query)
            ))
        );
    }

    public sortAccounts(column: keyof AccountSummary): void {
        if (this.sortColumn === column) {
            this.sortAscending = !this.sortAscending;
        } else {
            this.sortColumn = column;
            this.sortAscending = true;
        }

        this.filteredAccounts.sort((a, b) => {
            const valA = a[column];
            const valB = b[column];

            if (typeof valA === "number" && typeof valB === "number") {
                return this.sortAscending ? valA - valB : valB - valA;
            } else if (typeof valA === "string" && typeof valB === "string") {
                return this.sortAscending ? valA.localeCompare(valB) : valB.localeCompare(valA);
            }
            return 0;
        });
    }

    // Open the modal when attempting to delete an account
    public removeAccount(accountId: number): void {
        this.accountToDelete = accountId;
        this.isDeleteModalOpen = true;
    }

    // Confirm delete action
    public confirmDelete(): void {
        if (this.accountToDelete !== null) {
            this.filteredAccounts = this.filteredAccounts.filter(account => account.accountId !== this.accountToDelete);
            this.accountToDelete = null;
            this.isDeleteModalOpen = false;
        }
    }

    // Cancel delete action
    public cancelDelete(): void {
        this.isDeleteModalOpen = false;
        this.accountToDelete = null;
    }
    
    

    public goToAccountDetail(accountId: number): void {
        this.$state.go('accountDetail', { accountId: accountId });
    }
    
}