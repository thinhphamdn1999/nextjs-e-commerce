import { Product } from '@/types/products';

interface DetailProps {
  label: string;
  value: string | number;
}

const Detail = ({ label, value }: DetailProps) => (
  <div className="border-secondary/10 grid grid-cols-2 border-b py-4">
    <span className="text-primary">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

interface ProductDetailsTabProps {
  product: Product;
}

const ProductDetailsTab = ({ product }: ProductDetailsTabProps) => {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="space-y-1">
        <h3 className="mb-4 font-bold">Product Details</h3>
        <Detail label="Brand" value={product.brand} />
        <Detail label="SKU" value={product.sku} />
        <Detail label="Weight" value={`${product.weight} kg`} />
        <Detail
          label="Dimensions"
          value={`${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm`}
        />
      </div>

      <div className="space-y-1">
        <h3 className="mb-4 font-bold">Shipping Information</h3>
        <Detail label="Status" value={product.availabilityStatus} />
        <Detail label="Shipping" value={product.shippingInformation} />
        <Detail label="Min Order Qty" value={product.minimumOrderQuantity} />
        <Detail label="Return Policy" value={product.returnPolicy} />
      </div>

      <div className="space-y-1">
        <h3 className="mb-4 font-bold">Additional Info</h3>
        <Detail label="Category" value={product.category} />
        <Detail label="Tags" value={product.tags.join(', ')} />
        <Detail label="Warranty" value={product.warrantyInformation} />
        <Detail label="Stock" value={product.stock} />
      </div>
    </div>
  );
};

export default ProductDetailsTab;
