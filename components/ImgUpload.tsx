import { Toast } from 'primereact/toast';
import { FileUpload, ItemTemplateOptions, FileUploadSelectEvent, FileUploadHeaderTemplateOptions, FileUploadHandlerEvent } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { ProgressSpinner } from 'primereact/progressspinner';
import { FileImg } from '../types/appProps';
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { useRef, useState } from 'react';

export type UploadData = {
  id: number,
  src: string,
  alt_text: string,
}

type ImgUploadProps = {
  onUpload: (data: UploadData[]) => void
}



export default function ImgUpload({ onUpload }: ImgUploadProps) {

  const toast = useRef<Toast>(null);
  const [totalSize, setTotalSize] = useState(0)
  const [loading, setLoading] = useState(false)
  const [uploadData, setUploadData] = useState<UploadData[] | UploadData>([])
  const fileUploadRef = useRef<FileUpload>(null);

  const onTemplateSelect = (e: FileUploadSelectEvent) => {
    let _totalSize = totalSize;
    let files = e.files as FileImg[];
    Object.keys(files).forEach((key, index) => {
      _totalSize += files[index].size || 0;
    });

    setTotalSize(_totalSize);
  };

  const ImgUploadHandler = async (e: FileUploadHandlerEvent) => {
    let _totalSize = 0;
    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });
    setUploadData([])
    setTotalSize(_totalSize);

    let formData = new FormData();
    e.files.forEach((file) => {
      formData.append('file', file)
      formData.append('name', file.name)
    })
    try {
      setLoading(true)
      const response = await fetch(e.options.props.url!, {
        method: 'POST',
        body: formData
      }
      )
      if (response.ok) {
        const data = await response.json()

        setLoading(false)

        e.options.clear();

        onUpload(data.data)

        toast.current!.show({ severity: 'success', summary: 'Успех', detail: data.message });
      }
    } catch (err: any) {
      setLoading(false)
      toast.current!.show({ severity: 'error', summary: 'Неудача', detail: err.message });
    }
  }



  const onTemplateRemove = (file: FileImg, callback: ItemTemplateOptions['onRemove'], e: React.SyntheticEvent) => {
    setTotalSize(totalSize - file.size!);
    callback(e);
  };

  const onTemplateClear: () => void = () => {
    setTotalSize(0);
  };
  const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 100000;
    const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

    return (
      <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
        {chooseButton}
        {uploadButton}
        {cancelButton}
        {loading && <ProgressSpinner style={{ width: '40px', height: '40px' }} />}
        <div className="flex align-items-center gap-3 ml-auto">
          <span>{formatedValue} / 5 MB</span>
          <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
        </div>
      </div>
    );
  };

  const itemTemplate = (file: FileImg, props: ItemTemplateOptions) => {
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: '40%' }}>
          <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
          <span className="flex flex-column text-left ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
        <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={(e: React.SyntheticEvent) => onTemplateRemove(file, props.onRemove, e)} />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex align-items-center flex-column">
        <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
        <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
          Перетащите изображения сюда или нажмите на кнопку выбора
        </span>
      </div>
    );
  };

  const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
  const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
  const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

  return (
    <div>
      <Toast ref={toast}></Toast>
      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <FileUpload ref={fileUploadRef} name="uploadImages" url='/api/uploadImg' multiple accept="image/*" maxFileSize={10000000} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
        headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
        chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} customUpload uploadHandler={ImgUploadHandler} />
    </div>
  )


}