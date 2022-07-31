export class Brightness {
    constructor() {
        this._brightnessLabel = document.querySelector("#brightness-label");
        this._level = 0;
        this.init();
    }
    updateData() {
        if (!this._brightnessLabel)
            return;
        this._level = window.lightdm?.brightness ?? 0;
        if (this._level >= 0) {
            this._brightnessLabel.style.visibility = "visible";
            const icon = this._level > 50 ? 7 : this._level > 10 ? 6 : 5;
            this._brightnessLabel.innerHTML = `<span class="mdi mdi-brightness-${icon}"></span> ${this._level}%`;
        }
        else {
            this._brightnessLabel.innerHTML = "";
            this._brightnessLabel.style.visibility = "hidden";
        }
    }
    setCallback() {
        if (!window.lightdm?.can_access_brightness)
            return;
        this.updateData();
        window.lightdm?.brightness_update.connect(() => {
            this.updateData();
        });
    }
    init() {
        this.setCallback();
    }
}
//# sourceMappingURL=brightness.js.map