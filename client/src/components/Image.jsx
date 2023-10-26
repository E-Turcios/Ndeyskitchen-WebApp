export default function Image(props) {
  return (
    <img
      className={props.className}
      alt={props.alt}
      src={require('../images/' + props.src)}
    />
  );
}
