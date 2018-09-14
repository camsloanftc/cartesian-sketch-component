import React from 'react'
import cartesianProduct from 'cartesian-product'

class CartesianSketchComponent extends React.Component<Props> {
	static defaultProps = {
		propTemplate: {},
	}

	appendPropName = propTable => {
		const propNames = Object.keys(propTable)

		const newArray = propNames.map(propName => {
			const singlePropArray = propTable[propName]

			return singlePropArray.map(singleProp =>
				Object.assign(
					{},
					{
						...singleProp,
						name: propName,
					}
				)
			)
		})

		return newArray
	}

	capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1)

	cartesianProductize = propCombinations => cartesianProduct(propCombinations)

	buildComponentInstanceTitle = (propCombination, componentName) => {
		const initialValue = ''
		const variationName = propCombination.reduce(
			(prev, next) => `${prev} / ${this.capitalizeFirstLetter(next.name)}: ${next.label}`,
			initialValue
		)

		const componentVariationName = `${componentName}${variationName}`
		return componentVariationName
	}

	buildInstancePropsObject = propCombination => {
		const newObj = propCombination.reduce((acc, current) => {
			const obj = {}
			obj[current.name] = current.value
			return Object.assign({}, acc, ...obj)
		}, {})

		return newObj
	}

	buildComponent = (Component, componentName, uniqueProps, commonProps) => {
		const componentInstanceTitle = uniqueProps
			? this.buildComponentInstanceTitle(uniqueProps, componentName)
			: componentName

		const uniquePropsObject = uniqueProps ? this.buildInstancePropsObject(uniqueProps) : null

		return (
			<div>
				<p>{componentInstanceTitle}</p>
				<span data-sketch-symbol={componentInstanceTitle}>
					<Component {...uniquePropsObject} {...commonProps} />
				</span>
			</div>
		)
	}

	curriedBuildComponent = (propCombination, commonProps) => {
		const { Component, componentName } = this.props.propTemplate
		return this.buildComponent(Component, componentName, propCombination, commonProps)
	}

	prepareUniqueProps = uniqueProps => {
		const withAppendedPropNames = this.appendPropName(uniqueProps)

		const allPropCombinations = this.cartesianProductize(withAppendedPropNames)

		return allPropCombinations
	}

	render() {
		const { propTemplate } = this.props
		const { commonProps, uniqueProps } = propTemplate
		const noPropsExist = !commonProps && !uniqueProps

		// If there are unique prop combos, we must map all the instances.
		if (uniqueProps) {
			const preparedUniqueProps = this.prepareUniqueProps(uniqueProps)

			const allComponentVariations = preparedUniqueProps.map(singlePropCombination =>
				this.curriedBuildComponent(singlePropCombination, commonProps)
			)
			return allComponentVariations
		} else if (commonProps || noPropsExist) {
			// Otherwise, if there are common props only, or no props, only create one instance.
			const componentView = this.curriedBuildComponent(null, commonProps)
			return componentView
		}
		return (
			<div>
				Oops. It seems some prop details are missing. Check the object provided to ensure all
				required items exist.
			</div>
		)
	}
}

export default CartesianSketchComponent
