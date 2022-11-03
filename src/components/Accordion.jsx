import React from 'react'

const Accordion = ({keyName,dataArray}) => {
  return (
    <div
    className="accordion accordion-flush"
    id="accordionFlushExample"
  >
    <div className="accordion-item mb-2">
      <h2 className="accordion-header" id={`flush-${keyName}`}>
        <button
          className="accordion-button collapsed mx-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#flush-collapse-${keyName}`}
          aria-expanded="false"
          aria-controls={`flush-collapse-${keyName}`}
        >
          {keyName ? (
            <img
              src={`https://openweathermap.org/img/wn/${dataArray[0]?.weather[0].icon}@2x.png`}
              className="accord-image"
            />
          ) : (
            ""
          )}
          {/* days */}
          {keyName}
          <p className="mx-3 mt-3">{dataArray[0]?.main.temp}C <sup>o</sup> <span className="text-uppercase">{dataArray[0]?.weather[0].description}</span> </p>
          <i className="fa fa-plus-circle ms-auto" />

        </button>
      </h2>
      <div
        id={`flush-collapse-${keyName}`}
        className="accordion-collapse collapse"
        aria-labelledby={`flush-${keyName}`}
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body text-center row  g-2">

          <br />
          {dataArray.map((data) => {
            let date = new Date(data.dt * 1000);
            let time = date.toLocaleString("en-US", { hour: "2-digit" })
            return (
              <span className="col me-2 alert alert-primary">
                <p className='text-uppercase'>{data.weather[0].description}</p>
                <img src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`} className="accord-image"/>{data.main.temp}<sup>o</sup> <br />{time}</span>
            );
          })}
        </div>
      </div>
    </div>
  </div>
  )
}

export default Accordion