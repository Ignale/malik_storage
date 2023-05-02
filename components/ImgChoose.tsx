import { useState } from 'react'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog';
import { UploadData, mediaItem, mediaItems } from '@/types/appProps';
import { gql, useQuery } from '@apollo/client'
import { Paginator, PaginatorPrevPageLinkOptions, PaginatorNextPageLinkOptions, PaginatorRowsPerPageDropdownOptions, PaginatorPageChangeEvent } from 'primereact/paginator';
import { Dropdown } from 'primereact/dropdown';


type ImgChoseProps = {
  onChoose: (data: UploadData[]) => void
}

function ImgChoose({ onChoose }: ImgChoseProps) {

  const [visible, setVisible] = useState(false)
  const [rows, setRows] = useState(20)
  const [first, setFirst] = useState(20);
  const [endCursor, setEndCursor] = useState('')

  const { data, loading, error, fetchMore } = useQuery<mediaItems>(gql`
      query getImg($first: Int, $after: String, $last: Int, $before: String) {
    mediaItems(first: $first, after: $after, last: $last, before: $before) {
      nodes {
        databaseId
        id
        mediaItemUrl
        sourceUrl(size: MEDIUM)
      }
      pageInfo {
      hasNextPage
      endCursor
      startCursor
      hasPreviousPage
    }
    }
  }`, {
    variables: { first: rows, after: null, last: null, before: null }, onCompleted(data) {
      setEndCursor(data.mediaItems.pageInfo.endCursor)
    },
  })

  const onPageChange = (e: PaginatorPageChangeEvent) => {
    console.log(e)
    console.log(endCursor)
    fetchMore({
      variables: {
        first: rows,
        after: endCursor,
        last: null,
        before: null
      }, updateQuery(prev, { fetchMoreResult }) {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          mediaItems: {
            nodes: [...prev.mediaItems.nodes, ...fetchMoreResult.mediaItems.nodes],
            pageInfo: fetchMoreResult.mediaItems.pageInfo
          }
        })
      }
    })
  };

  const paginateTemplate = {
    layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
    RowsPerPageDropdown: (options: PaginatorRowsPerPageDropdownOptions) => {
      const dropdownOptions = [
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 50, value: 50 },
        { label: 80, value: 80 }
      ];

      return (
        <>
          <span className="mx-1" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
            Items per page:{' '}
          </span>
          <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} />
        </>
      );
    },
    PrevPageLink: (options: PaginatorPrevPageLinkOptions) => {
      return (
        <>
          <Button icon="pi pi-angle-left" className="mr-10" onClick={options.onClick} disabled={!data?.mediaItems.pageInfo.hasPreviousPage} />
        </>
      )
    },
    NextPageLink: (options: PaginatorNextPageLinkOptions) => {
      return (
        <>
          <Button icon="pi pi-angle-right" style={{ marginLeft: '10px' }} onClick={options.onClick} disabled={!data?.mediaItems.pageInfo.hasNextPage} />
        </>
      )
    }
  }



  return (
    <div className='my-3' >
      <Button label='или выберите изображения' onClick={() => setVisible(true)} />
      <Dialog visible={visible} onHide={() => setVisible(false)}>
        <h1>Выберите изображения</h1>
        <div className='flex flex-wrap'>
          {loading && <div>Загрузка...</div>}
          {!loading && data?.mediaItems.nodes.map((item: mediaItem) => {
            return (
              <div key={item.id} className='m-2'>
                <img width={100} height={100} style={{ objectFit: 'cover', }} src={item.sourceUrl} alt={item.mediaItemUrl} />
              </div>
            )
          })}
        </div>
        <Paginator template={paginateTemplate} first={first} rows={rows} totalRecords={1200} onPageChange={(e: PaginatorPageChangeEvent) => onPageChange(e)} className="justify-content-start" />

      </Dialog>
    </div >
  )
}

export default ImgChoose