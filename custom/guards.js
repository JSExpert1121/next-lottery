import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

export const ProtectedRoute = ({ children, config }) => {
    const profile = useSelector(state => state.user.profile);
    const router = useRouter();

    const url = useMemo(() => {
        return config?.url ?? '/auth/login';
    }, [config?.url]);
    const match = useMemo(() => {
        if (config?.match) {
            const regex = new RegExp(config.match);
            return regex.test(router.asPath) && url !== router.asPath;
        }

        return url !== router.asPath;
    }, [config?.match, router.asPath, url]);

    useEffect(() => {
        if (!profile && match) {
            router.replace({
                pathname: url,
                query: { referer: router.asPath === url ? '/' : router.asPath }
            });
        }
    }, [profile, match]);

    // if (!profile && router.asPath !== url && match) {
    //     return <Loading />
    // }
    return children;
};