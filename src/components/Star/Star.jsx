const Star = ({ detailsProduct, none = true }) => {
  return (
    <p className='details__p'>
      <span className='details__rating'>
        {'★'.repeat(detailsProduct?.product_rating).padEnd(5, '☆')}
      </span>
      {/* {none && detailsProduct?.product_price} */}
    </p>
  );
};

export default Star;
