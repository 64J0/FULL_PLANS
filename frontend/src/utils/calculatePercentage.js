const calculatePercentage = (percentageArray) => {
  if (percentageArray.length === 0) return 0;

  let totalValue = 0;

  percentageArray.map((percentage) => {
    return (totalValue += percentage.statusPorcentagem);
  });

  const percentageFinal = totalValue / percentageArray.length;

  return percentageFinal;
};

export default calculatePercentage;
