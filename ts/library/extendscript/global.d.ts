// app.d.ts
type AllLayerType = Layer & AVLayer & TextLayer & ShapeLayer;

interface App {
  version: string;
  buildName: string;
  project: Project | null;
  beginUndoGroup(name: string): void;
  endUndoGroup(): void;
  executeCommand(id: number): void;
  alert(message: string): void;
  beep(): void;

  preferences: Preferences;
  scheduleTask(
    script: string,
    delay: number,
    repeat?: boolean
  ): number;
  cancelTask(taskID: number): void;
  purge(target: PurgeTarget): void;
}

interface Preferences {
  getPrefAsString(section: string, key: string): string;
  getPrefAsLong(section: string, key: string): number;
  getPrefAsBool(section: string, key: string): boolean;
  savePrefAsString(section: string, key: string, value: string): void;
  savePrefAsLong(section: string, key: string, value: number): void;
  savePrefAsBool(section: string, key: string, value: boolean): void;
}

interface Project {
  activeItem: CompItem | null;
  items: ItemCollection;
  file: File | null;
  item(index: number): CompItem;
  save(file?: File): void;
  close(saveChanges?: boolean): void;
}

interface CompItem extends AVItem {
  width: number;
  height: number;
  pixelAspect: number;
  frameRate: number;
  duration: number;
  frameDuration: number;
  displayStartTime: number;
  workAreaDuration: number;
  workAreaStart: number;
  selectedLayers: AllLayerType[];
  layers: LayerCollection;
  time: number;
  markerProperty: MarkerProperty;
  layer(index: number): AllLayerType;
  layer(name: string): AllLayerType | null;
}

declare var CompItem: {
  prototype: CompItem;
  new (...args: any[]): CompItem;
};

interface ItemCollection {
  length: number;
  [index: number]: Item;
  addComp(
    name: string,
    width: number,
    height: number,
    pixelAspect: number,
    duration: number,
    frameRate: number
  ): CompItem;
  addFolder(name: string): FolderItem;
  remove(): void;
}

interface Item {
  name: string;
  id: number;
  parentFolder: FolderItem | null;
  remove(): void;
}

interface LayerCollection {
  length: number;
  [index: number]: AllLayerType;

  add(
    item: AVItem,
    duration?: number
  ): Layer;

  addText(text?: string): TextLayer;
  addShape(): ShapeLayer;
  addSolid(
    color: [number, number, number],
    name: string,
    width: number,
    height: number,
    pixelAspect: number,
    duration: number
  ): AVLayer;

  removeAll(): void;
}

interface SourceRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface Layer {
  index: number;
  name: string;
  matchName: string;
  enabled: boolean;
  shy: boolean;
  locked: boolean;
  selected: boolean;
  solo: boolean;
  hasVideo: boolean;
  hasAudio: boolean;
  parent: AllLayerType | null;
  hasParent: boolean;
  inPoint: number;
  outPoint: number;
  startTime: number;
  stretch: number;
  label: number;
  comment: string;
  containingComp: CompItem;
  threeDLayer: boolean;
  duplicate(): AllLayerType;
  remove(): void;
  moveBefore(layer: AllLayerType): void;
  moveAfter(layer: AllLayerType): void;
  moveToBeginning(): void;
  moveToEnd(): void;
  copyToComp(comp: CompItem): void;
  sourceRectAtTime(time: number, extents: boolean): SourceRect;
  property(nameOrIndex: string | number): PropertyGroup;
}

interface AVLayer extends Layer {
  source: AVItem | null;
  audioEnabled: boolean;
  motionBlur: boolean;
  opacity: Property;
  collapseTransformation: boolean;
  timeRemapEnabled: boolean;
  marker: MarkerProperty;
  property(name: "ADBE Time Remapping"): TimeRemapProperty;
}

interface TextLayer extends AVLayer {
  property(name: `Source Text`): TextProperty;
  property(name: "ADBE Text Properties"): PropertyGroup;
}

interface ShapeLayer extends AVLayer {}

interface PropertyBase {
  name: string;
  matchName: string;
  propertyIndex: number;
  propertyDepth: number;
  parentProperty: PropertyGroup | null;
}

interface PropertyGroup extends PropertyBase {
  name: string;
  matchName: string;
  parentProperty: PropertyGroup | null;
  numProperties: number;
  canAddProperty?: boolean;
  property(indexOrName: number | string): Property & PropertyGroup;
}

interface Property extends PropertyBase {
  value: any;
  numKeys: number;
  isTimeVarying: boolean;
  expression: string;
  dimensionsSeparated: boolean;
  setValue(value: any): void;
  setValueAtTime(time: number, value: any): void;
  setValueAtKey(keyIndex: number, value: any): void;
  keyTime(keyIndex: number): number;
  keyValue(keyIndex: number): any;
  removeKey(keyIndex: number): void;
}

interface TextProperty extends Property {
  value: TextDocument;
  setValue(value: TextDocument): void;
}

interface TextDocument {
  text: string;

  // Font
  font: string;
  fontSize: number;
  underline: boolean

  // Paragraph
  justification: ParagraphJustification;
  autoLeading: boolean;
  leading: number;

  // Character spacing
  tracking: number;
  baselineShift: number;
  horizontalScale: number;
  verticalScale: number;

  // Fill
  applyFill: boolean;
  fillColor: [number, number, number];

  // Stroke
  applyStroke: boolean;
  strokeColor: [number, number, number];
  strokeWidth: number;
  strokeOverFill: boolean;

  // Faux styles
  fauxBold: boolean;
  fauxItalic: boolean;

  // All caps / small caps
  allCaps: boolean;
  smallCaps: boolean;

  // Baseline
  baselineDirection: number;

  // Misc
  lineJoin: number;
  direction: number;

  resetCharStyle(): void;
  resetParagraphStyle(): void;
  characterRange(start: number, end: number): TextDocument;
}

declare var PurgeTarget: {
  ALL_CACHES: number;
  UNDO_CACHES: number;
  IMAGE_CACHES: number;
  SNAPSHOT_CACHES: number;
};

type PurgeTarget = number;

interface AVItem extends Item {
  width: number;
  height: number;
  pixelAspect: number;
  duration: number;
  frameRate: number;
  hasVideo: boolean;
  hasAudio: boolean;
  label: number;
  time: number;
}

interface FolderItem extends Item {
  items: ItemCollection;
}

interface TimeRemapProperty extends Property {
  name: string;
  matchName: "ADBE Time Remapping";
  parentProperty: PropertyGroup | null;
  value: number;
  numKeys: number;
  isTimeVarying: boolean;
  expression?: string;
  canSetExpression?: boolean;
  setValue(value: number): void;
  setValueAtTime(time: number, value: number): void;
  valueAtTime(time: number, preExpression?: boolean): number;
  keyTime(index: number): number;
  keyValue(index: number): number;
  nearestKeyIndex(time: number): number;
  setInterpolationTypeAtKey(
    index: number,
    inType: KeyframeInterpolationType,
    outType: KeyframeInterpolationType
  ): void;
}

declare var KeyframeInterpolationType: {
  LINEAR: number;
  BEZIER: number;
  HOLD: number;
}

declare var ParagraphJustification: {
  LEFT_JUSTIFY: 7413;
  RIGHT_JUSTIFY: 7414;
  CENTER_JUSTIFY: 7415;
  FULL_JUSTIFY_LASTLINE_LEFT: 7416;
  FULL_JUSTIFY_LASTLINE_RIGHT: 7417;
  FULL_JUSTIFY_LASTLINE_CENTER: 7418;
  FULL_JUSTIFY_LASTLINE_FULL: 7419;
}

interface File {
  absoluteURI: string;
  exists: boolean;
  encoding: string;
  eof: boolean;
  error: string;
  open(mode: "r" | "w" | "e"): boolean;
  close(): boolean;
  read(): string;
  readln(): string;
  write(content: string): boolean;
  remove(): boolean;
}

declare var File: {
  new(path?: string): File;
  openDialog(prompt?: string, filter?: string): File | null;
  saveDialog(prompt?: string, filter?: string): File | null;
}

interface MarkerProperty extends Property{
  numKeys: number;
  keyValue(index: number): MarkerValue;
  keyTime(index: number): number;
  setValueAtTime(time: number, value: MarkerValue): void;
}

declare class MarkerValue extends MarkerProperty {
  constructor(comment?: string);
  comment: string;
  chapter: string;
  cuePointName: string;
  url: string;
  frameTarget: string;
  duration: number;
  clone(): MarkerValue;
}

// Make the global `app` typed
declare var app: App;

interface JSON {
  stringify(value: any): string;
}

declare var JSON: JSON;

declare var alert: (message: any) => void;

declare var confirm: (message: any) => boolean;

declare var prompt: (
  message?: any,
  defaultValue?: string
) => string | null;