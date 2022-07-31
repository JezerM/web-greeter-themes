const defaultBackgrounds = ["assets/dracula.png", "assets/window-blurred.png"];
export class Backgrounds {
    constructor() {
        this._backgroundSelector = document.querySelector("#background-selector");
        this._backgroundElement = document.querySelector("#background");
        this._backgroundImages = [];
        this._backgroundImagesDir = "";
        this._backgroundPath = "";
        /**
         * Background change requests are handled via broadcast events so that all
         * windows correctly update.
         */
        window.addEventListener("GreeterBroadcastEvent", (ev) => {
            const data = ev.data;
            if (data.type == "change-background") {
                this._backgroundPath = data.path;
                this.updateBackgroundImages();
            }
        });
    }
    createImageButton(path) {
        const image = document.createElement("img");
        const button = document.createElement("button");
        const imageName = path.replace(/^.*[\\/]/, "");
        button.classList.add("image");
        image.src = path;
        image.alt = imageName;
        button.appendChild(image);
        return button;
    }
    async createBackgroundArray() {
        const images = await this.getBackgroundImages();
        this._backgroundImages = defaultBackgrounds.concat(images);
        this.setBackgroundImages();
        return new Promise((resolve) => resolve());
    }
    updateOnStartup() {
        this._backgroundPath =
            window.localStorage.getItem("defaultBackgroundImage") ||
                this._backgroundImages[0];
        this.updateBackgroundImages();
    }
    updateBackgroundImages() {
        let img = this._backgroundElement?.querySelector("img");
        if (!img) {
            img = document.createElement("img");
            this._backgroundElement?.appendChild(img);
        }
        img.src = this._backgroundPath;
        window.localStorage.setItem("defaultBackgroundImage", this._backgroundPath);
    }
    setBackgroundImages() {
        if (!this._backgroundSelector)
            return;
        this._backgroundSelector.innerHTML = "";
        for (const path of this._backgroundImages) {
            const button = this.createImageButton(path);
            button.addEventListener("click", () => {
                if (window.greeter_comm) {
                    window.greeter_comm.broadcast({
                        type: "change-background",
                        path,
                    });
                }
                else {
                    this._backgroundPath = path;
                    this.updateBackgroundImages();
                }
            });
            this._backgroundSelector.appendChild(button);
        }
    }
    getBackgroundImages(path) {
        if (!window.greeter_config || !window.theme_utils)
            return new Promise((resolve) => resolve([]));
        this._backgroundImagesDir =
            window.greeter_config.branding.background_images_dir ||
                "/usr/share/backgrounds";
        return new Promise((resolve) => {
            window.theme_utils?.dirlist(path ? path : this._backgroundImagesDir, true, (result) => {
                resolve(result);
            });
        });
    }
    async init() {
        await this.createBackgroundArray();
        this.updateOnStartup();
        return new Promise((resolve) => resolve());
    }
}
//# sourceMappingURL=backgrounds.js.map