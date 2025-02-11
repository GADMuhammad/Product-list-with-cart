import ProductsTemplate from "./ProductTemplate";
import { motion } from "framer-motion";

export default function Products({ products }) {
  return (
    <section>
      <h1 className="mb-10 text-3xl font-bold tracking-wide">Desserts</h1>
      <motion.div
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.3 } },
        }}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-3 gap-6 max-one:grid-cols-2 max-two:grid-cols-1"
      >
        {products?.map((product, index) => (
          <ProductsTemplate
            key={product.name}
            product={product}
            index={index}
          />
        ))}
      </motion.div>
    </section>
  );
}
