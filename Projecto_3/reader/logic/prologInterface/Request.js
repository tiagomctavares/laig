function Request() {
    this.REQUEST_ASYNC = false;
    this.METHOD_GET = 'GET';
}

Request.prototype.get = function (templateAction, data) {
    var request = this.make(templateAction, this.METHOD_GET, data);

    this.status = request.status;
    this.response = request.response;

    if(this.status != 200)
        throw new HttpBadRequestException(url);

    return this.response;
};

Request.prototype.response = function() {
    return this.response;
};

Request.prototype.status = function() {
    return this.status;
};

Request.prototype.make = function (templateAction, method, data) {
    if (method === undefined) method = this.METHOD_GET;
    if (data === undefined) data = [];

    var url = RequestTemplate(templateAction, data);

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open(method, url, this.REQUEST_ASYNC);
    xmlHttp.send(null);

    return xmlHttp;
};
