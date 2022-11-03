//API_KEY
const API_KEY = "1968eccc68bb3056e9af63307458f061";
  //WEB_HANDLER
const WebHandler = async (api,city, success, error) => {
  if (city) {
    await fetch(
      `https://api.openweathermap.org/data/2.5/${api}?q=${city}&appid=${API_KEY}&units=metric`
    )
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        if (data.cod === "404") {
          error(data.message);
        } else {
          success(data);
        }
      });
  } else {
    return;
  }
};
export default WebHandler;