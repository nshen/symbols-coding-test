export function parseHTML(html: string) {
  html = html.trim();
  const stack: any[] = [];
  let currentNode: any = null;
  const pushToStack = (obj: any) => {
    if (currentNode) {
      if (!currentNode.children) {
        currentNode.children = []
      }
      currentNode.children.push(obj);
    }
    currentNode = obj;
    stack.push(obj);
  };
  const popFromStack = () => {
    stack.pop();
    currentNode = stack[stack.length - 1];
  };
  let i = 0;
  while (i < html.length) {
    // ignore comments
    if (html.startsWith('<!--', i)) {
      const endIndex = html.indexOf('-->', i + 4);
      if (endIndex === -1) {
        break;
      }
      i = endIndex + 3;
    } else if (html.startsWith('</', i)) {
      // node is closing
      const closingTagEndIndex = html.indexOf('>', i + 2);
      if (closingTagEndIndex === -1) {
        break;
      }
      if (stack.length === 1) {
        // we are closing the root node, so that's the end of the parsing
        return stack[0]
      }
      popFromStack();
      i = closingTagEndIndex + 1;
    } else if (html.startsWith('<', i)) {
      const tagEndIndex = html.indexOf('>', i + 1);
      if (tagEndIndex === -1) {
        break;
      }
      const tagContent = html.slice(i + 1, tagEndIndex).trim();
      const tagParts = tagContent.match(/(\w+|"[^"]*")/g);
      if (!tagParts) {
        break;
      }
      const node = {
        tag: tagParts[0].toLowerCase(),
      };
      for (let i = 1; i < tagParts.length; i += 2) {
        const attributeName = tagParts[i];
        let attributeValue = tagParts[i + 1];
        attributeValue = attributeValue.replace(/^"(.*)"$/, '$1');
        if (attributeName === 'style') {
          node[attributeName] = {}
          attributeValue.split(';').forEach((style) => {
            const kv = style.split(':')
            node[attributeName][camelCase(kv[0].trim())] = kv[1].trim();
          })
        } else {
          node[attributeName] = attributeValue;
        }
      }
      pushToStack(node);
      i = tagEndIndex + 1;
    } else {
      // add text to currentObj
      const textEndIndex = html.indexOf('<', i);
      if (textEndIndex === -1) {
        break;
      }
      const textContent = html.slice(i, textEndIndex).trim();
      if (textContent && currentNode) {
        currentNode.text = textContent;
      }
      i = textEndIndex;
    }
  }
}


function camelCase(str: string) {
  return str.replace(/-([a-z])/g, function(matches) {
    return matches[1].toUpperCase();
  });
}
