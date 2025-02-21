import { IComponentOptions } from "angular";

export class ConfirmationModalComponent {
    static componentName: string = "confirmationModal";
    static componentDefinition: IComponentOptions = {
        bindings: {
            isOpen: "<",
            message: "<",
            confirmCallback: "&",
            cancelCallback: "&",
        },
        template: `
        <div ng-if="$ctrl.isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div class="bg-gray-800 p-6 rounded-2xl shadow-xl text-white max-w-md w-full">
                <h2 class="text-xl font-semibold mb-4">Confirm Action</h2>
                <p class="text-gray-400 mb-6">{{ $ctrl.message }}</p>
                
                <div class="flex justify-end space-x-4">
                    <button class="px-5 py-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition"
                            ng-click="$ctrl.cancelCallback()">
                        Cancel
                    </button>
                    <button class="px-5 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
                            ng-click="$ctrl.confirmCallback()">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
        `,
    };
}
