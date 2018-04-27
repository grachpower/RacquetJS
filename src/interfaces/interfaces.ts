export interface HasTemplate {
    createTemplate(): string;
}

export interface HasHandlers {
    setHandlers(): void;
}

export interface AfterViewInit {
    afterViewInit(): void;
}
