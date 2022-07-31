export class TimeDate {
    constructor() {
        this._timeLabel = document.querySelector("#time-date #time-label");
        this._dateLabel = document.querySelector("#time-date #date-label");
        this.init();
    }
    updateTimeDate() {
        if (!this._dateLabel || !this._timeLabel)
            return;
        const date = window.theme_utils?.get_current_localized_date() ?? "";
        const time = window.theme_utils?.get_current_localized_time() ?? "";
        this._dateLabel.innerText = date;
        this._timeLabel.innerText = time;
    }
    setTimer() {
        this.updateTimeDate();
        setInterval(() => {
            this.updateTimeDate();
        }, 1000);
    }
    init() {
        this.setTimer();
    }
}
//# sourceMappingURL=timeDate.js.map