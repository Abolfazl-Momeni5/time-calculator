const $ = document;
const layer = $.querySelector(".layer");
const creatBtn = $.querySelector(".time-calculator-header__insert-btn");
const modal = $.querySelector(".modal");
const modalSubmitBtn = $.querySelector(".btn-submit ");
const modalCancelBtn = $.querySelector(".modal__btn-cancel");
const modalCloseBtn = $.querySelector(".modal__header-close-icon ");
const modalResult = $.querySelector(".modal-result");
const modalResultTxt = $.querySelector(".modal-result__txt ");
const modalResultCloseIcon = $.querySelector(".modal-result__close-icon ");
const modalResultCloseBtn = $.querySelector(".modal-result__btn");
const errorMessage1 = $.querySelector(".error-massege1");
const errortxt1 = $.querySelector("#error-txt1");
const errorMessage2 = $.querySelector(".error-massege2");
const errortxt2 = $.querySelector("#error-txt2");
const inputHour = $.querySelector("#input-hour");
const inputMin = $.querySelector("#input-min");
const outputHour = $.querySelector("#output-hour");
const outputMin = $.querySelector("#output-min");
const settingBtn = $.querySelector(".time-calculator-header__setting-btn");
const settingMenu = $.querySelector(".time-calculator-menu");
const removeAllBtn = $.querySelector(".remove-all");
const showResultBtn = $.querySelector(".result-btn");
let times = [];
// set func
const showHours = () => {
  const timeCalculatorContainer = $.querySelector(".time-calculator-main");
  timeCalculatorContainer.innerHTML = "";
  if (times.length) {
    times.forEach((time, index) => {
      const enter = convertTimeToHoursAndMinutes(time[0]);
      const exite = convertTimeToHoursAndMinutes(time[1]);
      timeCalculatorContainer.insertAdjacentHTML(
        "beforeend",
        `
            <div class="time-calculator-main__content w-full sm:w-[220px] rounded-sm flex flex-col bg-zinc-800 p-2 gap-2.5">
            <div class="time-calculator-main__input-houers-wrapper flex flex-row justify-between">
              <span class="time-calculator-main__input-houers-text">ورود:</span>
              <span class="time-calculator-main__input-houers-text text-taupe-400">${enter}</span>
            </div>
            <div class="time-calculator-main__output-wrapper flex flex-row justify-between border-b border-zinc-600/70 pb-7">
              <span class="time-calculator-main__output-houers-text">خروج:</span>
              <span class="time-calculator-main__output-houers-text text-taupe-400">${exite}</span>
            </div>
            <div class="time-calculator-main__total-time flex flex-col gap-2.5 items-center justify-center mt-[7px]">
              <span class="time-calculator-main__total-time-text">جمع کل:</span>
              <span class="time-calculator-main__total-time-text text-taupe-700 font-pelak-bold text-2xl">${convertTimeToHoursAndMinutes(time[1] - time[0])}</span>
            </div>
            <div class="time-calculator-main__total-time-delete-icon w-8 h-9 rounded-xs cursor-pointer mt-5 bg-zinc-600 flex shrink items-center justify-center" onClick="deleteTime(${index})">
              <svg class="w-6 h-6">
                <use href="#delete"></use>
              </svg>
            </div>
          </div>
    
    
    `,
      );
    });
  } else {
    timeCalculatorContainer.insertAdjacentHTML(
      "beforeend",
      `
        
        <h2 class="col-span-12">هنوز مقداری وارد نشده است...</h2>
        `,
    );
  }
};
const validateAndInsertTime = () => {
  let enter;
  let exite;
  // input

  if (inputHour.value === "" || inputMin.value === "") {
    errorHandeler(errorMessage1, errortxt1, "مقادیر نباید خالی باشند.");
  } else {
    hideError(errorMessage1);
    const hour = +inputHour.value;
    const min = +inputMin.value;

    if (hour >= 0 && hour <= 23 && min >= 0 && min <= 59) {
      hideError(errorMessage1);
      const enterHour = hour * 60 + min;
      enter = enterHour;
    } else {
      errorHandeler(
        errorMessage1,
        errortxt1,
        "ساعت باید بین 0 تا 23 و دقیقه بین 0 تا 59 باشد.",
      );
    }
  }
  //output

  if (outputHour.value === "" || outputMin.value === "") {
    errorHandeler(errorMessage2, errortxt2, "مقادیر نباید خالی باشند.");
  } else {
    hideError(errorMessage2);

    const hour = +outputHour.value;
    const min = +outputMin.value;
    if (hour >= 0 && hour <= 23 && min >= 0 && min <= 59) {
      const exiteHour = hour * 60 + min;
      hideError(errorMessage2);

      exite = exiteHour;
    } else {
      errorHandeler(
        errorMessage2,
        errortxt2,
        "ساعت باید بین 0 تا 23 و دقیقه بین 0 تا 59 باشد.",
      );
    }
  }
  //   finaly calc

  if (enter !== undefined && exite !== undefined) {
    if (exite < enter) {
      exite += 1440;
    }
    times.push([enter, exite]);
    hideModal();
    showHours();
  }
};
const convertTimeToDuration = (time) => {
  let hour = Math.floor(time / 60);
  let min = time % 60;
  if (min < 10) {
    min = `0${min}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  return `${hour}:${min}`;
};
const convertTimeToHoursAndMinutes = (time) => {
  let hour = Math.floor((time / 60) % 24);
  let min = time % 60;
  if (min < 10) {
    min = `0${min}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  return `${hour}:${min}`;
};
const calcTotalTime = () => {
  let total = 0;
  times.forEach((time) => {
    const enter = time[0];
    const exite = time[1];
    const minTime = exite - enter;
    total += minTime;
  });
  const convertedTime = convertTimeToDuration(total);
  hideSettingMenu();
  showResultModal(convertedTime);
};
const deleteTime = (index) => {
  times.splice(index, 1);
  showHours();
};
const showModal = () => {
  modal.classList.remove("hidden");
  layer.classList.remove("hidden");
  layer.classList.add("fixed");
};
const hideModal = () => {
  modal.classList.add("hidden");
  layer.classList.remove("fixed");
  layer.classList.add("hidden");
  clearInputs();
  hideError(errorMessage1);
  hideError(errorMessage2);
};

const showResultModal = (time) => {
  modalResult.classList.remove("hidden");
  layer.classList.remove("hidden");
  layer.classList.add("fixed");
  modalResultTxt.innerHTML = time;
};
const hideResultModal = () => {
  modalResult.classList.add("hidden");
  layer.classList.remove("fixed");
  layer.classList.add("hidden");
};
const errorHandeler = (elm, txtElm, txt) => {
  elm.classList.remove("hidden");
  elm.classList.add("flex");
  txtElm.innerHTML = txt;
};
const hideError = (elm) => {
  elm.classList.remove("flex");
  elm.classList.add("hidden");
};
const showSettingMenu = () => {
  settingMenu.classList.toggle("show-menu");
};
const hideSettingMenu = () => {
  settingMenu.classList.remove("show-menu");
};

const clearInputs = () => {
  inputHour.value = "";
  inputMin.value = "";
  outputHour.value = "";
  outputMin.value = "";
};

//add event listenr
creatBtn.addEventListener("click", showModal);
modalCloseBtn.addEventListener("click", hideModal);
modalCancelBtn.addEventListener("click", hideModal);
modalSubmitBtn.addEventListener("click", validateAndInsertTime);
modalResultCloseBtn.addEventListener("click", hideResultModal);
modalResultCloseIcon.addEventListener("click", hideResultModal);
settingBtn.addEventListener("click", showSettingMenu);
showResultBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  hideSettingMenu();
  calcTotalTime();
});
removeAllBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  times = [];
  showHours();
  hideSettingMenu();
});
document.addEventListener("click", (e) => {
  if (!settingBtn.contains(e.target)) {
    settingMenu.classList.remove("show-menu");
  }
});
window.addEventListener("load", showHours);
