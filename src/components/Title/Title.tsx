import './title.css'

interface Props {
  text: string;
  className?: string;
}

const Title = ({text, className}: Props) => {
  return (
    <h1 className={`title ${className}`}>{text}</h1>
  )
}

export default Title