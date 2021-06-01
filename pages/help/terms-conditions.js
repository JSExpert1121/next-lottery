import React from 'react';
import Layout from 'components/layout';

const TermsConditions = () => {
    return (
        <Layout>
            <main id="main" className="clearfix">
                <div className='wrap' id='terms'>
                    <div className="terms-header">TERMS AND CONDITIONS</div>
                    <div className="terms-body">
                        <iframe src="/pdf/tc.pdf" style={{width: '100%', height: '80vh'}} frameBorder="0" scrolling="no"></iframe>
                        <div className="top_toolbar"></div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default TermsConditions
