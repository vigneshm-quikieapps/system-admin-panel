# Instructions

## Prerequisites you need to know or learn

- Material-UI v5
- react-query
- react-hook-form & yup

## Naming files

- Use `lower-kebab-case` for file names
- Use `.jsx` file extension when the file includes jsx tags

## Naming variables

- Use meaningful names
- Use camelCase

## Code style

- Use prettier formatter
- Set format on save in your IDE
- set the prettier config file path to `.prettier.json`

## Project Structure

- assets: images, icons, fonts and other assets
- components: common components
- helper/constants.js: reusable constant variables
- hoc: Higher Order Components (example: main-layout)
- services: API call functions
- hooks: your custom hooks
- router: app routes
- styles: Theme and global styles (don't change it, contact Abbas if you need a
  global style, theme variable or theme override to be included)
- utils: reusable functions used through the app

## Styling

We are going to use the [sx prop][4] and internal [styled][1] function of
material-ui which has access to the [theme](https://mui.com/customization/theming/)
object and the component props.
So we're using inline styling for every component and you should not import any
stylesheets in your components.

MUI almost has all the components required in this project which you can
customize using the [styled][1] function mentioned above, so try to use
Material-UI pre-built components whenever possible especially
for [Typography][2].

Read the `material-ui` v5 [documentation][3] if you are not familiar with MUI
yet

`styled` basic usage:

```jsx
import * as React from "react";
import { styled } from "@mui/system";

const MyComponent = styled("div")({
  color: "darkslategray",
  backgroundColor: "aliceblue",
  padding: 8,
  borderRadius: 4,
});

export default function BasicUsage() {
  return <MyComponent>Styled div</MyComponent>;
}
```

`styled` accessing the theme:

```jsx
const MyThemeComponent = styled("div")(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));
```

`styled` advanced usage (accessing the theme and component props, applying nested styles):

```jsx
import { styled } from "@mui/material/styles";

const SpanWithPopup = styled("span", {
  // return false for props that shouldn't be passed to the underlying component
  shouldForwardProp: (prop) => ["color", "popupColor"].indexOf(prop) === -1,
})(({ theme, color, popupColor }) => ({
  position: "relative",
  backgroundColor: theme.palette.background.paper,
  color: color,
  "&::after": {
    content: "attr(data-title)",
    display: "block",
    position: "absolute",
    top: "100%",
    left: "50%",
    color: popupColor,
    whiteSpace: "nowrap",
    transform: "translate(-50%, 0)",
    padding: `0 ${theme.spacing(1)}`,
    marginTop: `${theme.spacing(0.5)}`,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 4,
    visibility: "hidden",
  },
  "&:hover, &:focus": {
    "&::after": {
      visibility: "visible",
    },
  },
}));
```

[1]: https://mui.com/system/styled/
[2]: https://mui.com/components/typography/
[3]: https://mui.com/getting-started/usage/
[4]: https://mui.com/system/the-sx-prop/
