function ErrorMessage() {
    'use strict';
    return;
}

ErrorMessage.URLERROR = {
    errorType: "url"
};

ErrorMessage.ERRORREQUEST = {
    error: "sorry"
};

ErrorMessage.ID_NOT_FOUND = {
    error: "Not Found this id"
};

module.exports = ErrorMessage;