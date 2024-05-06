// ProductCard.js
//organisms- The combination of molecules that work together or even with atoms that compose more elaborate interfaces.

function ProductCard({ product, onAddToCart }) {
  return (
    <div>
      <img src={product.imageUrl} alt={product.name} />
      <Title level={3}>{product.name}</Title>
      <p>${product.price}</p>
      <Button label="Add to Cart" onClick={() => onAddToCart(product)} />
    </div>
  );
}
