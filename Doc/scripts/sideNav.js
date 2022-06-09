(function () {
    "use strict";
    var SELECTION_OFFSET = 100;
    var menu = document.getElementsByClassName("table-of-contents")[0];
    if (menu === undefined || menu === null) {
        return;
    }
    var menuTopPosition = menu.offsetTop;
    var menuLinks = [].slice.call(menu.getElementsByTagName("a"));
    var pointedItems = menuLinks.map(function (element) {
        var href = element.getAttribute("href").replace(/%/g, "\\%");
        var item = document.querySelector(href);
        if (item !== null) {
            if (item.tagName[0] == "H") {
                element.parentElement.parentElement.classList.add("offset-" + item.tagName);
            }
            return [item, element];
        }
    });
    var lastIem = null;
    var body = document.getElementsByClassName("main-content")[0];
    var selectItemInMenu = function () {
        var fromTop = body.scrollTop + menuTopPosition + SELECTION_OFFSET;
        var currentItem = null;
        for (var i = 0; i < pointedItems.length; ++i) {
            var mainContentItem = pointedItems[i][0];
            if (mainContentItem.offsetTop > fromTop) {
                var previousIndex = i > 0 ? i - 1 : i;
                currentItem = pointedItems[previousIndex][1];
                break;
            }
        }
        if (currentItem === null) {
            currentItem = pointedItems[pointedItems.length - 1][1];
        }
        currentItem.classList.add("active");
        currentItem.scrollIntoView(false);
        if (lastIem !== currentItem) {
            if (lastIem !== null) {
                lastIem.classList.remove("active");
            }
            lastIem = currentItem;
        }
    };
    body.addEventListener("scroll", function () {
        selectItemInMenu();
    });
    selectItemInMenu();
})();
