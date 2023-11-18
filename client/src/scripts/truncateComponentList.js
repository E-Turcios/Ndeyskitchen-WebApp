export default function truncateComponentList(components, maxLength) {
  if (components.length > maxLength)
    return components.slice(0, maxLength) + '...';
  return components;
}
