import React from "react";

const MiniProductCard = ({
  product_id,
  product_name,
  image,
  productPrice,
  product_price,
  product_old_price,
  is_new,
  on_sale,
  brand,
  color,
  sizes,
}) => {
  return (
    <div>
      {brand.brand_name}---{color.color_value}---{product_name}
      {`\n`}
      ---{sizes.map((x) => x.size_value).join(",")}
      {`\n`}
      ---{product_price}
    </div>
  );
};

export default MiniProductCard;
