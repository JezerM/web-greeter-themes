const defaultBackgrounds = [
    "assets/bubbles.svg",
    "assets/topography.svg",
    "assets/death star.svg",
];
export class Backgrounds {
    constructor() {
        this._backgroundBlur = 0;
        this._backgroundSelectorList = document.querySelector("#background-selector-list");
        this._backgroundSelectorCurrent = document.querySelector("#current-background");
        this._backgroundSelectorCurrentLabel = document.querySelector("#current-background-label");
        this._backgroundElement = document.querySelector("#background");
        this._backgroundSelector = document.querySelector("#background-selector");
        this._backgroundSelectorBackButton = document.querySelector("#background-selector-back");
        this._backgroundSelectorEnterButton = document.querySelector("#background-selector-enter");
        this._screenDiv = document.querySelector("#screen");
        this._backgroundBlurInput = document.querySelector("#background-blur > input");
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
    createImageElement(path) {
        const button = document.createElement("button");
        button.classList.add("image");
        if (path == "userBackground") {
            button.innerText = "User Background";
        }
        else {
            button.style.backgroundImage = `url("${path}")`;
        }
        return button;
    }
    async createBackgroundArray() {
        const images = await this.findImages(this._backgroundImages);
        const userBackground = ["userBackground"];
        this._backgroundImages = userBackground
            .concat(defaultBackgrounds)
            .concat(images);
        this.setBackgroundImages();
        return new Promise((resolve) => resolve());
    }
    updateOnStartup() {
        this._backgroundPath = window.themeData.background ?? defaultBackgrounds[0];
        this.updateBackground(this._backgroundPath);
        this._backgroundBlur = window.themeData.backgroundBlur;
        this.setBackgroundBlur();
    }
    updateBackgroundImages() {
        if (!this._backgroundElement)
            return;
        let imagePath = this._backgroundPath;
        const imageName = imagePath.replace(/^.*[\\/]/, "");
        if (imagePath == "userBackground") {
            const user = window.lightdm?.users.find((v) => v.username == window.lightdm?.authentication_user);
            imagePath =
                user?.background && user?.background.trim().length != 0
                    ? user?.background
                    : defaultBackgrounds[0];
        }
        if (this._backgroundSelectorCurrent) {
            this._backgroundSelectorCurrent.style.backgroundImage = `url("${imagePath}")`;
            if (defaultBackgrounds.includes(imagePath)) {
                this._backgroundSelectorCurrent.style.backgroundSize = "auto";
            }
            else {
                this._backgroundSelectorCurrent.style.backgroundSize = "";
            }
        }
        if (this._backgroundSelectorCurrentLabel) {
            this._backgroundSelectorCurrentLabel.innerText = imageName;
        }
        this._backgroundElement.style.backgroundImage = `url("${imagePath}")`;
        if (defaultBackgrounds.includes(imagePath)) {
            this._backgroundElement.style.backgroundSize = "";
        }
        else {
            this._backgroundElement.style.backgroundSize = "cover";
        }
        window.themeData.background = this._backgroundPath;
        window.themeData.save();
    }
    updateBackground(path) {
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
    }
    setBackgroundImages() {
        if (!this._backgroundSelectorList)
            return;
        this._backgroundSelectorList.innerHTML = "";
        for (const path of this._backgroundImages) {
            const button = this.createImageElement(path);
            button.addEventListener("click", () => {
                this.updateBackground(path);
            });
            this._backgroundSelectorList.appendChild(button);
        }
    }
    // Taken from @manilarome/lightdm-webkit2-theme-glorious
    async findImages(dirlist) {
        const images = [];
        const subdirs = [];
        let recursion = 0;
        // Check image files/dir, and push it to its respective array
        for (const file of dirlist) {
            if (file.match(/.+\.(jpe?g|png|gif|bmp|webp|svg)/)) {
                images.push(file);
            }
            else if (!file.match(/\w+\.\w+/)) {
                subdirs.push(file);
            }
        }
        // Search recursively
        if (subdirs.length && recursion < 3) {
            recursion++;
            for (const dir of subdirs) {
                const list = await this.getBackgroundImages(dir);
                if (list && list.length) {
                    const toadd = await this.findImages(list);
                    images.push(...toadd);
                }
            }
        }
        return images;
    }
    getBackgroundImages(path) {
        if (!window.greeter_config || !window.theme_utils)
            return new Promise((resolve) => resolve([]));
        this._backgroundImagesDir =
            window.greeter_config.branding.background_images_dir ||
                "/usr/share/backgrounds";
        return new Promise((resolve) => {
            window.theme_utils?.dirlist(path ? path : this._backgroundImagesDir, false, (result) => {
                resolve(result);
            });
        });
    }
    showBackgroundSelector() {
        if (!this._backgroundSelector || !this._screenDiv)
            return;
        this._backgroundSelector.classList.remove("hide");
        this._screenDiv.classList.add("hide");
        this.setBackgroundSelectorKeydown();
    }
    hideBackgroundSelector() {
        if (!this._backgroundSelector || !this._screenDiv)
            return;
        this._backgroundSelector.classList.add("hide");
        this._screenDiv.classList.remove("hide");
    }
    setBackgroundSelectorBackButton() {
        if (!this._backgroundSelectorBackButton)
            return;
        this._backgroundSelectorBackButton.addEventListener("click", () => {
            this.hideBackgroundSelector();
        });
    }
    setBackgroundSelectorEnterButton() {
        if (!this._backgroundSelectorEnterButton)
            return;
        this._backgroundSelectorEnterButton.addEventListener("click", () => {
            this.showBackgroundSelector();
        });
    }
    setBackgroundSelectorKeydown() {
        const callback = (ev) => {
            if (ev.key == "Escape") {
                this.hideBackgroundSelector();
                document
                    .querySelector("body")
                    ?.removeEventListener("keydown", callback);
            }
        };
        document.querySelector("body")?.addEventListener("keydown", callback);
    }
    setBackgroundBlur() {
        if (!this._backgroundBlurInput || !this._backgroundElement)
            return;
        this._backgroundElement.style.filter = `blur(${this._backgroundBlur}px)`;
        this._backgroundBlurInput.valueAsNumber = this._backgroundBlur;
    }
    setBackgroundBlurInputEvent() {
        if (!this._backgroundBlurInput)
            return;
        this._backgroundBlurInput.addEventListener("input", () => {
            this._backgroundBlur = this._backgroundBlurInput?.valueAsNumber ?? 0;
            window.themeData.backgroundBlur = this._backgroundBlur;
            window.themeData.save();
            this.setBackgroundBlur();
        });
    }
    async init() {
        this.setBackgroundSelectorBackButton();
        this.setBackgroundSelectorEnterButton();
        this.setBackgroundBlurInputEvent();
        this._backgroundImages = await this.getBackgroundImages();
        await this.createBackgroundArray();
        this.updateOnStartup();
        return new Promise((resolve) => resolve());
    }
}
//# sourceMappingURL=background.js.map