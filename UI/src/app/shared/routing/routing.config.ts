import { ILocationProvider } from "angular";
import { UrlService } from "@uirouter/angularjs";

export const routeConfigFn = configFn;

configFn.$inject = ["$urlServiceProvider", "$locationProvider"];
function configFn($urlServiceProvider: UrlService, $locationProvider: ILocationProvider) {
    // Redirect to the accounts page if no other route matches.
    $urlServiceProvider.rules.otherwise("/accounts");

    // Redirect to the accounts page if the URL doesn't include a path segment.
    $urlServiceProvider.rules.when("/", "/accounts");
    $urlServiceProvider.rules.when("", "/accounts");

    

    $locationProvider.html5Mode({ enabled: true, requireBase: false });
}