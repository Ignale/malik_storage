import { useState } from 'react'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog';
import { UploadData, mediaItem, mediaItems } from '@/types/appProps';
import { gql, useQuery } from '@apollo/client'
import { ProgressSpinner } from 'primereact/progressspinner';
import { Paginator, PaginatorPrevPageLinkOptions, PaginatorRowsPerPageDropdownOptions } from 'primereact/paginator';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { devices } from '@/lib/mediaQueries';
import styled from '@emotion/styled';


type ImgChoseProps = {
  onChoose: (data: UploadData[]) => void
}

function ImgChoose({ onChoose }: ImgChoseProps) {

  const [visible, setVisible] = useState(false)
  const [rows, setRows] = useState(20)
  const [first, setFirst] = useState(20);
  const [endCursor, setEndCursor] = useState('')
  const [startCursor, setStartCursor] = useState('')
  const [chosenImgs, setChosenImgs] = useState<mediaItem[]>([])

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
      setStartCursor(data.mediaItems.pageInfo.startCursor)
    },
  })

  const paginateTemplate = {
    layout: 'RowsPerPageDropdown PrevPageLink NextPageLink',
    RowsPerPageDropdown: (options: PaginatorRowsPerPageDropdownOptions) => {
      const dropdownOptions = [
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 50, value: 50 },
        { label: 80, value: 80 }
      ];
      const itemsQuantityChange = (e: DropdownChangeEvent) => {

        setRows(e.value)
      }
      return (
        <>
          <span className="mx-1" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
            Количество изображений на странице:{' '}
          </span>
          <Dropdown className='mr-3 mt-3' value={rows} options={dropdownOptions} onChange={itemsQuantityChange} />
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
            before: startCursor
          }, updateQuery(prev, { fetchMoreResult }) {
            if (!fetchMoreResult) return prev;
            return Object.assign({}, prev, {
              mediaItems: {
                nodes: [...fetchMoreResult.mediaItems.nodes],
                pageInfo: fetchMoreResult.mediaItems.pageInfo
              }
            })
          }
        })
      }
      return (
        <>
          <Button icon="pi pi-angle-left" className="mr-10 mt-3" onClick={pagePrevHandler} disabled={!data?.mediaItems.pageInfo.hasPreviousPage} />
        </>
      )
    },
    NextPageLink: () => {
      const pageNextHandler = () => {
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
                nodes: [...fetchMoreResult.mediaItems.nodes],
                pageInfo: fetchMoreResult.mediaItems.pageInfo
              }
            })
          }
        })
      }

      return (
        <>
          <Button icon="pi pi-angle-right" className="mt-3" style={{ marginLeft: '10px' }} onClick={pageNextHandler} disabled={!data?.mediaItems.pageInfo.hasNextPage} />
        </>
      )
    }
  }

  const sendChosenImgHandler = () => {
    const chosenImgsData = chosenImgs.map((img) => {
      return {
        id: img.databaseId,
        alt_text: '',
        src: img.mediaItemUrl
      }
    })
    onChoose(chosenImgsData)
    setVisible(false)
  }

  const footerContent = (
    <div style={{ paddingTop: '20px' }} >
      <Button icon="pi pi-times" className="p-button-text" label='Отмена' onClick={() => { setVisible(false); setChosenImgs([]); onChoose([]) }} />
      <Button icon="pi pi-check" label='Выбрать' onClick={sendChosenImgHandler} />
    </div>
  )
  const chooseImgHandler = (e: React.SyntheticEvent, item: mediaItem) => {
    let index = chosenImgs.findIndex((img) => img.id === item.id)

    if (index !== -1) {
      setChosenImgs((prev) => {
        const newImgArr = [...prev]
        newImgArr.splice(index, 1)
        return newImgArr
      })
      return
    }
    setChosenImgs((prev) => [...prev, item])
  }




  return (
    <div className='my-3' >
      <Button label='Или выберите изображения' onClick={() => setVisible(true)} />
      <MalikDialog visible={visible} footer={footerContent} onHide={() => setVisible(false)}>
        <h1 >Выберите изображения</h1>
        <div className='flex flex-wrap'>
          {loading && <div style={{ width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ProgressSpinner /></div>}
          {!loading && data?.mediaItems.nodes.map((item: mediaItem) => {
            let chosen = chosenImgs.find((img) => img.id === item.id)
            if (item.mediaItemUrl.endsWith('.mov') || item.mediaItemUrl.endsWith('.mp4')) return (
              <div style={{ width: '100px', height: '100px', border: '1px solid #aaa', display: 'flex', alignItems: 'center', justifyContent: 'center' }} key={item.id} className='m-2'>
                <p>Видео</p>
              </div>
            )
            return (
              <div onClick={(e) => chooseImgHandler(e, item)} style={{
                padding: '5px', border: `3px solid ${chosen ? '#6366F1' : 'transparent'}`, borderRadius: '10px'
              }} key={item.id} className='m-2'>
                <img width={100} height={100} style={{ objectFit: 'cover', }} src={item.sourceUrl} alt={item.mediaItemUrl} />
              </div>
            )
          })}
        </div>
        <Paginator template={paginateTemplate} first={first} rows={rows} totalRecords={1200} className="justify-content-start" />

      </MalikDialog>
    </div >
  )
}

export default ImgChoose

const MalikDialog = styled(Dialog)({
  width: '80vw',
  [devices.mobileL]: {
    width: '100vw',
    height: '100%',
    h1: {
      fontSize: '1.5rem'
    },
    img: {
      width: '50px',
      height: '50px'
    },
    button: {
      span: {
        fontSize: '0.8rem'
      }
    }
  }
})