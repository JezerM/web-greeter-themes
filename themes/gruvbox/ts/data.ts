const GRUVBOX_DATA = "gruvboxData";

export class Data {
  public userName: string | null;
  public background: string | null;
  public backgroundBlur: number;

  public constructor() {
    this.userName = null;
    this.background = null;
    this.backgroundBlur = 0;

    this.load();
  }

  public load(): void {
    const data = window.localStorage.getItem(GRUVBOX_DATA);
    if (!data) return;
    const object: Data | null = JSON.parse(data);

    this.userName = object?.userName ?? null;
    this.background = object?.background ?? null;
    this.backgroundBlur = Number(object?.backgroundBlur ?? 0);
  }

  public save(): void {
    const data = JSON.stringify(this);
    window.localStorage.setItem(GRUVBOX_DATA, data);
  }
}
