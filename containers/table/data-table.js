import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from 'components/form/table';

const DataTable = props => {

    const { headers, action, values, keys, style, component } = props
    const [page, setPage] = useState(1);
    const [busy, setBusy] = useState(false);
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.profile)

    useEffect(() => {
        const fetchData = async () => {
            setBusy(true);
            try {
                const result = await dispatch(action(page, profile.MemberId));
            } catch (error) {
                console.log(error);
            } finally {
                setBusy(false);
            }
        }

        fetchData();
    }, [page, action]);

    const handleNext = useCallback(() => {
        setPage(page + 1);
    }, [page]);
    const handlePrev = useCallback(() => {
        setPage(page > 1 ? page - 1 : 1);
    }, [page]);

    const DataViewer = component ?? Table;
    return (
        <div className='table-wrapper'>
            <div className='data-table'>
                {busy && <div className="simple-spinner"></div>}
                <DataViewer headers={headers} values={values} keys={keys} style={style} />
            </div>
            <div className='paginator'>
                <button onClick={handlePrev}><span /></button>
                <span className='page'>{page}</span>
                <button onClick={handleNext}><span /></button>
            </div>
        </div>
    )
}

export default DataTable
