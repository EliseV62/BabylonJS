(function () {
    "use strict";
    function escape(c) {
        return c.replace(/\\/g, "\\\\").replace(/([\-.*+\?\^$()\[\]{}|])/g, "\\$1");
    }
    function el(type, attrs) {
        var result = document.createElement(type);
        var attr;
        for (attr in attrs) {
            if (attr === "text") {
                result.textContent = attrs[attr];
            }
            else if (attr === "html") {
                result.innerHTML = attrs[attr];
            }
            else {
                result.setAttribute(attr, attrs[attr]);
            }
        }
        return result;
    }
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (decodeURIComponent(pair[0]) === variable) {
                return decodeURIComponent(pair[1]);
            }
        }
    }
    function search(data, query) {
        var re = [].map.call(query, escape).reduce(function (t, c) {
            if (t) {
                return t + "[^" + t[t.length - 1] + c + "]*" + c;
            }
            else {
                return c;
            }
        });
        re = new RegExp(re, "i");
        var results = data.filter(function (entry) {
            var r = re.exec(entry.search);
            if (r) {
                entry.weight = r[0].length + entry.search.length / 1000;
            }
            return r;
        });
        results.sort(function (a, b) {
            return a.weight - b.weight;
        });
        return results;
    }
    function render(results, query) {
        document.title = 'Search: "' + query + '"';
        var container = document.querySelector(".main-content");
        container.innerHTML = "";
        container.scrollTop = 0;
        var searchText = 'Your search for "' + query + '" ';
        if (!results.length) {
            searchText += "did not result in any matches.";
        }
        else {
            searchText += "resulted in " + results.length;
            if (results.length > 1) {
                searchText += " matches:";
            }
            else {
                searchText += " match:";
            }
        }
        var fragment = document.createDocumentFragment();
        fragment.appendChild(el("h1", {
            "class": "page-title search-title",
            text: searchText
        }));
        if (!results.length) {
            fragment.appendChild(el("p", {
                text: "No result"
            }));
        }
        else {
            var ul = el("ul", { "class": "search-results" });
            var array = [];
            results.forEach(function (result) {
                array.push("<li>");
                array.push(result.link);
                array.push("</li>");
            });
            ul.innerHTML = array.join("");
            fragment.appendChild(ul);
        }
        container.appendChild(fragment);
    }
    var historyStatePushed = false;
    function searchAndRender(query) {
        var searchResult = [];
        if (query) {
            searchResult = search(searchData, query);
        }
        render(searchResult, query);
    }
    function exitSearch() { }
    var input = document.querySelector("#search input");
    input.addEventListener("keyup", function (e) {
        if (e.which === 9 || e.keyCode === 9) {
            e.preventDefault();
            var a = document.querySelector(".main-content a");
            if (a) {
                a.focus();
            }
        }
        else if (e.which === 27 || e.keyCode === 27) {
            if (historyStatePushed) {
                historyStatePushed = false;
                window.location.href = initialURL;
            }
        }
    });
    var eventType = /Trident/.test(navigator.userAgent) ? "textinput" : "input";
    input.addEventListener(eventType, function (e) {
        var searchQuery = input.value;
        searchAndRender(searchQuery);
        var stateMode = historyStatePushed ? "replaceState" : "pushState";
        historyStatePushed = true;
        history[stateMode](null, null, "./index.html?query=" + encodeURIComponent(searchQuery));
    });
    var queryFromURL = getQueryVariable("query");
    if (queryFromURL) {
        searchAndRender(queryFromURL);
        input.value = queryFromURL;
    }
    var initialURL = location.href;
    addEventListener("popstate", function () {
        if (historyStatePushed) {
            if (historyStatePushed || location.href !== initialURL) {
                location.reload();
            }
        }
    });
    addEventListener("keydown", function (e) {
        var isFirstLink = e.target === document.querySelector(".main-content a");
        if (isFirstLink && e.shiftKey && (e.which === 9 || e.keyCode === 9)) {
            e.preventDefault();
            input.focus();
        }
    });
    document.querySelector("#search").addEventListener("submit", function (e) {
        e.preventDefault();
    });
})();
