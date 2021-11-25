# ImgIcon component

## props

- children: an image file
- alt: alternative text for image file

## Example

```jsx
import IconButton from "../components/icon-button";
import ImgIcon from "../components/img-icon";
import homeIcon from "../assets/icons/icon-home.png";

const ImgButton = () => (
  <IconButton>
    <ImgIcon alt="home">{homeIcon}</ImgIcon>
  </IconButton>
);
```
