import { useState } from "react";
import { motion } from "framer-motion";

export default function CartItemRow({ image, name, price, amountOfProductInCart }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: 1 },
      }}
      transition={{ type: "spring" }}
      className="border-b-solid grid grid-cols-6 grid-rows-2 border-b-2 border-b-rose300 py-2"
    >
      <div className="relative row-span-2 h-16 w-16">
        {!imageLoaded && (
          <div className="absolute inset-0 h-16 w-16 animate-pulse rounded-xl bg-rose300" />
        )}
        <motion.img
          onLoad={() => setImageLoaded(true)}
          initial={false}
          animate={
            imageLoaded
              ? { opacity: 1, scale: 1, rotate: 0 }
              : { opacity: 0, scale: 0, rotate: -25 }
          }
          transition={{ type: "spring", stiffness: 260, damping: 15 }}
          src={image.thumbnail}
          alt="image thumbnail"
          className="absolute inset-0 h-16 w-16 rounded-xl object-cover"
        />
      </div>
      <h3 className="max-sm: col-span-4 font-medium max-sm:self-center max-sm:justify-self-center">
        {name}
      </h3>
      <span className="col-span-1 row-span-2 ml-auto self-center font-semibold tracking-wide text-rose900 max-sm:self-end">
        ${(amountOfProductInCart * price).toFixed(2)}
      </span>
      <span className="font-semibold text-redMain max-sm:justify-self-center">
        {amountOfProductInCart}x
      </span>
      <span className="text-gray max-sm:justify-self-center">
        ${price.toFixed(2)}
      </span>
    </motion.div>
  );
}
