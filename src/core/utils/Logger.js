define(["require", "exports"], function(require, exports) {
    var Logger = (function () {
        function Logger(s) {
            this.s = s;
            console.log(s);
        }
        Logger.message = function message(s) {
            console.log(s);
        };
        return Logger;
    })();
    exports.Logger = Logger;    
})
//@ sourceMappingURL=Logger.js.map
