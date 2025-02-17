import { motion } from "framer-motion";
import { createPortal } from "react-dom";

function SuccessModal({ productsInCart, handleCloseModal }) {
  return createPortal(
    <motion.dialog
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="z-10 w-[42vw] select-none overflow-hidden rounded-xl bg-rose50 px-6 py-10 outline-none max-one:w-[55vw] max-two:w-[70vw] max-there:w-[90vw] max-md:px-4 max-sm:w-[98vw]"
      open layout
    >
      <img src="images/icon-order-confirmed.svg" alt="Order Confirmed Mark" />
      <h2 className="pb-2 pt-5 text-3xl font-bold tracking-wide">
        Order Confirmed
      </h2>
      <p className="pb-6 text-gray">We hope you enjoy your food!</p>

      <motion.div
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.05 } },
        }}
        initial="hidden"
        animate="visible"
        className="mx-auto flex h-fit flex-col justify-between rounded-xl bg-rose100 px-5 py-4 max-md:px-2"
      >
        {productsInCart.map(({ image, name, price, amountOfProductInCart }) => (
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.5 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ type: "spring" }}
            key={name}
            className="border-b-solid grid grid-cols-6 grid-rows-2 border-b-2 border-b-rose300 py-2"
          >
            <img
              src={image.thumbnail}
              alt="image thumbnail"
              className="row-span-2 h-16 w-16 rounded-xl"
            />
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
        ))}
        <div className="flex items-center justify-between pt-4">
          <h6 className="text-gray">Order Total</h6>
          <h3 className="text-2xl font-bold tracking-wide">
            $
            {productsInCart
              .reduce(
                (acc, cur) => acc + cur.price * cur.amountOfProductInCart,
                0,
              )
              .toFixed(2)}
          </h3>
        </div>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 700 }}
        className="mt-5 w-full rounded-full bg-redMain py-4 tracking-wide text-rose100"
        onClick={handleCloseModal}
      >
        Start a New Order
      </motion.button>
    </motion.dialog>,
    document.getElementById("modal"),
  );
}

export default SuccessModal;
