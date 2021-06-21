import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import * as UserActions from 'store/actions/user';
import Loading from 'components/common/loadding';

export const ProtectedRoute = ({ children, config }) => {
    const profile = useSelector(state => state.user.profile);
    const credentials = useSelector(state => state.auth);
    const shouldLogin = !profile?.Email && credentials.email && credentials.password;
    const [busy, setBusy] = useState(shouldLogin);

    const dispatch = useDispatch();
    const router = useRouter();

    const url = config?.url ?? '/auth/login';
    const match = useMemo(() => {
        if (config?.match) {
            const regex = new RegExp(config.match);
            return regex.test(router.asPath) && url !== router.asPath;
        }

        return url !== router.asPath;
    }, [config?.match, router.asPath, url]);

    useEffect(async () => {
        if (shouldLogin) {
            console.log(credentials);
            try {
                await dispatch(UserActions.login(credentials.email, credentials.password));
            } catch (error) {
                console.log('login using stored credentials failed');
            } finally {
                setBusy(false);
            }
        }
    }, [credentials, shouldLogin]);

    useEffect(async () => {
        if (shouldLogin || (profile || !match)) return;

        router.replace({
            pathname: url,
            query: { referer: router.asPath === url ? '/' : router.asPath }
        });
    }, [profile, match, shouldLogin]);

    return busy ? <Loading /> : children;
};