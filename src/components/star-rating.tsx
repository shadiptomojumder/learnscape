import Image from "next/image";
import Star from "../../public/star.svg"

export function StarRating({ rating }:any) {
  const stars = new Array(rating).fill(0);

  return (
    <>
      {stars.map((star, index) => (
        <Image key={index} src={Star} width={20} height={20} alt="star" />
      ))}
    </>
  );
}