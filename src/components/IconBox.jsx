export function IconBox({ heading, content, className }) {
  const styles = `flex flex-col ${className}`;

  return (
    <div className={styles}>
      {heading}
      <p>{content}</p>
    </div>
  );
}
