import stepTracker from "../utils/stepTracker.js";
import generateRoundForm from "../generateRoundForm/index.js";
import generateFinalScoreReport from "../generateFinalScoreReport/index.js";

const { getCurrentStep, setCurrentStep, getLastCompletedStep } = stepTracker();

const roundIndicatorHtml = () => {
  const isMobile = window.matchMedia("(max-width: 800px)").matches;
  let indicator;

  if (isMobile) {
    indicator = document.createElement("div");

    const select = document.createElement("select");
    for (let i = 1; i <= 10; i++) {
      const option = document.createElement("option");
      option.value = `round${i}`;
      option.innerText = `Round ${i}`;

      select.appendChild(option);
    }
    const finalOption = document.createElement("option");
    finalOption.value = "round11";
    finalOption.innerText = "Final Scores";
    select.appendChild(finalOption);

    select.value = `round${getCurrentStep()}`;
    select.id = "progressBarSelect";
    select.addEventListener("change", (event) => {
      const progressBarSelect = document.getElementById("progressBarSelect");
      const wantedStep = parseInt(event.target.value.replace("round", ""), 10);

      if (wantedStep === 11 && getLastCompletedStep() === 11) {
        setCurrentStep(wantedStep);
        generateFinalScoreReport();
        document.getElementById("progressBarSelect").value = "round11";
      } else if (wantedStep <= getLastCompletedStep()) {
        setCurrentStep(wantedStep);
        generateRoundForm();
        progressBarSelect.value = `round${wantedStep}`;
      } else {
        progressBarSelect.value = `round${getCurrentStep()}`;
      }
    });

    indicator.appendChild(select);

    const progressBar = document.createElement("div");
    progressBar.id = "mobileProgressBar";
    progressBar.style.width =
      getCurrentStep() === 11
        ? "100%"
        : `${((getCurrentStep() - 1) / 10) * 100}%`;
    indicator.appendChild(progressBar);
  } else {
    indicator = document.createElement("h2");
    indicator.innerHTML =
      getCurrentStep() === 11 ? "Final Scores" : `Round ${getCurrentStep()}`;
  }

  return indicator;
};

export default roundIndicatorHtml;
