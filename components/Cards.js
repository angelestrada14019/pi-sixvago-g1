import Card from './Card'
import listado from './listado.json'
import './cards.css'

const Cards = () => {
  return (
    <div className='cards'>
      {listado.map((item, i) => (
        <Card data={listado[i]} key={[i]}/>
      ))}
    </div>
  );
}

export default Cards