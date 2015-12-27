var RequestTemplate = function (tpl, data) {
    var uri = prologURIs[tpl];

    if (uri === undefined)
        throw new PrologUriNotFoundException(tpl);

    var regex = /<%([^%>]+)?%>/g;
    var matches = uri.match(regex);

    if (matches !== null) {
        for (var i = 0; i < matches.length; i++) {
            var varName = matches[i].substring(2, matches[i].length - 2);

            if(data[varName] === undefined)
                throw new DictionaryVariableMissingException(varName, tpl);

            uri = uri.replace(matches[i], data[varName]);
        }
    }

    return makeUrl(uri);
};

var makeUrl = function (tpl) {
    return prologConfig.protocol
        + trimSlashes(prologConfig.url)
        + prologConfig.urlSeparator
        + trimSlashes(tpl);
};

var trimSlashes = function (string) {
    if (string.charAt(0) == "/") string = string.substr(1);
    if (string.charAt(string.length - 1) == "/") string = string.substr(0, string.length - 1);
    return string;
};