export class Power {
  private _shutdownButton: HTMLButtonElement | null;
  private _restartButton: HTMLButtonElement | null;
  private _suspendButton: HTMLButtonElement | null;
  private _hibernateButton: HTMLButtonElement | null;
  private _cover: HTMLDivElement | null;
  private _coverMsg: HTMLDivElement | null;

  public constructor() {
    this._shutdownButton = document.querySelector("#shutdown-btn");
    this._restartButton = document.querySelector("#restart-btn");
    this._suspendButton = document.querySelector("#suspend-btn");
    this._hibernateButton = document.querySelector("#hibernate-btn");
    this._cover = document.querySelector("#cover");
    this._coverMsg = document.querySelector("#cover > #message");
    this.init();
  }

  public showMessage(text: string): void {
    if (!this._coverMsg || !this._cover) return;
    this._coverMsg.innerHTML = text;
    this._cover.classList.remove("hide");
    window.wait(500).then(() => {
      this._cover?.focus();
    });
  }

  public async doShutdown(): Promise<void> {
    this.showMessage("Shutting down");
    await window.wait(1000);
    window.lightdm?.shutdown();
  }
  public async doRestart(): Promise<void> {
    this.showMessage("Restarting");
    await window.wait(1000);
    window.lightdm?.restart();
  }
  public async doHibernate(): Promise<void> {
    this.showMessage("Hibernating");
    await window.wait(1000);
    window.lightdm?.hibernate();
  }
  public async doSuspend(): Promise<void> {
    this.showMessage("Suspending");
    await window.wait(1000);
    window.lightdm?.suspend();
  }

  public setShutdown(): void {
    if (!window.lightdm?.can_shutdown || !this._shutdownButton) return;
    this._shutdownButton.addEventListener("click", () => {
      this.doShutdown();
    });
    this._shutdownButton.classList.remove("hide");
  }
  public setRestart(): void {
    if (!window.lightdm?.can_restart || !this._restartButton) return;
    this._restartButton.addEventListener("click", () => {
      this.doRestart();
    });
    this._restartButton.classList.remove("hide");
  }
  public setHibernate(): void {
    if (!window.lightdm?.can_hibernate || !this._hibernateButton) return;
    this._hibernateButton.addEventListener("click", () => {
      this.doHibernate();
    });
    this._hibernateButton.classList.remove("hide");
  }
  public setSuspend(): void {
    if (!window.lightdm?.can_suspend || !this._suspendButton) return;
    this._suspendButton.addEventListener("click", () => {
      this.doSuspend();
    });
    this._suspendButton.classList.remove("hide");
  }
  public setCover(): void {
    if (!this._cover) return;
    this._cover.addEventListener("click", () => {
      this._cover?.classList.add("hide");
    });
    this._cover.addEventListener("keydown", () => {
      this._cover?.classList.add("hide");
    });
  }

  public setButtons(): void {
    this.setShutdown();
    this.setRestart();
    this.setHibernate();
    this.setSuspend();
    this.setCover();
  }

  public init(): void {
    this.setButtons();
  }
}
