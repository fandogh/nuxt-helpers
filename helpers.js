function unique(arr) {
    return arr.filter(function (value, index) {
        return arr.indexOf(value) === index;
    });
}

module.exports = {
    unique
};