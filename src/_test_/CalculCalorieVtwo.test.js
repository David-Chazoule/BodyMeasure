import { methodHarris, methodKatch, MethodMifflin } from "../components/utils"; // Importe tes méthodes

// Describes the test suite for calculating BMR and applying activity multipliers
describe("Test BMR methods with activityDay", () => {
  let setUserDataMock; // This will be a mock function to track state updates
  let activityDay; // This will hold the logic for applying activity multipliers

  // Array of test data for various users with different attributes and expected results
  const userDataArray = [
    {
      sex: "man",
      weight: "70",
      size: "175",
      age: "25",
      activity: "Actif",
      method: "Harris",
      expectedKal: "2672",
    },

    {
      sex: "woman",
      weight: "50",
      size: "160",
      age: "31",
      activity: "Lg-actif",
      method: "Harris",
      expectedKal: "1748",
    },
    {
      sex: "man",
      weight: "80",
      size: "180",
      age: "30",
      activity: "T-actif",
      method: "Katch",
      fat: "20",
      expectedKal: "2516",
    },

    {
      sex: "woman",
      weight: "100",
      size: "175",
      age: "42",
      activity: "Actif",
      method: "Katch",
      fat: "30",
      expectedKal: "2050",
    },
    {
      sex: "woman",
      weight: "50",
      size: "160",
      age: "25",
      activity: "Lg-actif",
      method: "Mifflin",
      expectedKal: "1669",
    },

    {
      sex: "man",
      weight: "69",
      size: "170",
      age: "40",
      activity: "Ex-actif",
      method: "Mifflin",
      expectedKal: "2959",
    },
  ];

  // Runs before each test, setting up the mock functions
  beforeEach(() => {
    setUserDataMock = jest.fn(); // Create a mock function for setUserData to track calls

    // Define the activityDay function that applies the activity multiplier
    activityDay = (x, activity) => {
      let coef;
      switch (activity) {
        case "Sedentaire":
          coef = x * 1.2;
          break;
        case "Lg-actif":
          coef = x * 1.375;
          break;
        case "Actif":
          coef = x * 1.55;
          break;
        case "T-actif":
          coef = x * 1.725;
          break;
        case "Ex-actif":
          coef = x * 1.9;
          break;
        default:
          coef = x * 1.2;
      }
      // Call setUserDataMock with the calculated calorie value, rounded to the nearest whole number
      setUserDataMock({ kal: coef.toFixed(0) });
      return coef; // Return the calculated coefficient for use in the test
    };
  });

  // Runs after each test, clearing mock data and timers
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mock function calls to ensure tests are independent
    jest.clearAllTimers(); // Clear all timers to avoid interference between tests
  });

  // Iterate over each user data in the array and run the test for each case
  userDataArray.forEach(
    ({ sex, weight, size, age, fat, activity, method, expectedKal }) => {
      it(`should calculate ${method} BMR and apply activityDay multiplier for ${sex} ${method}`, () => {
        const userData = { sex, weight, size, age, fat, activity, method };

        // Choose the correct BMR calculation method based on the 'method' field in userData
        const bmrMethod =
          method === "Harris"
            ? methodHarris
            : method === "Katch"
            ? methodKatch
            : MethodMifflin;

        // Call the BMR method and pass the result to activityDay to apply the activity multiplier
        bmrMethod(userData, (result) => activityDay(result, activity));

        // Verify that setUserDataMock was called with the expected calorie value
        expect(setUserDataMock).toHaveBeenCalledWith({ kal: expectedKal });
      });
    }
  );
});
