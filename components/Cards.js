import Card from './Card'
import listado from './listado.json'
import cards from './cards.css'

const Cards = () => {
  return (
    <div className='cards'>
      {listado.map((item, i) => (
          <Card data={listado[i]} />
      ))}
    </div>
  );
}

export default Cards