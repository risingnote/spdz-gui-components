# spdz-gui-components
Common library of React components used by SPDZ demonstrator GUIs. Non React dependant libs are in module spdz-gui-lib.

Run tests with `npm test`.

Build/transpile code to ES5 before uploading to GIT with `npm run build`. At present webpack is not used and so restrictions on, for example, including css directly.

Include in other node projects with:

 `npm install --save git+ssh://git@github.com/bristolcrypto/spdz-gui-components.git#v0.1.0`

## Exported components
### SetupContainer
------
A higher order component to wrap an MPC GUI with setup functions responsible for:

- getting the SPDZ proxy config by calling the /spdzProxyConfig REST endpoint on the same URL that served the GUI
- generating client key material, one time public key and session keys for each SPDZ Proxy.

Function exported as `setupWrapper`.

Wrapped component will receive the following properties:

#### spdzProxyServerList

Config supplied from REST endpoint as immutable List of Map

#### spdzApiRoot

The root of the path to access the spdz proxies.

#### clientPublicKey

A string holding a 64 char hex public key for the client.

#### Props

None. 

#### Example usage

```javascript
import { setupWrapper } from 'spdz-gui-components'
import MySPDZGUI from './some_location'

const GuiWithSetup = setupWrapper(MySPDZGUI)

class App extends Component {

  render() {
    return (
      <GuiWithSetup />
    )
  }
}
```

### Connection
------
A display component to list the SPDZ proxies and a visual representation of their connection status (disconnected: grey, connected: green, failed: reddish).

Exported as `Connection`

#### Props

##### spdzProxyServerList

Immutable List of Map containing 'url' key. Typically provided by SetupContainer. Required.

##### spdzProxyStatus

Array of objects containing 'id' (index into spdzProxyServerList) and 'status' (ProxyStatusCodes from 'spdz-gui-lib'). If fewer array elements than in spdzProxyServerList then missing elements are assumed to be disconnected. Typically provided by connectToProxies and disconnectFromProxies from spdz-gui-lib. Required.

##### componentStyle

Style Connection container with Map of css inline style properties, merged with defaults. Optional.

##### headerStyle

Style Connection container header with Map of css inline style properties, merged with defaults. Optional.

##### urlStyle

Style div holding proxy url text with Map of css inline style properties, merged with defaults. Optional.

#### Example usage

```javascript
import Connection from './Connection'
import { List, Map } from 'immutable'
import { ProxyStatusCodes } from 'spdz-gui-lib' 

.....

const proxyList = List.of(
  Map({
    url: "http://spdzProxy.one:4000"
  }),
  Map({
    url: "http://spdzProxy.two:4000"
  })
)

const proxyStatus = [
  {
    id: 0,
    status: ProxyStatusCodes.Failure
  },
  {
    id: 1,
    status: ProxyStatusCodes.Connected
  }
]

const myStyle = {
  fontSize: '14px'
}

return (
  <Connection spdzProxyServerList={proxyList} spdzProxyStatus={status1Connected} urlStyle={myStyle}/>
)
.....

```

