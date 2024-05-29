import React from "react";
import "./Dashboard.css";
import Chartss from "./Chartss";

const Dashboard = () => {
  return (
    <>
      <div className="Admin_Dash">
        <div className="Admin1">
          <div className="Adminbox">
            <div className="Adminbox_img">
              <img src="./Img/Oeder_Resived.ico" alt="Food_Item" />
            </div>
            <h4>Order Resived</h4>
            <h1>14</h1>
          </div>

          <div className="Adminbox">
            <div className="Adminbox_img">
              <img src="./Img/Order_Delivered.png" alt="Delivered" />
            </div>
            <h4>Order Delivered</h4>
            <h1>0</h1>
          </div>

          <div className="Adminbox">
            <div className="Adminbox_img">
              <img src="./Img/Customers.png" alt="Food_Item" />
            </div>
            <h4>Customers</h4>
            <h1>1</h1>
          </div>

          <div className="Adminbox">
            <div className="Adminbox_img">
              <img src="./Img/Earning.png" alt="Food_Item" />
            </div>
            <h4>Total Earning</h4>
            <h1>0</h1>
          </div>
        </div>

        <div className="Admin2">
          <div className="Adminbox2">
            <h2>Orders</h2>
            <div className="adminbox22 Orders_Item">
              <table id="tblSample">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Customer Name</th>
                    <th>Food</th>
                    <th>Order States</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Veer</td>
                    <td>Burger</td>
                    <td>Panndig</td>
                    <td>
                    <button>Edit</button>
                    </td>
                  </tr>

                  <tr>
                    <td>2</td>
                    <td>Veer</td>
                    <td>Burger</td>
                    <td>Panndig</td>
                    <td>
                    <button>Edit</button>
                    </td>
                  </tr>


                  <tr>
                    <td>3</td>
                    <td>Veer</td>
                    <td>Burger</td>
                    <td>Panndig</td>
                    <td>
                    <button>Edit</button>
                    </td>
                  </tr>


                  <tr>
                    <td>4</td>
                    <td>Veer</td>
                    <td>Burger</td>
                    <td>Panndig</td>
                    <td>
                    <button>Edit</button>
                    </td>
                  </tr>

                  <tr>
                    <td>5</td>
                    <td>Veer</td>
                    <td>Burger</td>
                    <td>Panndig</td>
                    <td>
                    <button>Edit</button>
                    </td>
                  </tr>


                  <tr>
                    <td>6</td>
                    <td>Veer</td>
                    <td>Burger</td>
                    <td>Panndig</td>
                    <td>
                    <button>Edit</button>
                    </td>
                  </tr>


                  <tr>
                    <td>7</td>
                    <td>Veer</td>
                    <td>Burger</td>
                    <td>Panndig</td>
                    <td>
                    <button>Edit</button>
                    </td>
                  </tr>

                  <tr>
                    <td>8</td>
                    <td>Veer</td>
                    <td>Burger</td>
                    <td>Panndig</td>
                    <td>
                    <button>Edit</button>
                    </td>
                  </tr>

                  <tr>
                    <td>8</td>
                    <td>Veer</td>
                    <td>Burger</td>
                    <td>Panndig</td>
                    <td>
                    <button>Edit</button>
                    </td>
                  </tr>

                  <tr>
                    <td>10</td>
                    <td>Veer</td>
                    <td>Burger</td>
                    <td>Panndig</td>
                    <td>
                    <button>Edit</button>
                    </td>
                  </tr>


                  <tr>
                    <td>11</td>
                    <td>Veer</td>
                    <td>Burger</td>
                    <td>Panndig</td>
                    <td>
                    <button>Edit</button>
                    </td>
                  </tr>

                  <tr>
                    <td>12</td>
                    <td>Veer</td>
                    <td>Burger</td>
                    <td>Panndig</td>
                    <td>
                    <button>Edit</button>
                    </td>
                  </tr>


                  <tr>
                    <td>13</td>
                    <td>Veer</td>
                    <td>Burger</td>
                    <td>Panndig</td>
                    <td>
                    <button>Edit</button>
                    </td>
                  </tr>

                  <tr>
                    <td>14</td>
                    <td>Veer</td>
                    <td>Burger</td>
                    <td>Panndig</td>
                    <td>
                    <button>Edit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="Adminbox2">
            <h2>Earning Graph</h2>
            <div className="adminbox22 Earning_Graph">
              <Chartss/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
