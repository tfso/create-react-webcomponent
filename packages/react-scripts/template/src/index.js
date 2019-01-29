import 'react-app-polyfill/ie11'
import React from 'react'
import './index.css'
import styled from 'styled-components/macro'
import createWebComponent from './createWebComponent'
import WebComponentBridge from './WebComponentBridge'

const BlueText = styled.div`
  color: dodgerblue;
`

const App = WebComponentBridge(({attributes}) => {
  return (
    <div>
      <h1>Hello web component!</h1>
      <BlueText>These are my attributes: {Object.values(attributes).join(' ')}. Also, this nice color is produced by styled components.</BlueText>
    </div>
  )
})

const addWebComponentsToPage = () => {
  // Define the name of the web component (my-webcomponent) and attributes that should be observed (attribute1 and attribute2)
  createWebComponent(<App />, 'my-webcomponent', ['attribute1', 'attribute2'])
}

if(window && window.WebComponents && window.WebComponents.ready){
  addWebComponentsToPage()
}else{
  window.addEventListener('WebComponentsReady', addWebComponentsToPage)
}