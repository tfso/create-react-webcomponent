import ReactDOM from 'react-dom'

function getStyleElementsFromReactWebComponentStyleLoader(){
    try{
        return require('react-web-component-style-loader/exports').styleElements
    }catch(e){
        return []
    }
}

export default function createWebComponent(reactApp, tag, observedAttributes = []){
    customElements.define(tag, class extends HTMLElement{
        constructor(){
            super()
            this._constructWithoutShadowDOM()
        }

        _constructWithoutShadowDOM(){
            const mountPoint = document.createElement('div')
            const styles = getStyleElementsFromReactWebComponentStyleLoader()
            for(let style of styles){
                this.appendChild(this._getTagScopedStyle(style))
            }
            this.appendChild(mountPoint)

            this.appInstance = null
            let that = this
            ReactDOM.render(reactApp, mountPoint, function(){
                that.appInstance = this
                that._callLifeCycleHook('webComponentConstructed', that, mountPoint)
            })
        }

        _getTagScopedStyle(style){
            let replacedStyle = document.createElement('style')
            replacedStyle.innerHTML = style.innerHTML.replace(/:host/g, tag)
            return replacedStyle
        }

        // Determines what attributes we will get change-callback for
        static get observedAttributes(){
            return observedAttributes
        }

        _callLifeCycleHook(name, ...args){
            if(this.appInstance[name]){
                this.appInstance[name](...args)
            }
        }

        connectedCallback(){
            this._callLifeCycleHook('webComponentConnected')
        }

        disconnectedCallback(){
            this._callLifeCycleHook('webComponentDisconnected')
        }

        attributeChangedCallback(attrName, oldVal, newVal){
            this._callLifeCycleHook('webComponentAttributeChanged', attrName, oldVal, newVal)
        }

        adoptedCallback(){
            this._callLifeCycleHook('webComponentAdopted')
        }
    })
}
