// Sanity test that components 'render'
import React from 'react'
import ReactDOM from 'react-dom'
import { List } from 'immutable'
import { Connection, setupWrapper } from './index'

// Mock out REST call in setupWrapper
jest.mock('spdz-gui-lib')
import { getProxyConfig, createClientPublicKey, createEncryptionKey } from'spdz-gui-lib'

it('Connection display component renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Connection spdzProxyServerList={List()} spdzProxyStatus={[]} />, div);
});

it('Wrapper component for setup loads successfully', () => {
  // Mock out componentDidMount ajax calls
  const exampleConfig = 
        {
          "spdzApiRoot": "/spdzapi",
          "spdzProxyList": []
        }
  
  getProxyConfig.mockImplementation(() => Promise.resolve(exampleConfig))
  createClientPublicKey.mockImplementation(() => "1234567")
  createEncryptionKey.mockImplementation(() => "abcdef")
  
  const div = document.createElement('div')
  const ComponentUnderTest = setupWrapper(
    class Dummy extends React.Component {
      render() {
        return <div>Dummy component not important</div>
      }
    })

  ReactDOM.render(<ComponentUnderTest />, div)

  getProxyConfig.mockClear()
})