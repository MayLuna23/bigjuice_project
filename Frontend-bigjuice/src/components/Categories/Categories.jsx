import "./Categories.css"
export const Categories = ({handleCategory, jugos, otros}) => {
  return (
    <div className="main-categories-container">
        <div className="categories-container">
            <p onClick={() => handleCategory(jugos)}>JUGOS</p>
            <p onClick={() => handleCategory(otros)}>OTROS</p>
        </div>
    </div>
  )
};