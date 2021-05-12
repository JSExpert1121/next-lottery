import React from 'react';
import Layout from 'components/layout';

const VerifyMailPage = ({ }) => {
    return (
        <Layout>
            <main className=''>
                Update-Password Page
            </main>
        </Layout>
    )
}

export async function getServerSideProps(context) {

    const { params, req, res, query } = context;
    return {
        props: {

        }
    }

}

export default VerifyMailPage;