export class Battery {
    constructor() {
        this._batteryLabel = document.querySelector("#battery-label");
        this._batteryInfo = null;
        this.init();
    }
    updateData() {
        if (!this._batteryLabel)
            return;
        this._batteryInfo = window.lightdm?.battery_data ?? null;
        console.log(this._batteryInfo);
        const level = this._batteryInfo?.level ?? 0;
        //const status = this._batteryInfo?.status;
        const acStatus = this._batteryInfo?.ac_status;
        let icon = "0";
        let charging = "";
        const blevel = Math.floor(level / 10) * 10;
        icon = `-${blevel}`;
        charging = acStatus ? "-charging" : "";
        console.log({ acStatus, charging });
        if (blevel < 10)
            icon = "-outline";
        if (level == 100 && acStatus == false) {
            icon = "";
        }
        if (level >= 0) {
            this._batteryLabel.style.display = "";
            this._batteryLabel.innerHTML = `<span class="mdi mdi-battery${charging}${icon}"></span> ${level}%`;
        }
        else {
            this._batteryLabel.innerHTML = "";
            this._batteryLabel.style.display = "none";
        }
    }
    setCallback() {
        if (!window.lightdm?.can_access_battery) {
            if (!this._batteryLabel)
                return;
            this._batteryLabel.innerHTML = "";
            this._batteryLabel.style.display = "none";
            return;
        }
        this.updateData();
        window.lightdm?.battery_update.connect(() => {
            this.updateData();
        });
    }
    init() {
        this.setCallback();
    }
}
//# sourceMappingURL=battery.js.map