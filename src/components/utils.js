export const methodHarris = (userData, activityDay) => {
  const { sex, weight, size, age } = userData;

  if (sex === "man") {
    const result =
      13.397 * Number(weight) +
      4.799 * Number(size) -
      5.677 * Number(age) +
      88.362;
    activityDay(result);
  }
  if (sex === "woman") {
    const result =
      9.247 * Number(weight) +
      3.098 * Number(size) -
      4.33 * Number(age) +
      447.593;
    activityDay(result);
  }
};

/*  function that allows you to calculate your caloric need with the Katch method */

export const methodKatch = (userData, activityDay) => {
  const { fat } = userData;
  const fatcal = Number(fat) / 100;
  const result = 370 + 21.6 * (1 - fatcal) * 63;
  activityDay(result);
};

/*  function that allows you to calculate your caloric need with the Mifflin method */

export const MethodMifflin = (userData, activityDay) => {
  const { sex, weight, size, age } = userData;
  if (sex === "man") {
    const result =
      10 * Number(weight) + 6.25 * Number(size) - 5 * Number(age) + 5;
    activityDay(result);
  }
  if (sex === "woman") {
    const result =
      10 * Number(weight) + 6.25 * Number(size) - 5 * Number(age) - 161;
    activityDay(result);
  }
};

/*  function which checks which method was chosen by the user */

export const calculBMR = (userData, activityDay) => {
  if (userData.method === "Mifflin") {
    MethodMifflin(userData, activityDay);
  }

  if (userData.method === "Harris") {
    methodHarris(userData, activityDay);
  }
  if (userData.method === "Katch") {
    methodKatch(userData, activityDay);
  }
};
