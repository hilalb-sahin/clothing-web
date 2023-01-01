import './categories.styles.scss'
import CategoryItem from '../category-item/category-item-component';

const Directory = ({categories}) => {
    //store the categories


    return(
    //destructured category with {title}
    <div className='directory-container'>
      {categories.map((category)=> ( 
          <CategoryItem key={category.id} category = {category}/>
      ))}
    </div>
    )

}

export default Directory;