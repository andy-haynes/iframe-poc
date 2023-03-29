function buildSandboxedWidget(scriptSrc) {
    return `
        <html>
            <head>
                <script crossorigin src="https://cdn.jsdelivr.net/npm/near-api-js@1.1.0/dist/near-api-js.min.js"></script>
                <script type="module">
                    ${scriptSrc}                        
                </script>
            </head>
        </html>
    `;
}

export function SandboxedIframe({ id, scriptSrc }) {
    return (
        <iframe
            id={id}
            className='sandboxed-iframe'
            csp={[
                "default-src 'self'",
                "connect-src https://rpc.testnet.near.org",
                "script-src 'unsafe-inline' 'unsafe-eval'",
                "script-src-elem https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://esm.sh https://demo-nsproxy.kitwallet.app 'unsafe-inline'",
                '',
            ].join('; ')}
            height={0}
            sandbox='allow-scripts'
            srcDoc={buildSandboxedWidget(scriptSrc)}
            title='code-container'
            width={0}
            style={{ border: 'none' }}
        />
    );
}
