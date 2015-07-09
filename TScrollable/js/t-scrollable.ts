interface ITScrollableOptions {
    initMode: string; // This can be "default", "firstclick", "scroll"
}

class TScrollable {
    private sourceTable: JQuery;

    public init(options?: ITScrollableOptions): void {
        if (typeof options == "undefined" || options == null)
            options = this.getDefaultOptions();

        var containers: JQuery = $(this.getSelectorForClass(TScrollableClasses.container));

        var self: TScrollable = this;

        containers.each((i, e) => {
            self.initInstance($(e), options);
        });
    }

    private initInstance(container: JQuery, options: ITScrollableOptions): void {
        this.sourceTable = container.children("table").first();

        if (options.initMode == "default") {
            this.setOverlay("rows", container);
            this.setOverlay("cols", container);
        }
        else {
            // TODO: Attach event handlers
        }
    }

    private setOverlay(dimension: string, container: JQuery): void {
        var overlay: JQuery = this.sourceTable.clone();
        overlay.addClass(TScrollableClasses.overlay);
        overlay.addClass(dimension == "rows"
            ? TScrollableClasses.rowHeaders
            : TScrollableClasses.colHeaders);

        var headerClass: string = dimension == "rows"
            ? TScrollableClasses.rowHeader
            : TScrollableClasses.colHeader;

        // *** Set background on headers ***
        var originalBg: string = overlay.find(this.getSelectorForClass(headerClass)).css("background");
        overlay.css("background", "transparent");
        if (typeof originalBg == "undefined" || originalBg == null || originalBg == "transparent" || originalBg == "none" || originalBg == "")
            originalBg = "#fff";
        overlay.find(this.getSelectorForClass(headerClass)).css("background", originalBg);
        // ---------------------------------------

        // *** Hide all elements except row headers ***
        overlay.css("pointer-events", "none");
        overlay.find("*").not("tbody").not("thead").not("tr").not(this.getSelectorForClass(headerClass))
            .each((i, e) => {

            $(e).css("visibility", "hidden");
        });
        // ---------------------------------------

        
        container.append(overlay);
    }

    private getDefaultOptions(): ITScrollableOptions {
        return {
            //scrollColumns: false,
            //scrollRows: true,
            initMode: "default"
        };
    }

    private getSelectorForClass(className: string): string {
        return ("." + className);
    }
}

class TScrollableClasses {
    public static container: string = "t-scrollable";

    public static overlay: string = "t-scrollable-overlay";

    public static rowHeader: string = "t-scrollable-row-header";

    public static colHeader: string = "t-scrollable-col-header";

    public static rowHeaders: string = "t-scrollable-row-headers";

    public static colHeaders: string = "t-scrollable-col-headers";
}

var ts: TScrollable = new TScrollable();
ts.init();