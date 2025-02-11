import { useContext } from "react";
import { UpdateProducts } from "../App";
import { motion } from "framer-motion";

const styleOfHandleAmountBtn =
  "absolute flex -translate-y-10 left-1/2 -translate-x-1/2 items-center rounded-full py-2 border-2 border-solid hover:border-transparent bg-white text-rose900 transition-colors hover:bg-redMain";

export default function ProductsTemplate({ product, index }) {
  const { image, name, category, price, amountOfProductInCart } = product;

  const { updateProducts } = useContext(UpdateProducts);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: index % 2 === 0 ? -70 : 70 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ type: "spring" }}
      className="relative"
      name="product"
    >
      <figure
        className={`mb-4 overflow-hidden rounded-xl border-2 border-solid transition-colors duration-1000 ${amountOfProductInCart ? "border-redMain" : "border-transparent"}`}
      >
        <img
          className="hover:scale-115 transition-transform duration-1000"
          src={
            window.innerWidth <= 768
              ? image.mobile
              : window.innerWidth <= 1024
                ? image.tablet
                : image.desktop
          }
          alt={`Image of number ${index + 1} product`}
        />
      </figure>
      {amountOfProductInCart ? (
        <div
          className={`${styleOfHandleAmountBtn} w-44 justify-between gap-2 border-redMain px-4 font-semibold`}
        >
          <button
            onClick={() => updateProducts("change", index, -1)}
            className="flex items-center justify-center"
          >
            <ion-icon name="remove-circle-outline" />
          </button>
          {amountOfProductInCart}
          <button
            onClick={() => updateProducts("change", index, 1)}
            className="flex items-center justify-center"
          >
            <ion-icon name="add-circle-outline" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => updateProducts("change", index, 1)}
          className={`${styleOfHandleAmountBtn} w-44 justify-center gap-3 border-rose400 font-medium tracking-wide text-rose900 duration-500 hover:text-white`}
        >
          <ion-icon name="cart-outline" />
          Add to cart
        </button>
      )}
      <h6 className="text-gray">{category}</h6>
      <h2 className="text-xl font-semibold text-rose900">{name}</h2>
      <p className="font-semibold text-redMain">${price.toFixed(2)}</p>
    </motion.div>
  );
}
