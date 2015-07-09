var TScrollable = (function () {
    function TScrollable() {
    }
    TScrollable.prototype.init = function (options) {
        if (typeof options == "undefined" || options == null)
            options = this.getDefaultOptions();
        var containers = $(this.getSelectorForClass(TScrollableClasses.container));
        var self = this;
        containers.each(function (i, e) {
            self.initInstance($(e), options);
        });
    };
    TScrollable.prototype.initInstance = function (container, options) {
        this.sourceTable = container.children("table").first();
        if (options.initMode == "default") {
            this.setOverlay("rows", container);
            this.setOverlay("cols", container);
        }
        else {
        }
    };
    TScrollable.prototype.setOverlay = function (dimension, container) {
        var overlay = this.sourceTable.clone();
        overlay.addClass(TScrollableClasses.overlay);
        overlay.addClass(dimension == "rows" ? TScrollableClasses.rowHeaders : TScrollableClasses.colHeaders);
        var headerClass = dimension == "rows" ? TScrollableClasses.rowHeader : TScrollableClasses.colHeader;
        // *** Set background on headers ***
        var originalBg = overlay.find(this.getSelectorForClass(headerClass)).css("background");
        overlay.css("background", "transparent");
        if (typeof originalBg == "undefined" || originalBg == null || originalBg == "transparent" || originalBg == "none" || originalBg == "")
            originalBg = "#fff";
        overlay.find(this.getSelectorForClass(headerClass)).css("background", originalBg);
        // ---------------------------------------
        // *** Hide all elements except row headers ***
        overlay.css("pointer-events", "none");
        overlay.find("*").not("tbody").not("thead").not("tr").not(this.getSelectorForClass(headerClass)).each(function (i, e) {
            $(e).css("visibility", "hidden");
        });
        // ---------------------------------------
        container.append(overlay);
    };
    TScrollable.prototype.getDefaultOptions = function () {
        return {
            //scrollColumns: false,
            //scrollRows: true,
            initMode: "default"
        };
    };
    TScrollable.prototype.getSelectorForClass = function (className) {
        return ("." + className);
    };
    return TScrollable;
})();
var TScrollableClasses = (function () {
    function TScrollableClasses() {
    }
    TScrollableClasses.container = "t-scrollable";
    TScrollableClasses.overlay = "t-scrollable-overlay";
    TScrollableClasses.rowHeader = "t-scrollable-row-header";
    TScrollableClasses.colHeader = "t-scrollable-col-header";
    TScrollableClasses.rowHeaders = "t-scrollable-row-headers";
    TScrollableClasses.colHeaders = "t-scrollable-col-headers";
    return TScrollableClasses;
})();
var ts = new TScrollable();
ts.init();
//# sourceMappingURL=t-scrollable.js.map