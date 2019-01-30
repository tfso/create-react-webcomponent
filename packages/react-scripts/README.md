# react-scripts

This package includes scripts and configuration used by [Create React App](https://github.com/facebook/create-react-app).<br>
Please refer to its documentation:

- [Getting Started](https://facebook.github.io/create-react-app/docs/getting-started) – How to create a new app.
- [User Guide](https://facebook.github.io/create-react-app/) – How to develop apps bootstrapped with Create React App.

# TFSO-MODIFIED: Web component
This version of create-react-app it setup for creating web components.

See template/public/index.html for polyfills you'll need.

Installation: create-react-app --scripts-version=@tfso/react-scripts-webcomponent

Changes:
- Build is modified to produce a single javascript file with everything included (styles, runtime, etc). Source maps are not included.
- During css preprocessing, all styles are prepended with the :host tag.
- During runtime, the styles are loaded, and all :host tags are replaced by the name of the web component. The styles are then mounted in style tags inside the web component.
- We only use custom elements, not shadow dom. This is because shadow dom polyfills are pretty bad. 
  Also, many react component packages rely on getting events from specific dom elements, which doesn't work when shadow dom retargets events to look like they come from the web component instead.
- IE11 polyfills included by default
- Styled components included by default