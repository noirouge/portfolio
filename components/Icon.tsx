import Tag from "@/types/Tag"
import Image from "next/image"

type Props = {
    tag: Tag;
    width: number;
    height: number;
}

export default function Icon({tag,width,height}:Props) {
  return (
   <Image src={`/icons/${tag}.svg`} alt={tag} width={width} height={height} />
  )
}
