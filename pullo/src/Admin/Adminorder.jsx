import Adminheader from "./Adminheader"
import Navigation from "./Navigation"
import OrderTable from "./Ordertable"

function Adminorder(){
    return(
        <>
        <Adminheader />
        <div style={{display:"flex"}}>
            <Navigation />
            <div id="db" style={{padding: "20px", flex: 1 }}>
                <div className="container-fluid">
                      <h2 style={{ fontWeight: "300", color: "#4c4d5a", display: "inline-block" }}>
                        Orders
                    </h2>
                    
                    <ul
              className="breadcrumb ms-3"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                listStyle: "none",
                padding: 0,
                marginTop: "10px",
                color: "#007bff",
              }}
            >
              <li>
                <a href="#" style={{ textDecoration: "none", color: "#999999" }}>
                  Home
                </a>
              </li>
              <li>
                <a href="#" style={{ textDecoration: "none", color: "#007bff" }}>
                 Orders
                </a>
              </li>
            </ul>
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        <i className="fa fa-list"></i> Order List
                    </h3>
                </div>
                <div className="panel-body">
                    <OrderTable />
                </div>
            </div>

                </div>
            </div>
        </div>
        </>
    )
}
export default Adminorder