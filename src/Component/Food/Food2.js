import React, { useState, useEffect } from "react";
import "./Food2.css";
import "./Items.css";
import ItemMenu from "./ItemMenu";

const Food2 = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [gujaratiItems, setGujaratiItems] = useState([]);
  const [punjabiItems, setPunjabiItems] = useState([]);
  const [chineseItems, setChineseItems] = useState([]);
  const [rajeshtaniItems, setrajeshtaniItems] = useState([]);
  const [southItems, setsouthItems] = useState([]);
  const [drinkItems, setdrinkItems] = useState([]);
  const [pizzaItems, setpizzaItems] = useState([]);
  const [cakeItems, setCakeItems] = useState([]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/food/menu/");
      if (!response.ok) {
        throw new Error("Failed to fetch menu items");
      }
      const data = await response.json();
      setMenuItems(data);
      filterItemsByCategory(data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

const filterItemsByCategory = (data, cake) => {
    const gujarati = data.filter((item) => item.CategoryName === "Gujarati");
    setGujaratiItems(gujarati);

    const punjabi = data.filter((item) => item.CategoryName === "Punjabi");
    setPunjabiItems(punjabi);

    const chinese = data.filter((item) => item.CategoryName === "Chinese");
    setChineseItems(chinese);

    const rajeshtani = data.filter(
      (item) => item.CategoryName === "Rajeshthani"
    );
    setrajeshtaniItems(rajeshtani);

    const south = data.filter((item) => item.CategoryName === "South Indian");
    setsouthItems(south);

    const drink = data.filter((item) => item.CategoryName === "Drinks");
    setdrinkItems(drink);

    const pizza = data.filter((item) => item.CategoryName === "Pizzas");
    setpizzaItems(pizza);

    const cakes = data.filter((item) => item.CategoryName === "Cacks");
    setCakeItems(cakes);

  
  };

  return (
    <>
      <div className="Food2_back">
        <div className="food_box_align">
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                className="nav-link active"
                id="nav-gujarati-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-gujarati"
                type="button"
                role="tab"
                aria-controls="nav-gujarati"
                aria-selected="true"
              >
                Gujarati
              </button>
              <button
                className="nav-link"
                id="nav-punjabi-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-punjabi"
                type="button"
                role="tab"
                aria-controls="nav-punjabi"
                aria-selected="false"
              >
                Punjabi
              </button>
              <button
                className="nav-link"
                id="nav-china-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-china"
                type="button"
                role="tab"
                aria-controls="nav-china"
                aria-selected="false"
              >
                Chinese
              </button>

              <button
                className="nav-link"
                id="nav-raj-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-raj"
                type="button"
                role="tab"
                aria-controls="nav-raj"
                aria-selected="false"
              >
                Rajashthani
              </button>
              <button
                className="nav-link"
                id="nav-south-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-south"
                type="button"
                role="tab"
                aria-controls="nav-south"
                aria-selected="false"
              >
                South Indian
              </button>
              <button
                className="nav-link"
                id="nav-drink-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-drink"
                type="button"
                role="tab"
                aria-controls="nav-drink"
                aria-selected="false"
              >
                Drinks
              </button>
              <button
                className="nav-link"
                id="nav-pizza-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-pizza"
                type="button"
                role="tab"
                aria-controls="nav-pizza"
                aria-selected="false"
              >
                Pizzas
              </button>

              <button
  className="nav-link"
  id="nav-cake-tab"
  data-bs-toggle="tab"
  data-bs-target="#nav-cake" 
  type="button"
  role="tab"
  aria-controls="nav-cake"
  aria-selected="false"
>
  Cakes
</button>

              

             
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-gujarati"
              role="tabpanel"
              aria-labelledby="nav-gujarati-tab"
            >
              <div className="Items_list">
                {gujaratiItems.map((item, index) => (
                  <ItemMenu key={index} items={item} />
                ))}
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="nav-punjabi"
              role="tabpanel"
              aria-labelledby="nav-punjabi-tab"
            >
              <div className="Items_list">
                {punjabiItems.map((item, index) => (
                  <ItemMenu key={index} items={item} />
                ))}
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="nav-china"
              role="tabpanel"
              aria-labelledby="nav-china-tab"
            >
              <div className="Items_list">
                {chineseItems.map((item, index) => (
                  <ItemMenu key={index} items={item} />
                ))}
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="nav-raj"
              role="tabpanel"
              aria-labelledby="nav-raj-tab"
            >
              <div className="Items_list">
                {rajeshtaniItems.map((item, index) => (
                  <ItemMenu key={index} items={item} />
                ))}
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="nav-south"
              role="tabpanel"
              aria-labelledby="nav-south-tab"
            >
              <div className="Items_list">
                {southItems.map((item, index) => (
                  <ItemMenu key={index} items={item} />
                ))}
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="nav-drink"
              role="tabpanel"
              aria-labelledby="nav-drink-tab"
            >
              <div className="Items_list">
                {drinkItems.map((item, index) => (
                  <ItemMenu key={index} items={item} />
                ))}
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="nav-pizza"
              role="tabpanel"
              aria-labelledby="nav-pizza-tab"
            >
              <div className="Items_list">
                {pizzaItems.map((item, index) => (
                  <ItemMenu key={index} items={item} />
                ))}
              </div>
            </div>

            <div
  className="tab-pane fade"
  id="nav-cake"
  role="tabpanel"
  aria-labelledby="nav-cake-tab"
>
  <div className="Items_list">
  {cakeItems.map((item, index) => (
                  <ItemMenu key={index} items={item} />
                ))}
  </div>
</div>

           
          </div>
        </div>
      </div>
    </>
  );
};

export default Food2;
