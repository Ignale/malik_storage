import { Dispatch, MutableRefObject, SetStateAction, useRef, useState } from 'react'
import { Paginator, PaginatorRowsPerPageDropdownOptions, PaginatorPrevPageLinkOptions, PaginatorPageChangeEvent } from 'primereact/paginator'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { FetchMoreFunction } from '@apollo/client/react/hooks/useSuspenseQuery'
import { FetchMoreQueryOptions, FetchMoreOptions, OperationVariables, } from '@apollo/client'
import { products, queryVars } from '@/types/appProps'
import { UpdateQueryFn } from '@apollo/client/core/watchQueryOptions'

type Props = {
  fetchMore: FetchMoreFunction<products, OperationVariables>,
  setArgs: Dispatch<SetStateAction<{ first: number | null, last: number | null, before: string | null, after: string | null }>>
  data: products
  abortController: MutableRefObject<AbortController>
}

function MalikPaginator({ fetchMore, data, setArgs, abortController }: Props) {
  const [first, setFirst] = useState<number>(0);

  const [rows, setRows] = useState<number>(20);


  const onPageChange = (e: PaginatorPageChangeEvent, index: number) => {
    setFirst(e.first);
    setRows(e.rows);
    if (data.products) {
      setArgs({
        first: e.rows,
        after: data.products?.edges.at(-1)?.cursor ?? null,
        last: null,
        before: null
      })
      fetchMore({
        variables: {
          first: e.rows,
          after: data.products?.edges.at(-1)?.cursor ?? null,
          last: null,
          before: null
        },
      })
    }
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
        if (data.products !== undefined) {
          setArgs({
            first: null,
            after: null,
            last: rows,
            before: data.products?.edges.at(0)?.cursor ?? null
          })
          fetchMore({
            variables: {
              first: null,
              after: null,
              last: rows,
              before: data.products?.edges.at(0)?.cursor ?? null
            },
          })
        }

      }
      return (
        <>
          <Button icon="pi pi-angle-left" className="mr-10 ml-3" onClick={pagePrevHandler} disabled={!data?.products?.pageInfo.hasPreviousPage} />
        </>
      )
    },
    NextPageLink: () => {
      const pageNextHandler = () => {
        if (data.products !== undefined) {
          setArgs({
            first: rows,
            after: data.products?.edges.at(-1)?.cursor ?? null,
            last: null,
            before: null
          })
          fetchMore({
            variables: {
              first: rows,
              after: data.products?.edges.at(-1)?.cursor ?? null,
              last: null,
              before: null
            },
          })
        }
      }

      return (
        <>
          <Button icon="pi pi-angle-right" style={{ marginLeft: '10px' }} disabled={!data?.products?.pageInfo.hasNextPage} onClick={pageNextHandler} />
        </>
      )
    }
  }

  return (<Paginator template={paginatorTemplate} first={first} rows={rows} totalRecords={120} onPageChange={(e) => onPageChange(e, 1)} className="justify-content-end" />)
}


export default MalikPaginator