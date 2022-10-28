import { useCallback, useState } from "react";
import "./App.css";
function App() {
  const apiKey = "1968eccc68bb3056e9af63307458f061";
  const [city, setCity] = useState("");
  const [report, setReport] = useState();
  const [message, setMessage] = useState();
  const [number, setNumber] = useState();
  const [historicData, setHistoricData] = useState([]);
  const submitHandler = useCallback(
    async (event) => {
      event.preventDefault();
      if (city !== "") {
        await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        )
          .then((result) => {
            return result.json();
          })
          .then((data) => {
            if (data.cod === "404") {
              setMessage(data.message);
            } else {
              setReport(data);
              setMessage("");
            }
            setCity("");
          });
      } else {
        return;
      }
    },
    [city]
  );
  const getDateHandler = async () => {
    await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    )
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        console.log(data);
        // setHistoricData([...historicData, data]);
      });
  };
  return (
    <div className="container-fluid mt-5 border rounded bg-dark">
      <form onSubmit={submitHandler}>
        <div className="input-group my-3">
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <button className="btn btn-success" type="submit">
            Search
          </button>
        </div>
      </form>
      <div className="col-md-4 float-end">
        <div className="input-group my-2 ">
          <button className="btn btn-primary" onClick={getDateHandler}>
            GET DATA OF
          </button>
          <input
            type="number"
            className="form-control"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
            }}
            placeholder="Enter Days"
          />
        </div>
      </div>
      <div className="container">
        <table className="table table-striped table-inverse table-responsive text-light">
          <thead className="thead-inverse  ">
            <tr>
              <th>Icon</th>
              <th>City</th>
              <th>Weather</th>
              <th>
                Temperature C <sup>o</sup>
              </th>
              <th>
                Min Temp C <sup>o</sup>{" "}
              </th>
              <th>
                Max Temp <sup>o</sup>
              </th>
              <th>Humidity</th>
            </tr>
          </thead>
          <tbody>
            {message ? (
              <tr>
                <td
                  className="text-center text-light text-uppercase"
                  colSpan="7"
                >
                  {message}
                </td>
              </tr>
            ) : (
              <tr>
                <td>
                  <img
                    src={ report? `https://openweathermap.org/img/w/${report.weather[0].icon}.png`: ""}/>
                </td>
                <td className="text-light">{report?.name}</td>
                <td className="text-light">{report?.weather[0].main}</td>
                <td className="text-light">{report?.main.temp}</td>
                <td className="text-light">{report?.main.temp_min}</td>
                <td className="text-light">{report?.main.temp_max}</td>
                <td className="text-light">{report?.main.humidity}</td>
              </tr>
            )}
            <tr><div className="row text-dark">
              <div className="col">
                <div className="card py-3">
                  <div className="card-body">
                    <img src={`https://openweathermap.org/img/w/02d.png`} className="card-header"/>
                    <h2 className="card-title">35 <sup>o</sup></h2>
                    <p className="card-text">Text</p>
                  </div>
                </div>
              </div>
            </div></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
