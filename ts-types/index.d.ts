import { LightDMBattery, LightDMLanguage, LightDMLayout, LightDMSession, LightDMUser } from "./ldm_interfaces";
/**
 * Metadata that is sent to each window to handle more interesting multi-monitor
 * functionality / themes.
 */
export interface WindowMetadata {
    id: number;
    is_primary: boolean;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    /**
     * The total real-estate across all screens,
     * this can be used to assist in, for example,
     * correctly positioning multi-monitor backgrounds.
     */
    overallBoundary: {
        minX: number;
        maxX: number;
        minY: number;
        maxY: number;
    };
}
/**
 * An event that is fired and dispatched when one browser window of a theme
 * sends a broadcast to all windows (which happens for multi-monitor setups)
 */
export declare class GreeterBroadcastEvent extends Event {
    /** Metadata for the window that originated the request */
    readonly window: WindowMetadata;
    /** Data sent in the broadcast */
    readonly data: unknown;
    constructor(
    /** Metadata for the window that originated the request */
    window: WindowMetadata, 
    /** Data sent in the broadcast */
    data: unknown);
}
/**
 * A class that exposes functionality that is unique to `nody-greeter` and not
 * present in `web-greeter`
 */
export declare class Comm {
    private _window_metadata;
    /**
     * callback that should be called when the metadata is received
     */
    private _ready;
    private readonly _ready_promise;
    constructor();
    get window_metadata(): WindowMetadata;
    /** Resolves when we have received WindowMetadata */
    whenReady: () => Promise<void>;
    /**
     * Send a message to all windows currently open for the greeter.
     *
     * This is primarily for themes that are runing in multi-monitor environments
     */
    broadcast(data: unknown): void;
}
export declare class Signal {
    protected _name: string;
    protected _callbacks: ((...args: unknown[]) => void)[];
    constructor(name: string);
    /**
     * Connects a callback to the signal.
     * @param {() => void} callback The callback to attach.
     */
    connect(callback: (...args: any[]) => void): void;
    /**
     * Disconnects a callback to the signal.
     * @param {() => void} callback The callback to disattach.
     */
    disconnect(callback: () => void): void;
    protected _emit(...args: unknown[]): void;
}
export declare class MessageSignal extends Signal {
    connect(callback: (message: string, type: LightDMMessageType) => void): void;
}
export declare class PromptSignal extends Signal {
    connect(callback: (message: string, type: LightDMPromptType) => void): void;
}
export declare class Greeter {
    constructor();
    authentication_complete: Signal;
    autologin_timer_expired: Signal;
    idle: Signal;
    reset: Signal;
    show_message: MessageSignal;
    show_prompt: PromptSignal;
    brightness_update: Signal;
    battery_update: Signal;
    /**
     * The username of the user being authenticated or "null"
     * if no authentication is in progress
     * @type {string|null}
     * @readonly
     */
    get authentication_user(): string | null;
    /**
     * Whether or not the guest account should be automatically logged
     * into when the timer expires.
     * @type {boolean}
     * @readonly
     */
    get autologin_guest(): boolean;
    /**
     * The number of seconds to wait before automatically logging in.
     * @type {number}
     * @readonly
     */
    get autologin_timeout(): number;
    /**
     * The username with which to automattically log in when the timer expires.
     * @type {string}
     * @readonly
     */
    get autologin_user(): string;
    /**
     * Gets the battery data.
     * @type {LightDMBattery}
     * @readonly
     * @deprecated Use `battery_data`
     */
    get batteryData(): LightDMBattery;
    /**
     * Gets the battery data.
     * @type {LightDMBattery}
     * @readonly
     */
    get battery_data(): LightDMBattery;
    /**
     * Gets the brightness
     */
    get brightness(): number;
    /**
     * Sets the brightness
     * @param {number} quantity The quantity to set
     */
    set brightness(quantity: number);
    /**
     * Whether or not the greeter can access to battery data.
     * @type {boolean}
     * @readonly
     */
    get can_access_battery(): boolean;
    /**
     * Whether or not the greeter can control display brightness.
     * @type {boolean}
     * @readonly
     */
    get can_access_brightness(): boolean;
    /**
     * Whether or not the greeter can make the system hibernate.
     * @type {boolean}
     * @readonly
     */
    get can_hibernate(): boolean;
    /**
     * Whether or not the greeter can make the system restart.
     * @type {boolean}
     * @readonly
     */
    get can_restart(): boolean;
    /**
     * Whether or not the greeter can make the system shutdown.
     * @type {boolean}
     * @readonly
     */
    get can_shutdown(): boolean;
    /**
     * Whether or not the greeter can make the system suspend/sleep.
     * @type {boolean}
     * @readonly
     */
    get can_suspend(): boolean;
    /**
     * The name of the default session.
     * @type {string}
     * @readonly
     */
    get default_session(): string;
    /**
     * Whether or not guest sessions are supported.
     * @type {boolean}
     * @readonly
     */
    get has_guest_account(): boolean;
    /**
     * Whether or not user accounts should be hidden.
     * @type {boolean}
     * @readonly
     */
    get hide_users_hint(): boolean;
    /**
     * The system's hostname.
     * @type {string}
     * @readonly
     */
    get hostname(): string;
    /**
     * Whether or not the greeter is in the process of authenticating.
     * @type {boolean}
     * @readonly
     */
    get in_authentication(): boolean;
    /**
     * Whether or not the greeter has successfully authenticated.
     * @type {boolean}
     * @readonly
     */
    get is_authenticated(): boolean;
    /**
     * The current language or "null" if no language.
     * @type {LightDMLanguage|null}
     * @readonly
     */
    get language(): LightDMLanguage | null;
    /**
     * A list of languages to present to the user.
     * @type {LightDMLanguage[]}
     * @readonly
     */
    get languages(): LightDMLanguage[];
    /**
     * The currently active layout for the selected user.
     * @type {LightDMLayout}
     */
    get layout(): LightDMLayout;
    set layout(layout: LightDMLayout);
    /**
     * A list of keyboard layouts to present to the user.
     * @type {LightDMLayout[]}
     * @readonly
     */
    get layouts(): LightDMLayout[];
    /**
     * Whether or not the greeter was started as a lock screen.
     * @type {boolean}
     * @readonly
     */
    get lock_hint(): boolean;
    /**
     * A list of remote sessions.
     * @type {LightDMSession[]}
     * @readonly
     */
    get remote_sessions(): LightDMSession[];
    /**
     * Whether or not the guest account should be selected by default.
     * @type {boolean}
     * @readonly
     */
    get select_guest_hint(): boolean;
    /**
     * The username to select by default.
     * @type {string|undefined}
     * @readonly
     */
    get select_user_hint(): string | undefined;
    /**
     * List of available sessions.
     * @type {LightDMSession[]}
     * @readonly
     */
    get sessions(): LightDMSession[];
    /**
     * Check if a manual login option should be shown. If "true", the theme should
     * provide a way for a username to be entered manually. Otherwise, themes that show
     * a user list may limit logins to only those users.
     * @type {boolean}
     * @readonly
     */
    get show_manual_login_hint(): boolean;
    /**
     * Check if a remote login option should be shown. If "true", the theme should provide
     * a way for a user to log into a remote desktop server.
     * @type {boolean}
     * @readonly
     * @internal
     */
    get show_remote_login_hint(): boolean;
    /**
     * List of available users.
     * @type {LightDMUser[]}
     * @readonly
     */
    get users(): LightDMUser[];
    /**
     * Starts the authentication procedure for a user.
     *
     * @param {string|null} username A username or "null" to prompt for a username.
     */
    authenticate(username: string | null): boolean;
    /**
     * Starts the authentication procedure for the guest user.
     */
    authenticate_as_guest(): boolean;
    /**
     * Set the brightness to quantity
     * @param {number} quantity The quantity to set
     * @deprecated Use `brightness_set`
     */
    brightnessSet(quantity: number): void;
    /**
     * Set the brightness to quantity
     * @param {number} quantity The quantity to set
     */
    brightness_set(quantity: number): void;
    /**
     * Increase the brightness by quantity
     * @param {number} quantity The quantity to increase
     * @deprecated Use `brightness_increase`
     */
    brightnessIncrease(quantity: number): void;
    /**
     * Increase the brightness by quantity
     * @param {number} quantity The quantity to increase
     */
    brightness_increase(quantity: number): void;
    /**
     * Decrease the brightness by quantity
     * @param {number} quantity The quantity to decrease
     * @deprecated Use `brightness_decrease`
     */
    brightnessDecrease(quantity: number): void;
    /**
     * Decrease the brightness by quantity
     * @param {number} quantity The quantity to decrease
     */
    brightness_decrease(quantity: number): void;
    /**
     * Cancel user authentication that is currently in progress.
     */
    cancel_authentication(): boolean;
    /**
     * Cancel the automatic login.
     */
    cancel_autologin(): boolean;
    /**
     * Triggers the system to hibernate.
     * @returns {boolean} "true" if hibernation initiated, otherwise "false"
     */
    hibernate(): boolean;
    /**
     * Provide a response to a prompt.
     * @param {string} response
     */
    respond(response: string): boolean;
    /**
     * Triggers the system to restart.
     * @returns {boolean} "true" if restart initiated, otherwise "false"
     */
    restart(): boolean;
    /**
     * Set the language for the currently authenticated user.
     * @param {string} language The language in the form of a locale specification (e.g.
     *     'de_DE.UTF-8')
     * @returns {boolean} "true" if successful, otherwise "false"
     */
    set_language(language: string): boolean;
    /**
     * Triggers the system to shutdown.
     * @returns {boolean} "true" if shutdown initiated, otherwise "false"
     */
    shutdown(): boolean;
    /**
     * Start a session for the authenticated user.
     * @param {string|null} session The session to log into or "null" to use the default.
     * @returns {boolean} "true" if successful, otherwise "false"
     */
    start_session(session: string | null): boolean;
    /**
     * Triggers the system to suspend/sleep.
     * @returns {boolean} "true" if suspend/sleep initiated, otherwise "false"
     */
    suspend(): boolean;
}
interface gc_branding {
    /**
     * Path to directory that contains background images
     */
    background_images_dir: string;
    /**
     * Path to distro logo image for use in greeter themes
     */
    logo: string;
    /**
     * Default user image/avatar.
     */
    user_image: string;
}
interface gc_greeter {
    /**
     * Greeter theme debug mode
     */
    debug_mode: boolean;
    /**
     * Provide an option to load a fallback theme when theme errors are detected
     */
    detect_theme_errors: boolean;
    /**
     * Blank the screen after this many seconds of inactivity
     */
    screensaver_timeout: number;
    /**
     * Don't allow themes to make remote http requests
     */
    secure_mode: boolean;
    /**
     * Language to use when displaying the time or "" to use the system's language
     */
    time_language: string;
    /**
     * The name of the theme to be used by the greeter
     */
    theme: string;
}
interface gc_features {
    /**
     * Enable greeter and themes to get battery status
     */
    battery: boolean;
    /**
     * Backlight options
     */
    backlight: {
        /**
         * Enable greeter and themes to control display backlight
         */
        enabled: boolean;
        /**
         * The amount to increase/decrease brightness by greeter
         */
        value: number;
        /**
         * How many steps are needed to do the change
         */
        steps: number;
    };
}
export declare class GreeterConfig {
    constructor();
    /**
     * Holds keys/values from the `branding` section of the config file.
     *
     * @type {object} branding
     * @property {string} background_images_dir Path to directory that contains background images for use in greeter themes.
     * @property {string} logo Path to distro logo image for use in greeter themes.
     * @property {string} user_image Default user image/avatar. This is used by greeter themes for users that have not configured a `.face` image.
     * @readonly
     */
    get branding(): gc_branding;
    /**
     * Holds keys/values from the `greeter` section of the config file.
     *
     * @type {object}  greeter
     * @property {boolean} debug_mode Greeter theme debug mode.
     * @property {boolean} detect_theme_errors Provide an option to load a fallback theme when theme errors are detected.
     * @property {number}  screensaver_timeout Blank the screen after this many seconds of inactivity.
     * @property {boolean} secure_mode Don't allow themes to make remote http requests.
     * @property {string}  time_language Language to use when displaying the time or "" to use the system's language.
     * @property {string}  theme The name of the theme to be used by the greeter.
     * @readonly
     */
    get greeter(): gc_greeter;
    /**
     * Holds keys/values from the `features` section of the config file.
     *
     * @type {Object}      features
     * @property {boolean} battery Enable greeter and themes to get battery status.
     * @property {Object}  backlight
     * @property {boolean} backlight.enabled Enable greeter and themes to control display backlight.
     * @property {number}  backlight.value The amount to increase/decrease brightness by greeter.
     * @property {number}  backlight.steps How many steps are needed to do the change.
     * @readonly
     */
    get features(): gc_features;
    get layouts(): LightDMLayout[];
}
export declare class ThemeUtils {
    constructor();
    /**
     * Binds `this` to class, `context`, for all of the class's methods.
     *
     * @arg {object} context An ES6 class instance with at least one method.
     *
     * @return {object} `context` with `this` bound to it for all of its methods.
     * @deprecated This method has no usage and will be removed on future versions
     */
    bind_this(context: object): object;
    /**
     * Returns the contents of directory found at `path` provided that the (normalized) `path`
     * meets at least one of the following conditions:
     *   * Is located within the greeter themes' root directory.
     *   * Has been explicitly allowed in the greeter's config file.
     *   * Is located within the greeter's shared data directory (`/var/lib/lightdm-data`).
     *   * Is located in `/tmp`.
     *
     * @param path        The abs path to desired directory.
     * @param only_images Include only images in the results. Default `true`.
     * @param callback    Callback function to be called with the result.
     */
    dirlist(path: string, only_images: boolean | undefined, callback: (args: string[]) => void): void;
    /**
     * Returns the contents of directory found at `path` provided that the (normalized) `path`
     * meets at least one of the following conditions:
     *   * Is located within the greeter themes' root directory.
     *   * Has been explicitly allowed in the greeter's config file.
     *   * Is located within the greeter's shared data directory (`/var/lib/lightdm-data`).
     *   * Is located in `/tmp`.
     *
     * @param path        The abs path to desired directory.
     * @param only_images Include only images in the results. Default `true`.
     * @param callback    Callback function to be called with the result.
     * @experimental Available only for nody-greeter. DO NOT use it if you want compatibility between web-greeter and nody-greeter
     */
    dirlist_sync(path: string, only_images?: boolean): string[];
    /**
     * Get the current date in a localized format. Local language is autodetected by default, but can be set manually in the greeter config file.
     */
    get_current_localized_date(): string;
    /**
     * Get the current time in a localized format. Local language is autodetected by default, but can be set manually in the greeter config file.
     */
    get_current_localized_time(): string;
}
export declare const greeter_comm: Comm;
export declare const lightdm: Greeter;
export declare const greeter_config: GreeterConfig;
export declare const theme_utils: ThemeUtils;
export declare const _ready_event: Event;
declare global {
    interface Window {
        greeter_comm: Comm | undefined;
        lightdm: Greeter | undefined;
        greeter_config: GreeterConfig | undefined;
        theme_utils: ThemeUtils | undefined;
        _ready_event: Event | undefined;
        addEventListener(type: "GreeterBroadcastEvent", listener: (ev: GreeterBroadcastEvent) => void, options?: boolean | AddEventListenerOptions | undefined): void;
        addEventListener(type: "GreeterReady", listener: (ev: Event) => void, options?: boolean | AddEventListenerOptions | undefined): void;
    }
}
declare enum LightDMPromptType {
  /**
   * The prompt is a question, typically used to prompt for the username.
   */
  Question = 0,
  /**
   * The prompt is for secret information, typically used to prompt for the password.
   */
  Secret = 1,
}

declare enum LightDMMessageType {
  /**
   * An informational message
   */
  Info = 0,
  /**
   * An error message
   */
  Error = 1,
}
export {
  LightDMUser, LightDMLayout, LightDMBattery, LightDMSession, LightDMLanguage, LightDMPromptType, LightDMMessageType
};
