import './category-item-style.scss'

//this component returns the category item component
//returns background image, and title
//receives the prop category, that is all of the categories
const CategoryItem = ({ category }) => {
    const {imageUrl, title,id} = category;
    return (
    <div key = {category.id}className='category-container'>
      <div 
        className='background-image' 
        style={{
        backgroundImage: `url(${imageUrl})`,
      }}
      />
      <div className='category-body-container'>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
    
    )
    }



export default CategoryItem