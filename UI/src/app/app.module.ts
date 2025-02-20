import angular from "angular";
import { homeModule, accountListModule, accountDetailModule } from "./features/index";
import { sharedModule } from "./shared/shared.module";
import "jquery";
import "lodash";
import "@uirouter/angularjs";

export default angular
    .module("app", [
        "ui.router", 
        homeModule.name, 
        accountListModule.name,
        accountDetailModule.name,
        sharedModule.name
    ])
    .name;