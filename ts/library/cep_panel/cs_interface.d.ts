declare class CSInterface {
  evalScript(script: string, callback?: (result: string) => void): void;
}

declare var themeManager: {
  init(): void;
}

type MainProps = {
  cs: CSInterface;
};