export class TimeDate {
    constructor() {
        this._timeDateButton = document.querySelector("#time-date");
        this._timeLabel = document.querySelector("#time-date #time-label");
        this._dateLabel = document.querySelector("#time-date #date-label");
        this._passFormWrapper = document.querySelector("#pass-form");
        this.init();
    }
    _updateTimeDate() {
        if (!window.theme_utils || !this._dateLabel || !this._timeLabel)
            return;
        const date = window.theme_utils.get_current_localized_date();
        const time = window.theme_utils.get_current_localized_time();
        this._dateLabel.innerText = date;
        this._timeLabel.innerText = time;
    }
    setTimer() {
        this._updateTimeDate();
        setInterval(() => {
            this._updateTimeDate();
        }, 1000);
    }
    setButtons() {
        this._timeDateButton?.addEventListener("click", () => {
            this.toggleTimeDate();
        });
        this._passFormWrapper?.addEventListener("keydown", (ev) => {
            if (ev.keyCode == 27) {
                this.toggleTimeDate();
            }
        });
    }
    async toggleTimeDate() {
        this._timeDateButton?.blur();
        this._passFormWrapper?.blur();
        if (this._timeDateButton?.classList.contains("hide")) {
            this._passFormWrapper?.classList.add("hide");
            await window.wait(300);
            this._timeDateButton.classList.remove("hide");
            await window.wait(100);
            this._timeDateButton.focus();
        }
        else {
            this._timeDateButton?.classList.add("hide");
            await window.wait(300);
            this._passFormWrapper?.classList.remove("hide");
        }
    }
    init() {
        this.setTimer();
        this.setButtons();
    }
}
//# sourceMappingURL=timeDate.js.map