function EmptyList(props) {
  const { heading, text } = props;
  return (
    <>
      <h2>{heading || "No Data Yet.."}</h2>
    </>
  );
}
export default EmptyList;
