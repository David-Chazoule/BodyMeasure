import { methodHarris, methodKatch, MethodMifflin } from "../components/utils"; // Importe tes méthodes

describe("Test BMR methods with activityDay", () => {
  let setUserDataMock;

  beforeEach(() => {
    setUserDataMock = jest.fn();
  });

  // Test de la méthode Harris
  it("should calculate Harris BMR and apply activityDay multiplier", () => {
    const userData = {
      sex: "man",
      weight: "70",
      size: "175",
      age: "25",
      activity: "Actif",
      method: "Harris",
    };

    const activityDay = (x) => {
      let coef;
      switch (userData.activity) {
        case "Sedentaire":
          coef = x * 1.2;
          break;
        case "Lg-acti":
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
      setUserDataMock({ kal: coef.toFixed(0) });
    };

    methodHarris(userData, activityDay);

    expect(setUserDataMock).toHaveBeenCalledWith({ kal: "2672" });
  });
});
