import { createContext, useEffect, useState } from "react";
import Products from "./components/Products";
import Cart from "./components/Cart";

export const UpdateProducts = createContext();

const isValidCache = (data) => Array.isArray(data) && data.length > 0 && data.every((product) => "id" in product);

function App() {
  const [products, setProducts] = useState(() => {
    const cached = JSON.parse(localStorage.getItem("productsDetails"));
    return isValidCache(cached) ? cached : [];
  });

  useEffect(() => {
    const cached = JSON.parse(localStorage.getItem("productsDetails"));
    if (!isValidCache(cached)) {
      fetch("/data.json")
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error("Error:", error)); // to handle errors
    }
  }, []);

  useEffect(() => {
    if (products.length) {
      localStorage.setItem("productsDetails", JSON.stringify(products));
    }
  }, [products]);

  const updateProducts = (action, id, number) => {
    setProducts((prevProducts) => {
      switch (action) {
        case "change":
          return prevProducts.map((product) =>
            product.id === id
              ? {
                  ...product,
                  amountOfProductInCart: number ? product.amountOfProductInCart + number : 0,
                }
              : product,
          );
        case "reset":
          return prevProducts.map((product) => ({
            ...product,
            amountOfProductInCart: 0,
          }));
        default:
          return prevProducts;
      }
    });
  };

  return (
    <UpdateProducts.Provider value={{ updateProducts }}>
      <main className="flex justify-between gap-4 max-md:mx-auto max-md:flex-col">
        {products ? (
          <>
            <Products products={products} />
            <Cart products={products} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </UpdateProducts.Provider>
  );
}

export default App;
