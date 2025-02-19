import angular from "angular";
import { homeModule, accountListModule } from "./features/index";
import { sharedModule } from "./shared/shared.module";
import "jquery";
import "lodash";
import "@uirouter/angularjs";

export default angular
    .module("app", ["ui.router", homeModule.name, accountListModule.name, sharedModule.name])
    .name;