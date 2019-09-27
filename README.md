# Description

This is a postcss(7.0.0) plugin for supportting bem syntax in the process of writing css or pcss.

# Usage

## Install && use

If you want to use this tool,the first step is installing it through npm.

```
npm i @lneedy/postcss-bem --save-dev
```

[npm package](https://www.npmjs.com/package/@lneedy/postcss-bem)

After installing it,this plugin can be used in multiple ways, such as webpack, gulp and so on, you could acquire the detail information at [how to use postcss](https://github.com/postcss/postcss)

## Example

The supported css bem syntax contains mainly @component, @descendent @modifier @when. A usage example as follows:

```css
@component container {
  color: red;
  @descendent child {
    color: yellow;
  }
  @modifier des {
    color: gray;
  }
  @when state {
    color: green;
  }
}
```

```css
/* 编译后 */
.container {
  color: red;
}
.container-child {
  color: yellow;
}
.container--des {
  color: gray;
}
.container_state {
  color: green;
}
```
