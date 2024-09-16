const Rank = ({username, rank}) => {
  return (
    <>
      <div className="white f3">{`${username}, your current rank is...`}</div>
      <div className="white f1">{`#${rank}`}</div>
    </>
  );
};

export default Rank;
