function EmptyList(props) {
  const { heading, text } = props;
  return (
    <>
      <h4>{heading || "No Data Yet.."}</h4>
      <p>{text || "Data will appear here when it is added"}</p>
    </>
  );
}
export default EmptyList;
