// TODO: Remove this eslint-disable comment
/* eslint-disable @typescript-eslint/naming-convention */
class LightDMLanguage {
    constructor(code, name, territory) {
        this.code = code;
        this.name = name;
        this.territory = territory;
    }
}
class LightDMLayout {
    constructor(name, description, short_description) {
        this.name = name;
        this.description = description;
        this.short_description = short_description;
    }
}
class LightDMUser {
    constructor(username, display_name, image, session) {
        this.background = "";
        this.language = "";
        this.layout = "";
        this.layouts = [];
        this.logged_in = false;
        this.username = username;
        this.display_name = display_name;
        this.image = image;
        this.home_directory = "/home/" + username + "/";
        this.session = session ?? "";
    }
}
class LightDMSession {
    constructor(key, name, comment, type) {
        this.key = key;
        this.name = name;
        this.comment = comment ?? "";
        this.type = type ?? "X";
    }
}
function signalToSignal(signal) {
    return signal;
}
class Signal {
    constructor(name) {
        this._callbacks = [];
        this._name = name;
    }
    // eslint-disable-next-line
    connect(callback) {
        if (typeof callback !== "function")
            return;
        this._callbacks.push(callback);
    }
    disconnect(callback) {
        const ind = this._callbacks.findIndex((cb) => {
            return cb === callback;
        });
        if (ind == -1)
            return;
        this._callbacks.splice(ind, 1);
    }
    _emit(...args) {
        this._callbacks.forEach((cb) => {
            if (typeof cb !== "function")
                return;
            cb(...args);
        });
    }
}
const battery = {
    name: "BAT0",
    level: 85,
    status: "Discharging",
    ac_status: false,
    time: "00:00",
    capacity: 100,
    watt: 0,
};
function mock(instance) {
    return instance;
}
class Greeter {
    constructor() {
        this.mock_password = "pes";
        this.authentication_complete = mock(new Signal("authentication_complete"));
        this.autologin_timer_expired = mock(new Signal("autologin_timer_expired"));
        this.idle = mock(new Signal("idle"));
        this.reset = mock(new Signal("reset"));
        this.show_message = mock(new Signal("show_message"));
        this.show_prompt = mock(new Signal("show_prompt"));
        this.brightness_update = mock(new Signal("show_message"));
        this.battery_update = mock(new Signal("battery_update"));
        this.authentication_user = null;
        this.autologin_guest = false;
        this.autologin_timeout = 0;
        this.autologin_user = "";
        this.batteryData = battery;
        this.battery_data = battery;
        this._brightness = 50;
        this.can_access_battery = true;
        this.can_access_brightness = true;
        this.can_hibernate = true;
        this.can_restart = true;
        this.can_shutdown = true;
        this.can_suspend = true;
        this.default_session = "awesome";
        this.has_guest_account = false;
        this.hide_users_hint = false;
        this.hostname = "mock-PC";
        this.in_authentication = false;
        this.is_authenticated = false;
        this.language = null;
        this.languages = [
            new LightDMLanguage("en_US.utf8", "English", "USA"),
            new LightDMLanguage("ca_ES.utf8", "Catalan", "Spain"),
            new LightDMLanguage("fr_FR.utf8", "French", "France"),
            new LightDMLanguage("es_NI.utf8", "Spanish", "Nicaragua"),
        ];
        this.layout = new LightDMLayout("us", "English (US)", "en");
        this.layouts = [
            new LightDMLayout("us", "English (US)", "en"),
            new LightDMLayout("latam", "Español (Latinoamericano)", "es"),
            new LightDMLayout("at", "German (Austria)", "de"),
            new LightDMLayout("us rus", "Russian (US, phonetic)", "ru"),
        ];
        this.lock_hint = false;
        this.remote_sessions = [];
        this.select_guest_hint = false;
        this.select_user_hint = "";
        this.sessions = [
            new LightDMSession("awesome", "Awesome wm", "Highly configurable framework window manager"),
            new LightDMSession("ubuntu", "Ubuntu", "This session starts Ubuntu"),
            new LightDMSession("ubuntu-wayland", "Ubuntu (on Wayland)", "This session starts Ubuntu on Wayland", "wayland"),
            new LightDMSession("plasma", "Plasma (X11)", "Plasma, by KDE"),
            new LightDMSession("mate", "MATE", "This session logs you into MATE"),
            new LightDMSession("cinnamon", "Cinnamon", "This session logs you into Cinnamon"),
            new LightDMSession("openbox", "Openbox", "This session logs you into Openbox"),
        ];
        this.show_manual_login_hint = true;
        this.show_remote_login_hint = false;
        this.users = [
            new LightDMUser("Arsène", "Miyuki Shirogane", "./assets/users/Arsene.jpg", "awesome"),
            new LightDMUser("IcePrincess", "Kaguya Shinomiya", "./assets/users/Ice princess.jpg", "plasma"),
            new LightDMUser("espaiar", "Easper", "", "cinnamon"),
        ];
    }
    get brightness() {
        return this._brightness;
    }
    set brightness(quantity) {
        if (quantity < 0)
            quantity = 0;
        else if (quantity > 100)
            quantity = 100;
        this._brightness = quantity;
        signalToSignal(this.brightness_update)._emit();
    }
    authenticate(username) {
        this.authentication_user = username;
        this.in_authentication = true;
        if (username == null) {
            signalToSignal(this.show_prompt)._emit("login:", 0);
        }
        return true;
    }
    authenticate_as_guest() {
        return false;
    }
    brightnessSet(quantity) {
        this.brightness = quantity;
    }
    brightnessIncrease(quantity) {
        this.brightness += quantity;
    }
    brightnessDecrease(quantity) {
        this.brightness -= quantity;
    }
    brightness_set(quantity) {
        this.brightness = quantity;
    }
    brightness_increase(quantity) {
        this.brightness += quantity;
    }
    brightness_decrease(quantity) {
        this.brightness -= quantity;
    }
    cancel_authentication() {
        this.authentication_user = null;
        this.in_authentication = false;
        return true;
    }
    cancel_autologin() {
        return true;
    }
    hibernate() {
        setTimeout(() => location.reload(), 2000);
        return true;
    }
    restart() {
        setTimeout(() => location.reload(), 2000);
        return true;
    }
    shutdown() {
        setTimeout(() => location.reload(), 2000);
        return true;
    }
    suspend() {
        setTimeout(() => location.reload(), 2000);
        return true;
    }
    respond(response) {
        if (!this.in_authentication)
            return false;
        if (this.authentication_user == null) {
            this.authentication_user = response;
            signalToSignal(this.show_prompt)._emit("Password: ", 1);
        }
        else {
            if (response === this.mock_password) {
                this.is_authenticated = true;
                this.in_authentication = false;
                signalToSignal(this.authentication_complete)._emit();
            }
            else {
                setTimeout(() => {
                    this.is_authenticated = false;
                    signalToSignal(this.authentication_complete)._emit();
                    signalToSignal(this.show_prompt)._emit("Password: ", 1);
                }, 3000);
            }
        }
        return true;
    }
    set_language(language) {
        if (this.is_authenticated) {
            this.language =
                this.languages.find((v) => {
                    return v.code == language;
                }) ?? null;
            return this.language != null;
        }
        return false;
    }
    start_session(session) {
        console.log("Session:", session ?? this.default_session);
        setTimeout(() => location.reload(), 100);
        return true;
    }
}
class GreeterConfig {
    constructor() {
        this.branding = {
            background_images_dir: "/usr/share/backgrounds",
            logo: "/usr/share/web-greeter/themes/default/img/antergos-logo-user.png",
            user_image: "/usr/share/web-greeter/themes/default/img/antergos.png",
        };
        this.greeter = {
            debug_mode: true,
            detect_theme_errors: true,
            screensaver_timeout: 300,
            secure_mode: true,
            time_language: "",
            theme: "none",
        };
        this.layouts = [
            new LightDMLayout("us", "English (US)", "en"),
            new LightDMLayout("latam", "Español (Latinoamericano)", "es"),
            new LightDMLayout("at", "German (Austria)", "de"),
            new LightDMLayout("us rus", "Russian (US, phonetic)", "ru"),
        ];
        this.features = {
            battery: true,
            backlight: {
                enabled: true,
                value: 10,
                steps: 0,
            },
        };
    }
}
let timeLanguage = "";
class ThemeUtils {
    // eslint-disable-next-line
    bind_this(context) {
        const excludedMethods = ["constructor"];
        function notExcluded(_method, _context) {
            const isExcluded = excludedMethods.findIndex((excludedMethod) => _method === excludedMethod) > -1, isMethod = "function" === typeof _context[_method];
            return isMethod && !isExcluded;
        }
        for (let obj = context; obj; obj = Object.getPrototypeOf(obj)) {
            // Stop once we have traveled all the way up the inheritance chain
            if ("Object" === obj.constructor.name) {
                break;
            }
            for (const method of Object.getOwnPropertyNames(obj)) {
                if (notExcluded(method, context)) {
                    context[method] = context[method].bind(context);
                }
            }
        }
        return context;
    }
    dirlist(path, _only_images = true, // eslint-disable-line
    callback) {
        if ("" === path || "string" !== typeof path) {
            console.error(`theme_utils.dirlist(): path must be a non-empty string!`);
            return callback([]);
        }
        if (null !== path.match(/\/\.+(?=\/)/)) {
            // No special directory names allowed (eg ../../)
            path = path.replace(/\/\.+(?=\/)/g, "");
        }
        try {
            // Should be changed here
            return callback([]);
        }
        catch (err) {
            console.error(`theme_utils.dirlist(): ${err}`);
            return callback([]);
        }
    }
    // eslint-disable-next-line
    dirlist_sync(_path, _images_only = true) {
        return [];
    }
    get_current_localized_date() {
        const config = window.greeter_config?.greeter;
        const locale = [];
        if (timeLanguage === null) {
            timeLanguage = config?.time_language || "";
        }
        if (timeLanguage != "") {
            locale.push(timeLanguage);
        }
        const optionsDate = {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
        };
        const fmtDate = Intl.DateTimeFormat(locale, optionsDate);
        return fmtDate.format(new Date());
    }
    get_current_localized_time() {
        const config = window.greeter_config?.greeter;
        const locale = [];
        if (timeLanguage === null) {
            timeLanguage = config?.time_language || "";
        }
        if (timeLanguage != "") {
            locale.push(timeLanguage);
        }
        const optionsTime = {
            hour: "2-digit",
            minute: "2-digit",
        };
        const fmtDate = Intl.DateTimeFormat(locale, optionsTime);
        return fmtDate.format(new Date());
    }
}
if (window._ready_event == undefined) {
    console.warn("Running with mock.js. LightDM is not accessible.");
    window.lightdm = new Greeter();
    window.greeter_config = new GreeterConfig();
    window.theme_utils = new ThemeUtils();
    window._ready_event = new Event("GreeterReady");
    window.lightdm.show_prompt.connect((message, type) => {
        console.log({ message, type });
    });
    window.addEventListener("DOMContentLoaded", () => {
        setTimeout(() => {
            if (window._ready_event)
                window.dispatchEvent(window._ready_event);
        }, 2);
    });
}
export {};
//# sourceMappingURL=mock.js.map