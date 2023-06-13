export function Container({ children, as: Tag = "div", className }) {
  let styles = "container max-w-screen-xl";
  if (className) styles += ` ${className}`;

  return <Tag className={styles}>{children}</Tag>;
}
