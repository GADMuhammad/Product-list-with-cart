import { createContext, useEffect, useState } from "react";
import Products from "./components/Products";
import Cart from "./components/Cart";

export const UpdateProducts = createContext();

function App() {
  useEffect(() => {
    if (!localStorage.getItem("productsDetails")) {
      fetch("/data.json")
        .then((response) => response.json())
        .then((data) =>
          localStorage.setItem("productsDetails", JSON.stringify(data)),
        )
        .catch((error) => console.error("Error:", error)); // to handle errors
    }
  }, []);

  const allProducts = JSON.parse(localStorage.getItem("productsDetails")) || [];
  const [products, setProducts] = useState(allProducts);

  const updateProducts = (action, index, number) => {
    const updatedData = [...allProducts];

    switch (action) {
      case "change":
        {
          const theClickedProduct = allProducts[index]; // the product I wanna edit
          updatedData[index] = {
            ...theClickedProduct,
            amountOfProductInCart: number
              ? theClickedProduct.amountOfProductInCart + number
              : 0,
          };
        }
        break;
      case "reset":
        updatedData.forEach((product) => (product.amountOfProductInCart = 0));

        break;
    }

    localStorage.setItem("productsDetails", JSON.stringify(updatedData));
    setProducts(updatedData);
  };

  return (
    <UpdateProducts.Provider value={{ updateProducts }}>
      <main className="flex justify-between gap-10 max-md:mx-auto max-md:flex-col">
        <Products products={products} /> <Cart products={products} />
      </main>
    </UpdateProducts.Provider>
  );
}

export default App;
