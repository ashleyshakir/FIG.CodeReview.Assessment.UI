import { IComponentOptions } from "angular";
import template from "./account-detail.template.html";
import "./account-detail.style.scss";
import { AccountService } from "../../shared/services";
import { AccountDetail } from  "../../shared/services";
import { TransitionService } from "@uirouter/core";



export class AccountDetailComponent {
    static componentName: string = "accountDetailComponent";
    static componentDefinition: IComponentOptions = {
        controller: AccountDetailComponent,
        controllerAs: "$ctrl",
        template: template,
        bindings: {
        }
    };

    static $inject = ["$transitions", "accountService"];

    public account: AccountDetail | null = null;

    constructor(private $transitions: TransitionService, private accountService: AccountService) {}


    $onInit(): void {    
        console.log(this.$transitions);
        this.$transitions.onBefore({ to: "accountDetail" }, (transition) => {
            console.log("Before transition fired:", transition);
        });

        console.log("component initialized");
        this.$transitions.onBefore({}, (transition) => {
            console.log("Global Before transition fired:", transition);
        });
        this.$transitions.onSuccess({ to: "accountDetail" }, (transition) => {
            console.log("Transition fired:", transition);
            console.log("Transition params:", transition.params());
            const accountId = transition.params().accountId;
            console.log("Account ID from transition params:", accountId);
            if (accountId) {
                this.loadAccountDetails(accountId);
            }
        });
    }

    private loadAccountDetails(accountId: number): void {
        console.log("Loading account details for accountId:", accountId);

        this.accountService.getAccountDetails(accountId)
            .then((accountDetails) => {
                console.log("Account details received:", accountDetails);
                this.account = accountDetails;
            })
            .catch((error) => {
                console.error("Error fetching account details:", error);
            });
    }


}