export class Accounts {
    constructor() {
        this._userWrapper = document.querySelector("#user-wrapper");
        this._usersDropdown = document.querySelector("#users-dropdown > ul");
        this._userListButton = document.querySelector("#users-button");
        this._defaultUser = null;
        this._usersObject = null;
        this.init();
    }
    getDefaultUserName() {
        return this._defaultUser?.username ?? null;
    }
    getDefaultAccount() {
        return this._defaultUser;
    }
    setDefaultAccount() {
        const input = this._userWrapper?.querySelector("input");
        if (!input)
            return;
        if (this._defaultUser?.username != "") {
            //input.classList.add("hide")
            input.value = this._defaultUser?.username ?? "";
        }
        else {
            input.value = "";
        }
        if (this._usersObject && this._usersObject.length > 0) {
            this._userListButton?.classList.remove("hide");
        }
        if (window.sessions)
            window.sessions.updateOnStartup();
    }
    updateOnStartup() {
        if (!this._usersObject)
            return;
        const dfUser = window.localStorage.getItem("defaultUser");
        let user;
        try {
            user = JSON.parse(dfUser ?? "");
        }
        catch (e) {
            user = this._usersObject[0];
        }
        this._defaultUser = user;
        this.setDefaultAccount();
    }
    setAccountList() {
        if (!this._usersDropdown || !this._usersObject)
            return;
        this._usersDropdown.innerHTML = "";
        for (const v of this._usersObject) {
            const name = v.username;
            const li = document.createElement("li");
            const button = document.createElement("button");
            button.type = "button";
            button.innerText = name;
            button.addEventListener("click", () => {
                this.updateDefaults(v);
                this.setDefaultAccount();
                //authenticate.startAuthentication()
            });
            li.appendChild(button);
            this._usersDropdown.appendChild(li);
        }
    }
    setButton() {
        document.querySelector("#screen")?.addEventListener("click", (ev) => {
            if (ev.target == this._userListButton ||
                ev.target.parentElement == this._userListButton) {
                this._usersDropdown?.classList.toggle("hide");
            }
            else if (ev.target != this._usersDropdown &&
                ev.target.closest(".dropdown") == null) {
                this._usersDropdown?.classList.add("hide");
            }
        });
    }
    updateDefaults(user) {
        if (!user)
            return;
        this._defaultUser = user;
        window.localStorage.setItem("defaultUser", JSON.stringify(user));
    }
    init() {
        if (!window.lightdm)
            return;
        this._usersObject = window.lightdm.users;
        this.updateOnStartup();
        this.setAccountList();
        this.setButton();
    }
}
//# sourceMappingURL=accounts.js.map