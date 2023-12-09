export default function Image(props) {
  return (
    <img
      loading="lazy"
      className={props.className}
      alt={props.alt}
      src={require('../images/' + props.src)}
    />
  );
}
