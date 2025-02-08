import { useContext, useState } from "react";
import { UpdateProducts } from "../App";
import SuccessModal from "./SuccessModal";
import { AnimatePresence, motion } from "framer-motion";
import { Flip, toast, ToastContainer } from "react-toastify";

export default function Cart({ products }) {
  const productsInCart = products?.filter(
    (product) => product.amountOfProductInCart,
  );

  const { updateProducts } = useContext(UpdateProducts);
  const [dialogCase, setDialogCase] = useState(false);

  const totalPrice = productsInCart
    ?.reduce((acc, cur) => acc + cur.price * cur.amountOfProductInCart, 0)
    .toFixed(2);

  const notify = () =>
    toast.success("Congratulation! Have a nice time with your desserts.", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Flip,
    });

  const handleOpenModal = () => {
    setDialogCase(true);
    window.scrollTo(0, 0);
  };

  const handleCloseModal = () => {
    setDialogCase(false);
    updateProducts("reset");
    window.scrollTo(0, 0);
    setTimeout(() => {
      notify();
    }, 650);
  };

  return (
    <>
      <AnimatePresence>
        {dialogCase && (
          <SuccessModal
            productsInCart={productsInCart}
            handleCloseModal={handleCloseModal}
          />
        )}
      </AnimatePresence>
      <ToastContainer />
      <motion.section
        layout
        className="h-fit w-[37rem] rounded-xl bg-white px-4 py-5 max-md:w-full max-md:px-4"
      >
        <h2 className="text-2xl font-semibold tracking-wide text-redMain">
          Your Cart ({productsInCart?.length})
        </h2>

        {productsInCart?.length ? (
          <>
            <AnimatePresence>
              {productsInCart.map(({ name, price, amountOfProductInCart }) => (
                <motion.div
                  transition={{ type: "spring", stiffness: 325 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { type: "tween" } }}
                  key={name}
                  className="border-b-solid grid grid-cols-5 border-b-2 border-b-rose100 pb-2 pr-1"
                >
                  <h3 className="col-span-5 mb-1 pt-4 font-medium">{name}</h3>
                  <span className="font-semibold text-redMain">
                    {amountOfProductInCart}x
                  </span>
                  <span className="text-gray">${price.toFixed(2)}</span>
                  <span className="font-semibold tracking-wide text-gray">
                    ${(amountOfProductInCart * price).toFixed(2)}
                  </span>
                  <button
                    onClick={() =>
                      updateProducts(
                        "change",
                        products.findIndex((product) => product.name === name),
                        0,
                      )
                    }
                    className="col-span-2 my-auto ml-auto"
                  >
                    <ion-icon name="close-circle-outline" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            <div className="mt-5 flex justify-between">
              <h6 className="text-gray">Order Total</h6>
              <motion.h3
                key={totalPrice}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold tracking-wide text-rose900"
              >
                ${totalPrice}
              </motion.h3>
            </div>
            <div className="mx-auto mt-5 flex gap-2 rounded-xl bg-rose100 px-5 py-4">
              <img src="images/icon-carbon-neutral.svg" />
              <p>
                This is a{" "}
                <span className="font-semibold tracking-wide">
                  carbon-neutral
                </span>{" "}
                delivery
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 700 }}
              onClick={handleOpenModal}
              className="mt-5 w-full rounded-full bg-redMain py-4 tracking-wide text-rose100"
            >
              Confirm Order
            </motion.button>
          </>
        ) : (
          <>
            <img
              className="mx-auto mb-4 mt-8 animate-opacity"
              src="images/illustration-empty-cart.svg"
              alt="illustration for empty cart"
            />
            <p className="mb-4 animate-opacity text-center font-medium tracking-wide text-rose500">
              Your added items will appear hear
            </p>
          </>
        )}
      </motion.section>
    </>
  );
}
