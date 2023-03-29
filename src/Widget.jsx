import React, { useEffect, useState } from 'react';

import './App.css'
import { SandboxedIframe } from './SandboxedIframe';

export const Events = {
    IFRAME_RENDER: 'IFRAME_RENDER',
};

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
          <div
              id={getAppDomId(id)}
              className='iframe'
          >
              {source && (<div className='iframe-loading'>{id}</div>)}
              {!source && (<div className='iframe-unrendered'>{id}</div>)}
          </div>
      </div>
    );
}
