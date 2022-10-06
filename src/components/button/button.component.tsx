import './button.styles.css';

export default function ButtonComponent(props: any) {
  return <button className="btn" type="button" {...props} />;
}
