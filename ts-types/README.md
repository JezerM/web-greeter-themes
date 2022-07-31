# Nody-Greeter/Web-Greeter types

This package provides the typescript types for [nody-greeter][nody-greeter] and [web-greeter][web-greeter].

```sh
npm install nody-greeter-types
```

## Example

```typescript
import {lightdm, theme_utils} from "nody-greeter-types";

lightdm.authentication_complete.connect(() => console.log("DONE!"));

theme_utils.dirlist("/usr/share/backgrounds", true, (files) => {
  console.log(files);
});
```

[nody-greeter]: https://github.com/JezerM/nody-greeter "Nody Greeter"
[web-greeter]: https://github.com/JezerM/web-greeter "Web Greeter"
