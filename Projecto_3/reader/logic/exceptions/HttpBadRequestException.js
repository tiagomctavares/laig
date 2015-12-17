function HttpBadRequestException(url, message) {
    if (message === undefined)
        message = 'The request is in a bad format ';

    this.message = message + url;
}

HttpBadRequestException.prototype.toString = function () {
    return this.message;
};
