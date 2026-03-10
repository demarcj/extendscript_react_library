# Adobe CEP React Panel Framework

This project is a React-based Adobe CEP panel extension framework for building panels that talk to ExtendScript host code. It is based on my ExtendScript library, but this version uses React.js for the panel UI and Node-based tooling for the build process.

If you want the non-React version, or prefer a simpler ExtendScript-focused setup, see the original library:

<https://github.com/demarcj/extendscript_library>

## Overview

This framework targets Adobe CEP panel development with:

- A React frontend rendered into the CEP panel
- TypeScript source for both the panel and host script
- ExtendScript output for Adobe host applications
- A small utility library under `ts/library/extendscript`
- esbuild-based bundling for the panel and host script

The current manifest is configured for Adobe After Effects by default, but the extension can be adapted to other CEP-compatible Adobe applications by editing `CSXS/manifest.xml`.

## Features

- React.js panel UI
- TypeScript for panel and host-side source files
- ExtendScript host script output in `jsx/hostscript.jsx`
- Adobe `CSInterface` integration for panel-to-host communication
- Theme support through `js/themeManager.js`
- Separate build steps for the panel bundle and host script bundle

## Installation

1. Clone or copy this folder into your CEP extensions directory.

   Windows:
   `C:\Users\[YourUsername]\AppData\Roaming\Adobe\CEP\extensions\`

   macOS:
   `~/Library/Application Support/Adobe/CEP/extensions/`

2. Enable CEP debug mode so unsigned extensions can load.

   Windows:
   `C:\Users\[YourUsername]\AppData\Roaming\Adobe\CEP\`

   macOS:
   `~/Library/Application Support/Adobe/CEP/`

   Add or edit a file so it contains:

   ```text
   PlayerDebugMode=1
   ```

3. Make sure the extension folder name matches the bundle ID used by the manifest.

4. Restart the Adobe host application.

## Development

### Prerequisites

- Node.js
- npm
- A CEP-compatible Adobe application

### Setup

```bash
npm install
npm run build
```

### Build Scripts

The project currently exposes these scripts:

- `npm run build` builds both the ExtendScript host file and the React panel bundle
- `npm run build_host` builds only `jsx/hostscript.jsx`
- `npm run build_main` builds only `js/main.js`

`build_hostscript.js` bundles `ts/hostscript.ts` to `jsx/hostscript.jsx`.

`build_main.js` bundles `tsx/app.tsx` to `js/main.js`.

## Project Structure

```text
com.react.framework.panel/
|-- CSXS/
|   `-- manifest.xml
|-- css/
|   |-- boilerplate.css
|   |-- styles.css
|   `-- topcoat-desktop-dark.min.css
|-- icons/
|-- js/
|   |-- libs/
|   |   `-- CSInterface.js
|   |-- main.js
|   |-- main.js.map
|   `-- themeManager.js
|-- jsx/
|   `-- hostscript.jsx
|-- ts/
|   |-- hostscript.ts
|   `-- library/
|       |-- cep_panel/
|       `-- extendscript/
|-- tsx/
|   |-- app.tsx
|   `-- main.tsx
|-- build.js
|-- build_hostscript.js
|-- build_main.js
|-- index.html
|-- package.json
`-- README.md
```

## Frontend

The panel UI is built with React, not jQuery.

- `index.html` provides the CEP panel shell and the `#root` mount node
- `tsx/app.tsx` creates the React root and initializes the panel
- `tsx/main.tsx` contains the main React component
- `js/libs/CSInterface.js` provides the Adobe CEP API bridge

The current panel uses `CSInterface` directly from React code:

```ts
const cs = new CSInterface();
cs.evalScript("sayHello()");
```

## Host Script

`ts/hostscript.ts` contains the host-side ExtendScript source. It is bundled into:

```text
jsx/hostscript.jsx
```

That file is what the Adobe host application executes through CEP.

## Extending the Panel

1. Update the React UI in `tsx/main.tsx`.
2. Initialize app-level behavior in `tsx/app.tsx`.
3. Add or change ExtendScript functions in `ts/hostscript.ts`.
4. Call those functions from the panel with `cs.evalScript(...)`.
5. Run `npm run build`.

## Supported Adobe Applications

Edit `CSXS/manifest.xml` to change the host applications supported by the extension. The current setup is aimed at After Effects, but CEP hosts like Photoshop, Illustrator, InDesign, and Premiere Pro can be enabled by adjusting the manifest entries.

## Dependencies

- React
- React DOM
- TypeScript
- esbuild
- Babel
- Adobe CSInterface
- Topcoat CSS

## Notes

- This repository is the React-based companion to the original ExtendScript library
- The original non-React library is here: <https://github.com/demarcj/extendscript_library>
- `js/libs/jquery-2.0.2.min.js` may still exist in older builds or legacy files, but the current panel architecture does not use jQuery
- Panel size, icons, and host targeting are configured in `CSXS/manifest.xml`

## Troubleshooting

- If the extension does not appear, confirm debug mode is enabled and the folder is in the CEP extensions directory
- If the panel loads but React does not render, check the CEP dev tools console for script errors
- If `evalScript` calls fail, verify the host app target in `CSXS/manifest.xml` and confirm `jsx/hostscript.jsx` was rebuilt

## License

ISC
