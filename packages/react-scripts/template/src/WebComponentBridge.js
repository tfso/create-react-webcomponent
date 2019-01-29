import React, {Component} from 'react'
import {StyleSheetManager} from 'styled-components'

export default (WrappedComponent) =>
class WebComponentBridge extends Component{
    constructor(props){
        super(props)
        this.state = {
            componentConstructed: false,
            attributes: {},
            mountPoint: null
        }
    }

    webComponentConstructed(component, mountPoint){
        const attributes = Array.from(component.attributes)
            .reduce((attributes, attribute) =>{
                attributes[attribute.nodeName] = attribute.nodeValue
                return attributes
            } , {})

        this.setState({mountPoint, attributes, componentConstructed: true})
    }

    webComponentAttributeChanged(attributeName, oldValue, newValue){
      const attributes = {...this.state.attributes}
        attributes[attributeName] = newValue
        this.setState({attributes})
    }

    render(){
        if(!this.state.componentConstructed){
            return null
        }

        return (
            <StyleSheetManager target={this.state.mountPoint} ref="">
                <WrappedComponent attributes={this.state.attributes} />
            </StyleSheetManager>
        )
    }
}