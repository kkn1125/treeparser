declare interface String {
  badge(classNames: string | string[]): string | String;
}

declare interface Console {
  test: (...args) => void;
  mark: (...args) => void;
}

declare type Branch = {
  only: string;
  brother?: string;
  child?: string;
};

declare type Emoji = null | {
  folder: string;
  file: string;
};

declare type Style = {
  directory: string | string[];
  offset: number;
  fontSize: number;
};

declare type Branches = {
  first: Branch;
  second: Branch;
  third: string;
  vertical: string;
};

declare interface InitialOption {
  app: string;
  branches: Branches;
  emoji: Emoji;
  style: Style;
  indent: number;
  [x: string]: any;
  // [key: any]: any;
}

declare type InitialOptionKeys = any;

declare interface ViewEntity {
  initialOptions: (options: InitialOption) => void;
  init: (option: InitialOption) => void;
  renderTree: (convertedArray: CountIndences[]) => string | undefined;
}

declare type CountIndences = {
  lineId: number;
  numberOfIndences: number;
  directoryName: string;
  vertical?: number[];
  first?: string;
  second?: string;
  third?: string;
};

declare interface ModelEntity {
  init: (view: ViewEntity) => void;
  renderParsedTree(contents: string): void;
  renderTree: () => string | undefined;
  parse: (source: string) => ModelEntity;
  getParsedLines: () => object[];
  stringToArray: (source: string) => string[];
  parseLines: (lines: string[]) => CountIndences[];
  separateLine: (trimSources: string) => string[];
  filterEmptyLine: (splitedLines: string[]) => string[];
  countIndences: (lines: string[]) => CountIndences[];
  addThirdBranch: (indenceCountedArray: CountIndences[]) => CountIndences[];
  addSecondBranch: (addedThirdBranchArray: CountIndences[]) => CountIndences[];
  addFirstBranch: (addedThirdBranchArray: CountIndences[]) => CountIndences[];
}

declare interface ControllerEntity {
  init: (mode: ModelEntity) => void;
  handleInput: (e: Event) => void;
  clipboardCopy: (e: Event) => void;
  handleTypeChange: (e: Event) => void;
  handleNameOffset: (e: Event) => void;
  handleFontSize: (e: Event) => void;
  handleEmoji: (e: Event) => void;
}

declare module "*.css";
declare module "*.scss";
