import { Variation } from "@/types/appProps";
import createSku from "@/actions/createSku";


type Props = {
  productId?: string;
  variations: Variation[];
  toast?: React.RefObject<any>;
}

function CreateSkuButton({ productId, variations, toast }: Props) {

  return (
    <div>CreateSkuButton</div>
  )
}

export default CreateSkuButton