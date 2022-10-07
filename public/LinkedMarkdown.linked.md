Markdown
: Markdown is a lightweight markup language for creating formatted text using a plain-text editor. Read more https://daringfireball.net/projects/markdown/syntax.

Linked Markdown
: A superset of Markdown that provides support for declaring variables, referencing them and importing them from remote sources.

---

# Linked Markdown

A Linked Markdown document has two sections:

- A first section with definitions, both local and remotely imported ones.
- A second section with its content, in Markdown.

[[toc]]

::: warning
_here be dragons_
:::

## 1. Uses

The main intended use is writing legal agreements and law. Linked Markdown provides powerful features for such use case, because it allows to:

- Import definitions from other documents, reducing the need to repeat a definition and the risk of omitting it, which in turn increases precision of language
- Quickly create sound agreements by importing existing definitions from other documents. An open-source approach to law
- Clearly define data at the beginning of a document, avoiding subjective definitions and loose ends
- Reference such data in the document and know at a glance the value of the references

## 2. Specification

### 2.1. Extension

The extension for Linked Markdown files is `linked.md` (e.g. `File.linked.md`).

### 2.2. Sections

A Linked Markdown file has a first sections containing definitions, and a second section containing Markdown. They are separated by three lines

```
Definition Name
: Definition content.

---

# Markdown content
Any Markdown _text_.
```

### 2.3. Definitions

Definitions are the very pillar of Linked Markdown. They define data that will be accessible and referenced within the document, and also might be imported by other documents.

```
Definition Name
: Definition content.

Another Definition Name
: More content.
```

#### 2.3.1. Importing definitions

Definitions can be imported from other documents as follows:

```
Definition Name 1, Definition Name 2 as Def2
: Import definitions https://domain.tld/Definitions.linked.md
```

Imported definitions will become accessible within the current document.

#### 2.3.2. Referencing definitions

In Linked Markdown, all mentions of a definition's name will have a tooltip containing the definition content itself, and can be clicked to see their complete definition in the upper part of the document.
No need to write anything special, just write the definition by its name (it's case-sensitive).

#### 2.3.3. Substituting definitions

It's possible to replace a definition with its value instead of just referencing to it. This is the syntax:

```
[%Definition]
```

### 2.4. Inclusions

It's possible to include a remote Linked Markdown document in the current one.

```
MIT
: Import https://domain.tld/MIT.linked.md

---

:include[MIT]{"Year"="2022" "Copyright holder"="MyDAO"}
```

## 3. Publishing documents

Linked Markdown is a building block that enables many things, such as an open source legal system[^1] to emerge.
Since Linked Markdown documents can import other documents, it's possible to track dependencies and even build a website to track them and showcase popular documents, similar to what NPM[^2] does.
A first take on doing so can be found at https://repo.linked.md. You can log in with any Web3-compatible wallet[^3]

[^1]: Building an open source legal system https://mirror.xyz/writings.nation3.eth/IkI3u7YEI0GYEK5cz2WqU6kno-YDEik1K0WT--uHzfw
[^2]: Node Package Manager https://npmjs.org
[^3]: Understanding Web3 https://learn.rainbow.me/understanding-web3

## 4. Engaging
