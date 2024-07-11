import './table-name.css'

interface Props {
  name: string;
}

const TableName = ({name}: Props) => {
  return (
    <h4 className='table-name'>{name}</h4>
  )
}

export default TableName