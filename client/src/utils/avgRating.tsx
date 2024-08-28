interface Review {
  rating: number;
}

const calculateAvgRating = (reviews: Review[] = []) => {
  const totalRating = reviews.reduce((acc: number, item: Review) => acc + item.rating, 0);

  const avgRating = totalRating === 0 ? "" : totalRating === 1 ? totalRating : (totalRating / reviews.length).toFixed(1);

  return {
    totalRating,
    avgRating,
  };
};

export default calculateAvgRating;
