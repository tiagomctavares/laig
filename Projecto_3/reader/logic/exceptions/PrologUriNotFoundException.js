function PrologUriNotFoundException(uri, message) {
    if (message === undefined)
        message = 'The uri is not defined ';

    this.message = message + uri;
}

PrologUriNotFoundException.prototype.toString = function () {
    return this.message;
};
