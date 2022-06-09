(function () {
    "use strict";
    function each(s, cb) {
        Array.prototype.slice.call(document.querySelectorAll(s)).forEach(cb);
    }
    var homeLink = document.getElementsByClassName("main-link home")[0];
    if (homeLink !== null && typeof homeLink !== undefined) {
        homeLink.onclick = function () {
            each(".nav-accordion .title", function (el) {
                if (el !== null) {
                    el.parentNode.classList.add("collapsed");
                }
            });
            Nav.saveState();
        };
    }
    var search = document.querySelector("#search input");
    function animateHeight(element, open) {
        if (element === null || element === undefined) {
            return;
        }
        var start = open ? 0 : element.scrollHeight;
        var end = open ? element.scrollHeight : 0;
        element.style.height = start + "px";
        clearTimeout(element.__timeout);
        element.__timeout = setTimeout(function () {
            element.style.height = end + "px";
            element.__timeout = setTimeout(function () {
                element.style.height = null;
            }, 500);
        }, 10);
    }
    var Nav = {
        initialize: function () {
            each(".nav-accordion .title", function (el) {
                el.addEventListener("click", function (e) {
                    var sectionContainer = e.target.parentNode;
                    animateHeight(sectionContainer.querySelector("ul"), sectionContainer.classList.contains("collapsed"));
                    sectionContainer.classList.toggle("collapsed");
                    Nav.saveState();
                });
            });
        },
        setActiveItem: function () {
            var activeElement = null;
            each("main > nav a", function (link) {
                if (window.location.href.indexOf(link.href) >= 0) {
                    link.classList.add("active");
                    activeElement = link;
                }
            });
            return activeElement;
        },
        restoreState: function () {
            var visibilityState = sessionStorage.getItem("nav-state");
            if (visibilityState) {
                visibilityState = JSON.parse(visibilityState);
                each(".nav-accordion .title ~ ul", function (el, i) {
                    if (el !== null) {
                        if (visibilityState[i]) {
                            el.parentNode.classList.remove("collapsed");
                        }
                        else {
                            el.parentNode.classList.add("collapsed");
                        }
                    }
                });
            }
        },
        saveState: function () {
            var visibilityState = [];
            each(".nav-accordion .title ~ ul", function (el) {
                visibilityState.push(!el.parentNode.classList.contains("collapsed"));
            });
            sessionStorage.setItem("nav-state", JSON.stringify(visibilityState));
        },
        focusOnActiveElement: function (iActiveElement) {
            if (iActiveElement !== null && iActiveElement !== undefined) {
                iActiveElement.scrollIntoView();
            }
        },
        expandParents: function (iElement) {
            var currentParent = iElement.parentNode;
            while (currentParent && currentParent.classList !== undefined) {
                currentParent.classList.remove("collapsed");
                currentParent = currentParent.parentNode;
            }
        }
    };
    document.addEventListener("DOMContentLoaded", function () {
        Nav.initialize();
        var activeElement = Nav.setActiveItem();
        Nav.restoreState();
        if (activeElement !== null) {
            Nav.focusOnActiveElement(activeElement);
            Nav.expandParents(activeElement);
        }
        search.focus();
    });
})();
