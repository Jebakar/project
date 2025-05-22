import SalesAnalyticsChart from "./SalesAnalyticsChart";
import WorldMap from "./WorldMap";

function Dashboard() {
  return (
    <div className="content" style={{ position: "relative", left: "0px" }}>
      <div className="page-header">
        <div className="container-fluid d-flex">
          <h1>Dashboard</h1>
          <ul className="breadcrumb ms-3">
            <li>
              <a href="" style={{ textDecoration: "none" }}>
                Home
              </a>
            </li>
            <li>
              <a href="" style={{ textDecoration: "none" }}>
                Dashboard
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          {/* Total Orders */}
          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="tile tile-primary">
              <div className="tile-heading">
                Total Orders
                <span className="pull-right">
                  <i className="fa fa-caret-down"></i>
                </span>
              </div>
              <div className="tile-body">
                <i className="fa fa-shopping-cart"></i>
                <h2 className="pull-right"></h2>
              </div>
              <div className="tile-footer">
                <a href="" style={{ textDecoration: "none", fontSize: "13px" }}>
                  View more...
                </a>
              </div>
            </div>
          </div>

          {/* Total Sales */}
          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="tile tile-primary">
              <div className="tile-heading">
                Total Sales
                <span className="pull-right">
                  <i className="fa fa-caret-up"></i>
                </span>
              </div>
              <div className="tile-body">
                <i className="fa fa-credit-card"></i>
                <h2 className="pull-right"></h2>
              </div>
              <div className="tile-footer">
                <a href="" style={{ textDecoration: "none", fontSize: "13px" }}>
                  View more...
                </a>
              </div>
            </div>
          </div>

          {/* Total Customers */}
          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="tile tile-primary">
              <div className="tile-heading">
                Total Customers
                <span className="pull-right">
                  <i className="fa fa-caret-up"></i>
                </span>
              </div>
              <div className="tile-body">
                <i className="fa fa-user"></i>
                <h2 className="pull-right"></h2>
              </div>
              <div className="tile-footer">
                <a href="" style={{ textDecoration: "none", fontSize: "13px" }}>
                  View more...
                </a>
              </div>
            </div>
          </div>

          {/* People Online */}
          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="tile tile-primary">
              <div className="tile-heading">People Online</div>
              <div className="tile-body">
                <i className="fa fa-users"></i>
                <h2 className="pull-right"></h2>
              </div>
              <div className="tile-footer">
                <a href="" style={{ textDecoration: "none", fontSize: "13px" }}>
                  View more...
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="row">
          {/* World Map */}
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="panel panel-default">
              <div
                className="panel-heading"
                style={{ marginBottom: "0px", padding: "20px" }}
              >
                <h3 className="panel-title">
                  <i className="fa fa-globe"></i> World Map
                </h3>
              </div>
              {/* <div className="panel-body"> */}
              <WorldMap />
              {/* </div> */}
            </div>
          </div>

          {/* Sales Analytics */}
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="panel panel-default">
              <div className="panel-heading d-flex justify-content-between align-items-center">
                <h3 className="panel-title">
                  <i className="fa fa-bar-chart-o"></i> Sales Analytics
                </h3>

                <div className="dropdown" style={{ left: "30%" }}> 
                  <button
                    className="btn btn-default dropdown-toggle" 
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-calendar"></i> <i className="caret"></i> 
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li>
                      <a className="dropdown-item" href="day">
                        Today
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="week"> 
                        Week
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item active" href="month"> 
                        Month
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="year"> 
                        Year
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="panel-body">
                {/* <SalesAnalyticsChart /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="panel panel-default">
                   <div class="panel-heading" style={{height:"200px"}}>
                     <h3 class="panel-title"><i class="fa fa-calendar"></i> Recent Activity</h3>
                  </div>
                </div>
            </div>
            <div className="col-lg-8 col-md-12 col-sm-12">
                <div className="panel panel-default"> 
                    <div class="panel-heading"> 
                      <h3 class="panel-title"><i class="fa fa-shopping-cart"></i> Latest Orders</h3>
                   </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
