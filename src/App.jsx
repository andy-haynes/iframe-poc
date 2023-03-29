import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

import './App.css'
import { Events, getAppDomId, Widget } from './Widget';

function App() {
    const [roots, setRoots] = useState({});

    useEffect(() => {
        async function processEvent(event) {
            try {
                if (typeof event.data !== 'string') {
                    return;
                }

                const data = JSON.parse(event.data);
                if (data.type === Events.IFRAME_RENDER) {
                    const { id, node } = data;
                    const { children, ...props } = node.props;

                    const element = React.createElement(node.type, props, children);
                    if (roots[id]) {
                        roots[id].render(element);
                    } else {
                        const root = ReactDOM.createRoot(document.getElementById(getAppDomId(id)));
                        setRoots({ ...roots, [id]: root });
                        root.render(element);
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }

        window.addEventListener('message', processEvent);
        return () => window.removeEventListener('message', processEvent);
    }, []);

    return (
      <div className="App">
          <span>
              Each box is the root DOM for an app running in a corresponding sandboxed iframe.
              Initially red, boxes turn green when the parent window renders a DOM element sent
              from the corresponding iframe upon loading.
          </span>
          <div className="iframes">
              {[...new Array(50)].map((n, i) => (
                  <Widget
                      key={i}
                      id={i}
                      sourceUrl={`https://demo-nsproxy.kitwallet.app/source/${i}`}
                  />
              ))}
          </div>
      </div>
  )
}

export default App

// sourceUrl={`https://demo-nsproxy.kitwallet.app/source/${i}`}