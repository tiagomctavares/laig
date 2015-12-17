function DictionaryVariableMissingException(variable, prologUri, message) {
    if (message === undefined)
        message = 'Dictionary variable is missing can\'t assign it to PrologRequest:  ';

    this.message = message + variable + ' (Prolog URI: ' + prologUri + ')';
}

DictionaryVariableMissingException.prototype.toString = function () {
    return this.message;
};
