import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@mui/material";
import { useAppDispatch } from "@app/store";
import { useProduct } from "@hooks/useProduct";
import { decrementProduct, incrementProduct } from "../slicers/productsSlice";
import { ProductDocumentTypes } from "../models/Product";

const Product = ({ product }: { product: ProductDocumentTypes }) => {
  const { cart } = useProduct();
  const dispatch = useAppDispatch();

  let qty = 0;

  const cartItem = cart.find((item) => item._id === product._id);

  if (cartItem) {
    qty = cartItem.quantity;
  }

  return (
    <Card sx={{ width: 300, minWidth: 300 }}>
      <CardMedia component='img' height='140' image='https://via.placeholder.com/300.png/09f/fff' alt='image' />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          $ {product.price}
        </Typography>
        {product.description && (
          <Typography variant='body2' color='text.secondary'>
            {product.description}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          onClick={async () => {
            dispatch(decrementProduct(product));
          }}
          disabled={qty === 0}
          size='large'
        >
          -
        </Button>
        <span>{qty}</span>
        <Button
          onClick={async () => {
            dispatch(incrementProduct(product));
            await addToCartIDB(product);
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
