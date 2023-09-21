import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@mui/material";
import { ProductDocumentTypes } from "../../types/Product";
import { db } from "../../../../db";
import { useLiveQuery } from "dexie-react-hooks";
import { useCart } from "@hooks/useCart";

const Product = ({ product }: { product: ProductDocumentTypes }) => {
  const { cart, incrementProduct, decrementProduct } = useCart();

  let qty = 0;

  const cartDB = useLiveQuery(() => db.cart.toArray());

  const cartItem = cart.find((item) => item._id === product._id);

  if (cartItem) {
    qty = cartItem.quantity;
  }

  return (
    <Card sx={{ width: 300, minWidth: 300 }}>
      <CardMedia component='img' height='140' image='https://via.placeholder.com/300.png/09f/fff' alt='image' />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {product.price} zł
        </Typography>
        {product.description && (
          <Typography variant='body2' color='text.secondary'>
            {product.description}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          onClick={() => {
            decrementProduct(product);
          }}
          disabled={qty === 0}
          size='large'
        >
          -
        </Button>
        <span>{qty}</span>
        <Button
          onClick={() => {
            incrementProduct(product);
          }}
          size='large'
        >
          +
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
