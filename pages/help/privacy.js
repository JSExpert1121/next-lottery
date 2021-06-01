import React from 'react';
import Layout from 'components/layout';

const Privacy = () => {
    return (
        <Layout>
            <main id="main" className="clearfix">
                <div className='wrap' id='terms'>
                    <div className="terms-header">PRIVACY</div>
                    <div className="terms-body">
                        <iframe src="/pdf/privacy.pdf" style={{width: '100%', height: '80vh'}} frameBorder="0" scrolling="no"></iframe>
                        <div className="top_toolbar"></div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default Privacy
