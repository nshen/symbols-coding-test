# symbols-coding-test

## Install

`npm install symbols-coding-test`

## Usage

### In Node.js :

```js
const { parseHTML } = require("symbols-coding-test");

const html = `<div style="background-color: yellow; font-size: 14px" id="first-div">
    Hello, friends
    <p class="para" style="font-family: monospace; font-size: 11px">
      Lorem ipsum dolor sit
    </p>
    <footer style="width: auto; height: 100px; color: blue">
      <span>
        This is the end
      </span>
    </footer>
  </div>`;

console.log(parseHTML(html));
```

### In Web page

```js
<!DOCTYPE html>
<html>

<head>
  <title>Test HTML</title>
</head>

<body>
  <textarea id="inputTextarea" rows="20" cols="80"></textarea>
  <button id="parseButton">Parse</button>

  <script type="module">

    import {parseHTML} from 'https://unpkg.com/symbols-coding-test@0.0.1/dist/index.mjs';

    // default value
    const textarea = document.getElementById('inputTextarea');
    textarea.value = `<div style="background-color: yellow; font-size: 14px" id="first-div">
    Hello, friends
    <p class="para" style="font-family: monospace; font-size: 11px">
      Lorem ipsum dolor sit
    </p>
    <footer style="width: auto; height: 100px; color: blue">
      <span>
        This is the end
      </span>
    </footer>
  </div>`;

    function handleParseButtonClick() {
      const parsedHTML = parseHTML(textarea.value);
      console.log(parsedHTML);
    }

    const parseButton = document.getElementById('parseButton');
    parseButton.addEventListener('click', handleParseButtonClick);

  </script>
</body>

</html>
```

## Test

`npm run test`
