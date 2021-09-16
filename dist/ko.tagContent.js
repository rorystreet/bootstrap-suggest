/* ===================================================
* ko.tagContent.js
* This function allows the use of bootstrap-suggest as a binding handler
* from within KnockoutJS
* ===================================================
* Copyright 2021 
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://opensource.org/licenses/MIT
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ========================================================== */

ko.bindingHandlers.tagContent = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {

        ko.utils.registerEventHandler(element, "blur", function (event) {
            event.cancelBubble = true;
            if (event.stopPropagation) {
                event.stopPropagation();
            }
        });

    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var unwrapped = ko.utils.unwrapObservable(valueAccessor());

        $(element)
            .suggest('@',
                {
                    data: function (q) {
                        if (q) {
                            var offset = $(element).caret('pos');
                            $(element).data("lastOffset", offset);

                            var dropDownContent = unwrapped.dataList();

                            var arr = $.grep(dropDownContent, function (item) {
                                return item.DisplayName.toLowerCase().startsWith(q.toLowerCase());
                            });

                            if (arr.length > 0) {

                                return arr;
                            } else {
                                return false;
                            }

                        }

                        return false;
                    },
                    map: function (user) {
                        if (!user) {
                            return false;
                        }

                        return {

                            value: user[unwrapped.dataValue],
                            text: user[unwrapped.dataText]
                        }
                    }
                    // ...
                });
    }
};