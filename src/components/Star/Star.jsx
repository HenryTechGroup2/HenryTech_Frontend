const Star = ({ detailsReviews, none = true }) => {
  return (
    <p className='details__p'>
      <span className='details__rating'>
        {'★'.repeat(Math.floor(detailsReviews)).padEnd(5, '☆')}
      </span>
    </p>
  );
};

export default Star;
