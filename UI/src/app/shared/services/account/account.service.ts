import { IPromise, IQService, ITimeoutService } from "angular";
import summary from "./account-list.json";
import details from "./account-detail.json";
import { AccountSummary } from "./account-list-model";
import { AccountDetail } from "./account-detail-model";

export class AccountService {
    static serviceName = "accountService"
    static $inject = ["$timeout", "$q"]
    constructor(private $timeout: ITimeoutService, private $q: IQService) {
        this.accountSummaryList = summary as AccountSummary[];
        this.accountDetailList = details as AccountDetail[];
    }

    private accountSummaryList: AccountSummary[];
    private accountDetailList: AccountDetail[];
    
    /** Generates a random number between 100 and 1000. */
    private getRandomDelayMilliseconds(): number {
        return Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
    }

    /**
     * Returns a list of all accounts in the system.
     * @returns A list of all accounts in the system.
     */
    public getAllAccounts(): IPromise<AccountSummary[]> {
        // Simulate an API call by introducing an artificial delay.
        return this.$timeout(this.getRandomDelayMilliseconds())
            .then(() => {
                return this.accountSummaryList;
            });
    }

    /**
     * Returns a list of accounts associated with the ownerId provided.
     * @param ownerId The ownerId associated with the accounts.
     * @returns A list of accounts associated with the ownerId provided.
     */
    public getAccountDetails(ownerId: number): IPromise<AccountDetail[]> {
        // Simulate an API call by introducing an artificial delay.
        return this.$timeout(this.getRandomDelayMilliseconds())
            .then(() => {
                const filteredAccounts = this.accountDetailList.filter((account) => {
                    return account.ownerId === ownerId;
                });

                if (filteredAccounts.length > 0) {
                    return filteredAccounts;
                } else {
                    return this.$q.reject("Accounts not found for the given owner ID.");
                }
            });
    }

    public getAccountDetailsByAccountId(accountId: number): IPromise<AccountDetail> {
        console.log("Fetching account details for accountId:", accountId);
        console.log("accountDetailList:", this.accountDetailList);

        return this.$timeout(this.getRandomDelayMilliseconds())
            .then(() => {
                const accountDetails = this.accountDetailList.find((account) => account.accountId === Number(accountId));
                console.log("Found account details:", accountDetails);

                if (accountDetails) {
                    console.log("Found account details:", accountDetails);
                    return accountDetails;
                } else {
                    console.log("Did not find account details:", accountDetails);

                    const accountSummary = this.accountSummaryList.find((account) => account.accountId === Number(accountId));
                    if (accountSummary) {
                        return this.createFallbackAccountDetail(accountSummary);
                    } else {
                        return this.$q.reject("Account not found for the given account ID.");
                    }
                }
            });
    }

    /**
     * Creates a fallback AccountDetail object with sensible defaults.
     * @param accountSummary The account summary to base the fallback on.
     * @returns A fallback AccountDetail object.
     */
    private createFallbackAccountDetail(accountSummary: AccountSummary): AccountDetail {
        return {
            accountId: accountSummary.accountId,
            ownerId: accountSummary.ownerId,
            accountName: accountSummary.accountName,
            ownerName: accountSummary.ownerName,
            checkingAmount: accountSummary.checkingAmount,
            savingsAmount: accountSummary.savingsAmount,
            createdDate: accountSummary.createdDate,
            interestRate: accountSummary.interestRate,
            status: accountSummary.status,
            ownerBirthdate: "",
            ficoScore: 0,
            activityTimeline: [],
        };
    }

    /**
     * Adds a new account to the system.
     * @param account The account to be added.
     * @returns A promise indicating whether the account was added successfully or an error occurred.
     */
    public async addAccount(account: AccountSummary): Promise<void> {
        await this.$timeout(this.getRandomDelayMilliseconds());

        // Validate the provided account data.
        if (!account || !account.accountName || !account.ownerName) {
            console.error('Invalid account data:', account);
            return this.$q.reject('Account data is invalid.');
        }

        // If the account does not have an accountId, generate a new one by finding the next highest accountId.
        if (!account.accountId) {
            account.accountId = Math.max(...this.accountSummaryList.map(a => a.accountId)) + 1;
        }

        // Add the new account to the account summary list.
        this.accountSummaryList.push(account);
    }    
    
}