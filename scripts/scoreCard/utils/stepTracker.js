let currentStep = 1;
let lastCompletedStep = 1;

const stepTracker = () => {
  const stepForwards = () => {
    currentStep++;
    lastCompletedStep = currentStep;

    return currentStep;
  };

  const stepBackwards = () => {
    currentStep--;

    return currentStep;
  };

  const setCurrentStep = (step) => {
    currentStep = step;

    return currentStep;
  };

  const getCurrentStep = () => {
    return currentStep;
  };

  const getLastCompletedStep = () => {
    return lastCompletedStep;
  };

  return {
    stepForwards,
    stepBackwards,
    setCurrentStep,
    getCurrentStep,
    getLastCompletedStep,
  };
};

export default stepTracker;
