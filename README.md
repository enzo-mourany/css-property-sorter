<p align="center">
 <img width="100px" height="100px" src="https://raw.githubusercontent.com/enzo-mourany/css-property-sorter/main/images/icon.png" align="center" alt="Icon" />
 <h2 align="center">CSS Property Sorter</h2>
</p>


<div align="center">
  
[![release][release-shield]][release-url]
[![vscode][vscode-shield]][vscode-url]
[![downloads][downloads-shield]][downloads-url]
[![rating][rating-shield]][rating-url]

</div>


<!-- ABOUT THE EXTENSION -->
## About The Extension

This extension allows you to sort the **CSS properties** of each selector in a **CSS** or **SCSS** file. It makes the code more readable and facilitates maintenance.

There is an ordering standard for css properties that is not well respected. This extension allows you to automatically order all these properties.

### Built With

* [![TypeScript][TypeScript]][TypeScript-url]
* [![VSCodeAPI][VSCodeAPI]][VSCodeAPI-url]

### Compatibility

* [![CSS][CSS]][CSS-url]
* [![SCSS][SCSS]][SCSS-url]  

## Installation

1. Open the extensions panel in VSCode
2. Search for `CSS Property Sorter`
3. Click `Install`

## Usage

1. Open a **CSS** or **SCSS** file
2. Click on the `CSS Sort` button in the status bar

<img width="60%" src="https://raw.githubusercontent.com/enzo-mourany/css-property-sorter/main/images/statusbar-button.png" align="center" alt="Status Bar Button" />

or tap `Ctrl+Shift+P` and type `CSS Sort`

<img width="60%" src="https://raw.githubusercontent.com/enzo-mourany/css-property-sorter/main/images/command.png" align="center" alt="Command Palette" />

1. Click on `run` in the notification that appears

<img width="60%" src="https://raw.githubusercontent.com/enzo-mourany/css-property-sorter/main/images/notification.png" align="center" alt="Notification Run Button" />

4. The properties are now sorted !

<img width="30%" src="https://raw.githubusercontent.com/enzo-mourany/css-property-sorter/main/images/selector-before-sort.png" align="center" alt="Selector Before Sort" />

<img width="30%" src="https://raw.githubusercontent.com/enzo-mourany/css-property-sorter/main/images/selector-after-sort.png" align="center" alt="Selector After Sort" />


## Configuration

The extension uses the following sorting standard :

- flexbox properties
- grid properties
- positionning properties
- visibility properties
- cliping properties
- box properties
- animation properties
- background properties
- border properties
- typography properties
   

<!-- ROADMAP -->
## Roadmap

- [x] Sort the properties of the selectors in the order in which they appear in the file
- [x] Support for **SCSS** files
- [x] Save indentation of the properties
- [x] Support at-rules (media queries, keyframes, etc.)
- [ ] Add a configuration panel to allow the user to choose the order of the properties (JSON file)
- [ ] Sort selectors in the order (CSS file)
- [ ] Save comments before properties
- [ ] Support LESS files
- [ ] Support SASS files  
- [ ] Better shortcut for the command
- [ ] Alert the user if he writes a property incorrectly or if he puts information (or mesure unity) that does not match inside the property
- [ ] Remove malformed CSS comments that interfere with the rest of the code



See the [open issues](https://github.com/enzo-mourany/css-property-sorter/issues) for a full list of proposed features (and known issues).


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Install the dependencies `npm i` or `pnpm i`
3. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
4. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the Branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request


<!-- LICENSE -->
## License

[MIT License](https://choosealicense.com/licenses/mit/)


<!-- CONTACT -->
## Contact

[Enzo Mourany](https://github.com/enzo-mourany)

[Project Link](https://github.com/enzo-mourany/css-property-sorter)


## Show your support

Give a ⭐️ if this project helped you!



[release-shield]: https://img.shields.io/github/release/enzo-mourany/css-property-sorter.svg?style=for-the-badge&logo=github&logoColor=white&colorA=2b303b&colorB=00e8c6
[release-url]: https://github.com/EliverLara/Andromeda/releases/latest

[vscode-shield]: https://img.shields.io/badge/VS_Code-v1.74+-373277.svg?style=for-the-badge&logo=microsoft&logoColor=white&colorA=2b303b&colorB=7cb7ff
[vscode-url]: https://code.visualstudio.com/updates/v1_74 

[downloads-shield]: https://img.shields.io/visual-studio-marketplace/d/EnzoMourany.css-property-sorter?style=for-the-badge&logo=docusign&logoColor=white&colorA=2b303b&colorB=96E072
[downloads-url]: https://marketplace.visualstudio.com/items?itemName=EnzoMourany.css-property-sorter

[rating-shield]: https://img.shields.io/visual-studio-marketplace/stars/EnzoMourany.css-property-sorter?style=for-the-badge&logo=reverbnation&logoColor=white&colorA=2b303b&colorB=FFE66D
[rating-url]: https://marketplace.visualstudio.com/items?itemName=EnzoMourany.css-property-sorter


[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[VSCodeAPI]: https://img.shields.io/badge/VSCodeAPI-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white
[VSCodeAPI-url]: https://code.visualstudio.com/api

[VSCode]: https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white
[VSCode-url]: https://code.visualstudio.com/
[CSS]: https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white
[CSS-url]: https://developer.mozilla.org/fr/docs/Web/CSS
[SCSS]: https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white
[SCSS-url]: https://sass-lang.com/
