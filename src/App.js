import { useCallback, useEffect, useState } from "react";
import WebHandler from "./handler/WEB_HANDLER";
import "./App.css";
import Accordion from "./components/Accordion";
function App() {
  const [city, setCity] = useState("Rahimyar khan");
  const [report, setReport] = useState();
  const [message, setMessage] = useState();
  const [forecastData, setForecastData] = useState({});
  const [dayNight, setDayNight] = useState("day-section");
  const weatherHandler = () => {
    WebHandler(
      "weather",
      city,
      (success) => {
        setDayNight("");
        setMessage("");
        setReport(success);
        console.log(success);
        let check = success.weather[0].icon.replace(/[0-9]/g, '');
        check === "n"
          ? setDayNight("night-section")
          : setDayNight("day-section");
      },
      (error) => {
        setMessage(error);
        setDayNight("day-section");
        setForecastData([]);
      }
    );
  };
  const forecastHandler = () => {
    setForecastData({});
    WebHandler(
      "forecast",
      city,
      (success) => {
        success.list.map((data) => {
          let unixTime = data.dt * 1000;
          let date = new Date(unixTime);
          const day = date.toLocaleString("en-US", { weekday: "long" });
          setForecastData((forecast) => {
            return {
              ...forecast,
              [day]: forecast[day] ? [...forecast[day],data ] : [data],
            };
          });
        });
        console.log(forecastData);
      },
      (error) => setMessage(error)
    );
  };
  useEffect(() => {

  }, [forecastData])
  // SUBMIT HANDLER
  const submitHandler = useCallback(
    async (event) => {
      event.preventDefault();
      weatherHandler();
      forecastHandler();
      setCity("");
    },
    [city]
  );
  return (
    <>
      <div
        className={`container mt-5 border ${dayNight} shadow-lg hero-section`}
      >
        <p className="text-uppercase fw-bold fw-bolder h3 mt-3 brand text-shadow">
            Weather API Application <sup>&reg;</sup>
          </p>
        <form onSubmit={submitHandler} className="mt-3">
          
          <div className=" col-md-6 ms-auto text-light fw-bold">
            <div className="input-group mb-3 ">
              <span className="input-group-text border-0 px-4">
                <i className="fa fa-search" />
              </span>
              <input
                type="text"
                className="form-control border-0 "
                placeholder="ENTER CITY NAME"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </div>
          </div>
        </form>
        <div className=" mt-5 text-uppercase">
          {message ? (
            <h2 className="text-danger ">
              <i className="fa fa-times" /> {message}
            </h2>
          ) : (
            <>
              {report?.main ? (
                <>
                  <h1 className="heading ms-3">
                    {report.main.temp}
                    <sup className="text-lowercase">o</sup>C
                  </h1>
                  <span className="h2 primary p-5 rounded-pill mb-3">
                    {report.name}
                    <img
                      src={`https://openweathermap.org/img/wn/${report.weather[0].icon}@2x.png`}
                    />
                  </span>

                  <div className="container-fluid mt-5 d-flex">
                    <table className="table table-responsive table-hover text-light fs-5">
                      <thead>
                        <tr>
                          <th>MIN TEMPERATURE</th>
                          <th>MAX TEMPERATURE</th>
                          <th>HUMIDITY</th>
                          <th>WIND SPEED</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{report.main.temp_min}</td>
                          <td>{report.main.temp_max}</td>
                          <td>{report.main.humidity}</td>
                          <td>{report.wind.speed}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </div>
      <section className="container forecast-section border shadow-lg py-5">
        {report ? (
          <h2 className="text-center text-capitalize">
            {report?.weather[0]?.description} today.
          </h2>
        ) : (
          ""
        )}

        {Object.keys(forecastData).map((keyName) => (
         <Accordion keyName={keyName} dataArray={forecastData[keyName]}/>
        ))}
      </section>
    </>
  );
}

export default App;
