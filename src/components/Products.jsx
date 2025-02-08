import ProductsTemplate from "./ProductTemplate";

export default function Products({ products }) {
  return (
    <section>
      <h1 className="mb-10 text-3xl font-bold tracking-wide">Desserts</h1>
      <div className="max-one:grid-cols-2 max-two:grid-cols-1 grid grid-cols-3 gap-6">
        {products?.map((product, index) => (
          <ProductsTemplate
            key={product.name}
            product={product}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
