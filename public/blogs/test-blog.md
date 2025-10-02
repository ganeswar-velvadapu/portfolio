# Complete Markdown Syntax Guide

Welcome to the complete markdown syntax guide! This document demonstrates all markdown features available for writing blogs on this website.

---

## What is Markdown?

Markdown is a lightweight markup language that allows you to write formatted text using plain text syntax. It's widely used for documentation, README files, and blog posts because it's easy to read and write.

---

## Headings

Headings are created using `#` symbols. More `#` symbols create smaller headings.

# Heading 1 (H1)
Used for main titles. Only use once per blog post.

## Heading 2 (H2)
Used for major sections in your blog post.

### Heading 3 (H3)
Used for subsections within H2 sections.

#### Heading 4 (H4)
Used for smaller subsections.

##### Heading 5 (H5)
Used for even smaller subsections.

###### Heading 6 (H6)
The smallest heading level available.

---

## Text Formatting

### Bold Text
Make text **bold** using double asterisks: `**bold text**`

You can also use double underscores: __bold text__

### Italic Text
Make text *italic* using single asterisks: `*italic text*`

You can also use single underscores: _italic text_

### Bold and Italic
Combine them for ***bold and italic text***: `***text***`

### Strikethrough
~~Strikethrough text~~ using double tildes: `~~strikethrough~~`

---

## Paragraphs

Paragraphs are created by leaving a blank line between text blocks. This is the first paragraph with some sample text to demonstrate how paragraphs work in markdown.

This is the second paragraph. Notice the blank line between this and the previous paragraph. Without the blank line, the text would be on the same paragraph.

---

## Line Breaks

To create a line break without starting a new paragraph,  
end a line with two or more spaces, then press enter.  
This creates a line break within the same paragraph.

---

## Lists

### Unordered Lists
Create unordered lists using `-`, `*`, or `+`:

- First item
- Second item
- Third item
  - Nested item 1
  - Nested item 2
    - Deeply nested item
- Fourth item

### Ordered Lists
Create ordered lists using numbers followed by periods:

1. First item
2. Second item
3. Third item
   1. Nested item 1
   2. Nested item 2
4. Fourth item

### Task Lists
Create task lists using `- [ ]` for unchecked and `- [x]` for checked:

- [x] Completed task
- [ ] Incomplete task
- [ ] Another incomplete task

---

## Links

### Inline Links
Create links using `[text](url)`: [Visit Google](https://www.google.com)

### Link with Title
Add a title that appears on hover: [Visit Google](https://www.google.com "Google Homepage")

### Reference Links
You can also use reference-style links:

[This is a reference link][1]

[Another reference link][custom-reference]

[1]: https://www.example.com
[custom-reference]: https://www.github.com

### URLs and Email Addresses
Automatic linking for URLs: https://www.example.com

Email addresses: email@example.com

---

## Images

### Basic Image
Display images using `![alt text](image-url)`:

![Sample Image](https://images.pexels.com/photos/34103835/pexels-photo-34103835.jpeg)

### Image with Title
Add a title that appears on hover:

![Sample Image](https://via.placeholder.com/600x300 "This is a placeholder image")

### Image with Link
Make an image clickable:

[![Clickable Image](https://via.placeholder.com/400x200)](https://www.example.com)

---

## Code

### Inline Code
Use backticks for `inline code`: \`code\`

Example: The `console.log()` function prints to the console.

### Code Blocks
Use triple backticks for code blocks:

```
This is a basic code block
No syntax highlighting
```

### Syntax Highlighting
Specify the language after the opening backticks:

```javascript
// JavaScript example
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet("World");
```

```python
# Python example
def greet(name):
    print(f"Hello, {name}!")

greet("World")
```

```html
<!-- HTML example -->
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

```css
/* CSS example */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #333;
  font-size: 2rem;
}
```

---

## Blockquotes

Create blockquotes using `>`:

> This is a blockquote. Blockquotes are great for highlighting important information, quotes from other sources, or call-out text.

### Nested Blockquotes

> This is the first level of quoting.
>
> > This is a nested blockquote.
>
> Back to the first level.

### Blockquotes with Other Elements

> ## Heading in Blockquote
>
> - List item 1
> - List item 2
>
> **Bold text** and *italic text* also work in blockquotes.
>
> ```javascript
> // Even code blocks!
> console.log("Hello from blockquote");
> ```

---

## Horizontal Rules

Create horizontal rules using three or more hyphens, asterisks, or underscores:

---

***

___

---



## Escape Characters

Use backslash `\` to escape markdown characters:

\*This text is not italic\*

\# This is not a heading

\- This is not a list item

Common characters to escape: \\ \` \* \_ \{ \} \[ \] \( \) \# \+ \- \. \!

---


## Emoji

You can use emoji codes: :smile: :heart: :rocket: :fire: :computer:

Or use actual emoji: 😊 ❤️ 🚀 🔥 💻

---



## Best Practices for Blog Writing

1. **Use descriptive headings** - They help readers scan your content
2. **Break up text** - Use paragraphs, lists, and images to improve readability
3. **Add code examples** - If you're writing technical content, include code snippets
4. **Use blockquotes for emphasis** - Highlight important information
5. **Include images** - Visual content makes posts more engaging
6. **Link to resources** - Provide additional reading material
7. **Proofread** - Always review your markdown before publishing

---

## Common Use Cases

### Technical Tutorial
Use code blocks with syntax highlighting to show examples:

```javascript
// Step 1: Import required modules
const express = require('express');
const app = express();

// Step 2: Create a route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Step 3: Start the server
app.listen(3000);
```

---

## Conclusion

This guide covers all the essential markdown features you can use when writing blog posts for this website. Markdown is powerful yet simple, making it perfect for creating formatted content quickly.

**Happy writing! 🚀**

---

## Quick Reference

```markdown
# Heading 1
## Heading 2
### Heading 3

**bold text**
*italic text*
***bold and italic***
~~strikethrough~~

- Unordered list
1. Ordered list

[link text](url)
![image alt](image-url)

`inline code`

```language
code block
```

> Blockquote



```

*Note: Some advanced markdown features may render differently depending on the markdown parser being used.*