import { useState } from 'react'
import { Paginator, PaginatorRowsPerPageDropdownOptions, PaginatorPrevPageLinkOptions, PaginatorPageChangeEvent } from 'primereact/paginator'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { FetchMoreFunction } from '@apollo/client/react/hooks/useSuspenseQuery'
import { FetchMoreQueryOptions, FetchMoreOptions, OperationVariables,  } from '@apollo/client'
import {products, queryVars } from '@/types/appProps'
import { UpdateQueryFn } from '@apollo/client/core/watchQueryOptions'

type Props = {
    fetchMore : FetchMoreFunction<products, OperationVariables>,
    data: products
}

function MalikPaginator({fetchMore, data}: Props) {
    const [first, setFirst] = useState<number>( 0);

    const [rows, setRows] = useState<number>(20);


    const onPageChange = (e: PaginatorPageChangeEvent, index: number) => {
        console.log(e)
        setFirst( e.first);
        setRows(e.rows);
        fetchMore({
            variables: {
                first: e.rows,
                after: data.products?.pageInfo.endCursor,
                last: null,
                before: null
            }
            
        })
    }
    const paginatorTemplate = {
        layout: 'RowsPerPageDropdown PrevPageLink NextPageLink',
        RowsPerPageDropdown: (options: PaginatorRowsPerPageDropdownOptions) => {
            const dropdownOptions = [
                { label: 20, value: 20 },
                { label: 40, value: 40 },
                { label: 60, value: 60 },
                { label: 100, value: 100 }
            ];

            return (
                <>
                    <span className="mx-1" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
                        Товаров на странице:{' '}
                    </span>
                    <Dropdown value={options.value} options={dropdownOptions} defaultValue={20} onChange={options.onChange} />
                </>
            );
        },
        PrevPageLink: (options: PaginatorPrevPageLinkOptions) => {
            const pagePrevHandler = () => {
                fetchMore({
                    variables: {
                        first: null,
                        after: null,
                        last: rows,
                        before: data.products?.pageInfo.startCursor
                    },
                })
            }
            return (
                <>
                    <Button icon="pi pi-angle-left" className="mr-10 ml-3" onClick={pagePrevHandler} disabled={!data?.products?.pageInfo.hasPreviousPage} />
                </>
            )
        },
        NextPageLink: () => {
            const pageNextHandler = () => {
                console.log('hello')
                fetchMore({
                    variables: {
                        first: rows,
                        after: data.products?.pageInfo.endCursor,
                        last: null,
                        before: null
                    }
                    
                })
            }

            return (
                <>
                    <Button icon="pi pi-angle-right"style={{ marginLeft: '10px' }} disabled={!data?.products?.pageInfo.hasNextPage}  onClick={pageNextHandler} />
                </>
            )
        }
    }

    return (<Paginator template={paginatorTemplate} first={first} rows={rows} totalRecords={120} onPageChange={(e) => onPageChange(e, 1)} className="justify-content-end" />)
}


export default MalikPaginator