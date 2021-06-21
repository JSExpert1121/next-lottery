import React, { useCallback, useEffect, useState } from 'react'
import Router from 'next/router';
import Loading from 'components/common/loadding';

const Transition = ({ children }) => {
    const [loading, setLoading] = useState(false)
    
    const handleStart = useCallback(() => {
        setLoading(true);
    }, []);
    const handleStop = useCallback(() => {
        setLoading(false);
    }, []);
    useEffect(() => {
        Router.events.on('routeChangeStart', handleStart);
        Router.events.on('routeChangeComplete', handleStop);
        Router.events.on('routeChangeError', handleStop);

        return () => {
            Router.events.off('routeChangeStart', handleStart);
            Router.events.off('routeChangeComplete', handleStop);
            Router.events.off('routeChangeError', handleStop);
        }
    }, []);

    if (loading) {
        return <Loading />
    }

    return children;
}

export default Transition
