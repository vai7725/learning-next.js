import AddToCart from './AddToCart'
import style from './ProductCard.module.css'

export default function ProductCard() {
  return (
    <div className={style.card}>
      <AddToCart />
    </div>
  )
}
