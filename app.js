const buttonEl = document.getElementById("advice-button");
const adviceTextEl = document.getElementById("advice-text");
const loadingEl = document.getElementById('loading-advice');

let loadingAdvice;

const renderAdvice = (advice) => {
  adviceTextEl.textContent = advice;
};

const setLoadingAdvice = (loadingValue) => {
  loadingAdvice = loadingValue;
  loadingEl.style.display = loadingValue ? 'block' : 'none';
  const waitCursorClass = 'wait-cursor';
  if (loadingValue) {
    buttonEl.classList.add(waitCursorClass);
  } else {
    buttonEl.classList.remove(waitCursorClass);
  }
}

setLoadingAdvice(false);

const renderRandomAdviceTextListener = () => {
  if (loadingAdvice) {
    return;
  }
  setLoadingAdvice(true);
  console.log("renderRandomAdviceTextListener enter");
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

      setTimeout(() => {
        setLoadingAdvice(false);
      }, 2000);
    })
    .catch((e) => {
      console.error(e);
      renderAdvice("An error occurred while fetching advice.");
    })
    ;
};

buttonEl.addEventListener("click", renderRandomAdviceTextListener);

