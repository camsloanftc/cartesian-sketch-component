# cartesian-sketch-component
This is a React Component that exports all variations of a components props, based on the provided propTemplate.

## How to use this component

First, create a page where you will feature all your components, then import the components that you would like to export to Sketch.

For each component, you will need to build a template object structured as below:

```js
const buttonTemplate = {
	Component: Button,
	componentName: 'Button',
	uniqueProps: {
		isSecondary: [{ label: 'Secondary', value: true }, { label: 'Primary', value: false }],
		fixedSize: [
			{ label: 'Small', value: 'small' },
			{ label: 'Medium', value: 'medium' },
			{ label: 'Large', value: 'large' },
		],
	},
	commonProps: { children: 'Hello Button', isFixedSize: true },
}
```

`Component` should be the React component you will be implementing.
`componentName` is the name of the component, as you would like it to appear in Sketch.
`uniqueProps` should be structured as above, setting the name of each prop as a key, and then providing an array of the different prop possibilities for that prop's values. The `label` is used for naming in Sketch.
`commonProps` are props that are common to all instances of the component you are creating.

Both `uniqueProps` and `commonProps` are optional. If your component does not expect any props, you can leave these out and it will print a single instance of your component for Sketch.

Provide the template object to this component for each Component that you would like to export to Sketch. See below for an example.

```js
import React from 'react'
import { CartesianSketchComponent } from 'cartesian-sketch-component'
import { Button} from 'edl-components-react'
import { Divider, NavBar } from '../components'

const navBarTemplate = {
	Component: NavBar,
	componentName: 'NavBar',
}

const buttonTemplate = {
	Component: Button,
	componentName: 'Button',
	uniqueProps: {
		isSecondary: [{ label: 'Secondary', value: true }, { label: 'Primary', value: false }],
		fixedSize: [
			{ label: 'Small', value: 'small' },
			{ label: 'Medium', value: 'medium' },
			{ label: 'Large', value: 'large' },
		],
	},
	commonProps: { children: 'Hello Button', isFixedSize: true },
}

const dividerTemplate = {
	Component: Divider,
	componentName: 'Divider',
	uniqueProps: {
		type: [{ label: 'Solid', value: 'solid' }, { label: 'Dotted', value: 'dotted' }],
		thickness: [
			{ label: 'Thin', value: 'thin' },
			{ label: 'Medium', value: 'medium' },
			{ label: 'Thick', value: 'thick' },
		],
		color: [
			{ label: 'Light', value: 'light' },
			{ label: 'Medium', value: 'medium' },
			{ label: 'Dark', value: 'dark' },
		],
		width: [
			{ label: '50%', value: 50 },
			{ label: '75%', value: 75 },
			{ label: '100%', value: 100 },
		],
	},
}

const HtmlGeneratorPage = () => (
	<div>
		<CartesianSketchComponent propTemplate={navBarTemplate} />
		<CartesianSketchComponent propTemplate={dividerTemplate} />
		<CartesianSketchComponent propTemplate={buttonTemplate} />
	</div>
)

export default HtmlGeneratorPage

```

## Exporting.

You will need to use the [html-sketchapp-cli](https://github.com/seek-oss/html-sketchapp-cli) to export your page into an "almost sketch" file, ready for import into Sketch. For more details on this export, visit their docs page.