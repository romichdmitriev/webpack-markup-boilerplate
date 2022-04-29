# 🚀 Html Webpack Boilerplate

## ⚙️ Features
- Webpack 5
- Pug
- Babel
- PostCSS
- ESlint
- Stylelint
- Prettier
- devServer
- Github Actions for linting after pushing

## 🏁 Quick start
``` bash
# Usage with npx
npx webpack-markup-boilerplate [project-name]
```

or

``` bash
# Download repository:
git clone https://github.com/romichdmitriev/webpack-markup-boilerplate

# Go to the app:
cd webpack-markup-boilerplate

# install dependencies with npm or yarn:
npm i
yarn
```

## Available scripts
| npm              | yarn                | actions               |
|------------------|---------------------|-----------------------|
| `npm run start`  | `yarn run start`    | development mode      |
| `npm run build`  | `yarn run build`    | production mode          |
| `npm run lint:fix` | `yarn run lint:fix` | fix file with linters |

## File structure
```
├── dist                   # Compiled files (alternatively `dist`)
├── src                    # Source files (alternatively `lib` or `app`)
  ├── assets               
    ├── fonts              # project's fonts 
    ├── img                # project's images 
    ├── icons              # project's icons 
    ├── files              # project's files .pdf, .txt and etc. 
  ├── components           # used for .pug 
    ├── blocks
    ├── elements
  ├── pages                # use for pages of website and compile it from src/components
  ├── js                   # use for js files
  ├── styles
    ├── base               # use for base files of css 
    main.scss              # here you can import all scss files, like index.scss
```

## Addition information
1. Pug **include** directive:

  simple-pug-loader has option root, which I set to 'src', so now you can write relative paths like this:
  ```HTML
  doctype html
    html(lang='en')
    head
      meta(charset='utf-8')
      meta(name='viewport', content='width=device-width,  initial-scale=1')
      title Game Landing Page
    body
     include /components/blocks/_header.pug
     include /components/blocks/_main.pug
  ```
2. Including **.svg** in **.pug**:  
  use include directive for this:
  ```HTML
  span.icon
    include /assets/icon/twitter.svg
  ```
  
3. Relative path to icons, images in .scss, .css, .js:  
  string-replace-loader handle aliases @images, @icons:
  ```CSS
  .block {
    background: url('@images/[filename].jpg') no-repeat;
  }
  
  .icon {
    background: url('@images/[filename].svg') no-repeat;
  }
  ```
  ```JS
  import Background from '@images/[filename].jpg';
  import Icon from '@images/[filename].svg';
  ```
4. Relative path to images in .pug:  
  you should use require for it and aliases @images, @icons
  ```pug
  img.background(src=require('@images/background.jpg'), alt="", width="320px", height="240px")
  img.icon(src=require('@images/icon.svg'), alt="", width="320px", height="240px")
  ```
  
