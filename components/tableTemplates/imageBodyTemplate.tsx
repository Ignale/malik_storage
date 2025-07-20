import { Variation } from './../../types/appProps';
import Image from 'next/image';
import imgPlaceholder from '../../public/img/placeholder-800x800.png'

const imageBodyTemplate = (rowData: Variation) => {
  return <Image style={{ objectFit: 'cover' }} className="shadow-4" width={50} height={70} src={rowData.featuredImage ? rowData.featuredImage.node.sourceUrl : imgPlaceholder} alt={rowData.name} />;
};

export default imageBodyTemplate;