import React, { useEffect, useState } from 'react';

import './App.css'
import { SandboxedIframe } from './SandboxedIframe';

export const Events = {
    IFRAME_RENDER: 'IFRAME_RENDER',
};

const buildScript = (id) => `
    import { h } from 'https://esm.sh/preact';
    const node = h('div', { className: 'iframe-initialized' }, '${id}');
    window.parent.postMessage(
        JSON.stringify({ type: '${Events.IFRAME_RENDER}', id: '${id}', node }),
        '*'
    );
`;

export function getAppDomId(id) {
    return `dom-${id}`;
}

export function getIframeId(id) {
    return `iframe-${id}`;
}

export function Widget({ id, sourceUrl }) {
    const [source, setSource] = useState(null);

    useEffect(() => {
        (async function () {
            const res = await fetch(sourceUrl);
            const { source: appSource } = await res.json();
            setSource(appSource);
        }());
    }, []);

    return (
      <div>
          {source && (
              <SandboxedIframe
                  id={getIframeId(id)}
                  scriptSrc={source}
              />
          )}
          {!source && (
              <span>
                  Fetching app source...
              </span>
          )}
          <div
              id={getAppDomId(id)}
              className='iframe'
          >
            <div className='iframe-uninitialized'>{id}</div>
          </div>
      </div>
    );
}
