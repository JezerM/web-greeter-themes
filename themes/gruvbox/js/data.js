const GRUVBOX_DATA = "gruvboxData";
export class Data {
    constructor() {
        this.userName = null;
        this.background = null;
        this.backgroundBlur = 0;
        this.load();
    }
    load() {
        const data = window.localStorage.getItem(GRUVBOX_DATA);
        if (!data)
            return;
        const object = JSON.parse(data);
        this.userName = object?.userName ?? null;
        this.background = object?.background ?? null;
        this.backgroundBlur = Number(object?.backgroundBlur ?? 0);
    }
    save() {
        const data = JSON.stringify(this);
        window.localStorage.setItem(GRUVBOX_DATA, data);
    }
}
//# sourceMappingURL=data.js.map