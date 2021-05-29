import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from 'components/form/table';

const DataTable = props => {

    const { headers, action, values } = props
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.profile)

    useEffect(() => {
        dispatch(action(page, profile.MemberId));
    }, [page]);

    const handleNext = useCallback(() => {
        setPage(page + 1);
    });
    const handlePrev = useCallback(() => {
        setPage(page > 1 ? page - 1 : 0);
    });

    return (
        <>
            <Table headers={headers} values={values} />
            <div className='paginator'>
            </div>
        </>
    )
}

export default DataTable
