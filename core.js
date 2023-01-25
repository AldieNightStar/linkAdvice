function translate(elemTagName) {
    let navLang = navigator.language;
    if (navLang.startsWith("ru")) {
        makeVisibleWithLangs("a", ["ru"])
        makeVisibleWithLangs("b", ["ru"])
    } else if (navLang.startsWith("uk") || navLang.startsWith("ua")) {
        makeVisibleWithLangs("a", ["ua", "uk"])
        makeVisibleWithLangs("b", ["ua", "uk"])
    } else {
        makeVisibleWithLangs("a", ["ua", "uk"])
        makeVisibleWithLangs("b", ["en", "us"])
    }
    let link = getLinkFromParam();
    if (link) {
        replaceLinks("http://www.google.com/", link)
    } else {
        window.alert("ERROR LINK")
    }
}

function makeVisibleWithLangs(tagName, langs) {
    let elems = filterVisibilityTags(tagName, filterByLang(langs));
    elems.forEach(el => el.style.display = "block");
}

function filterVisibilityTags(tagName, filterFN) {
    let visTags = document.getElementsByTagName(tagName);
    let elems = [];
    for (let i = 0; i < visTags.length; i++) {
        let elem = visTags[i];
        if (filterFN(elem)) elems.push(elem);
    }
    return elems;
}

function filterByLang(langPrefixes) {
    return function(elem) {
        if (!elem || !elem.dataset || !elem.dataset.lang) return false;
        for (let i = 0; i < langPrefixes.length; i++) {
            if (elem.dataset.lang.startsWith(langPrefixes[i])) {
                return true;
            }
        }
        return false;
    }
}

function replaceLinks(prevSrc, linkSrc) {
    let elems = document.getElementsByTagName('a');
    for (let i = 0; i < elems.length; i++) {
        let elem = elems[i];
        if (elem.href !== prevSrc) continue;
        elem.href = linkSrc;
    }
}

function getLinkFromParam() {
    let arr = document.location.href.split("#");
    if (arr.length < 2) return;
    return arr[1]
}