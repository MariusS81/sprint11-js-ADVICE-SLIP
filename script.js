const button = document.getElementById("advice-button");
const speachEl = document.getElementById("speach");

const renderAdvice = (advice) => {
  speachEl.textContent = advice;
};

const getAdvice = () => {
  const url = `https://api.adviceslip.com/advice`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let advice = "";
      if (data.slip && data.slip.id) {
        advice = `${data.slip.id} - ${data.slip.advice}`;
      } else {
        advice = data.slip.advice;
      }
      console.log(advice);
      renderAdvice(advice);
    })
    .catch((e) => {
      console.error(e);
      renderAdvice("An error occurred while fetching advice.");
    });
};

button.addEventListener("click", getAdvice);
