import { createContext, useEffect, useState } from "react";
import Products from "./components/Products";
import Cart from "./components/Cart";

export const UpdateProducts = createContext();

function App() {
  const [products, setProducts] = useState(
    () => JSON.parse(localStorage.getItem("productsDetails")) || [],
  );

  useEffect(() => {
    if (!localStorage.getItem("productsDetails")) {
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

  const updateProducts = (action, index, number) => {
    setProducts((prevProducts) => {
      const updatedData = [...prevProducts];

      switch (action) {
        case "change":
          {
            const theClickedProduct = updatedData[index]; // the product I wanna edit
            updatedData[index] = {
              ...theClickedProduct,
              amountOfProductInCart: number
                ? theClickedProduct.amountOfProductInCart + number
                : 0,
            };
          }
          break;
        case "reset":
          updatedData.forEach(
            (product) => (product.amountOfProductInCart = 0),
          );
          break;
      }

      return updatedData;
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
