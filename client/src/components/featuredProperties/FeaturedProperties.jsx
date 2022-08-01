import "./featuredProperties.css";
import { useFetch } from "../../Hooks/useFetch";

const FeaturedProperties = () => {

  const { data, loading, error } = useFetch("/hotels/?featured=true&limit=4")



  return (
    <div className="fp">
      {data.length > 0 ?
        data.map((data, i) => (
          <div className="fpItem" key={data._id}>
            <img
              src={data.photos[0]}
              alt=""
              className="fpImg"
            />
            <span className="fpName">{data.name}</span>
            <span className="fpCity">{data.city}</span>
            <span className="fpPrice">Starting from ₹{data.cheapestPrice}</span>
            <div className="fpRating">
              <button>8.9</button>
              <span>Excellent</span>
            </div>
          </div>)
        ) : "Loading"}

    </div>
  );
};

export default FeaturedProperties;
