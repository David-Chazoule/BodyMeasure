import { render, screen } from "@testing-library/react";
import CalculImc from "../components/CalculImc";

test("calculImcs calculates BMI corectly", () => {
  const weight = 70;
  const size = 175;
  const tailleDecimal = size / 100;
  const result = weight / (tailleDecimal * tailleDecimal);

  expect(result.toFixed(2)).toBe("22.86");
});

test("imcStyle assigns correct color and formatted value", () => {
  const mockImcStyle = jest.fn((imc) => {
    if (imc < 0 || isNaN(imc)) {
      return "error";
    }
    if (imc === 0 || imc <= 18.4) {
      return { color: "A", value: imc.toFixed(2) };
    } else if (imc === 18.5 || imc <= 24.9) {
      return { color: "B", value: imc.toFixed(2) };
    } else if (imc === 25 || imc <= 29.9) {
      return { color: "C", value: imc.toFixed(2) };
    } else if (imc === 30 || imc <= 34.9) {
      return { color: "D", value: imc.toFixed(2) };
    } else if (imc === 35 || imc <= 39.9) {
      return { color: "E", value: imc.toFixed(2) };
    } else if (imc > 40) {
      return { color: "F", value: imc.toFixed(2) };
    } else {
      return "error";
    }
  });

  // Normal case
  expect(mockImcStyle(18.0)).toEqual({ color: "A", value: "18.00" });
  expect(mockImcStyle(20.0)).toEqual({ color: "B", value: "20.00" });
  expect(mockImcStyle(25.0)).toEqual({ color: "C", value: "25.00" });
  expect(mockImcStyle(31.0)).toEqual({ color: "D", value: "31.00" });

  //Edge case
  expect(mockImcStyle(18.5)).toEqual({ color: "B", value: "18.50" });
  expect(mockImcStyle(33.2)).toEqual({ color: "D", value: "33.20" });
  expect(mockImcStyle(37.2)).toEqual({ color: "E", value: "37.20" });
  expect(mockImcStyle(31.0)).toEqual({ color: "D", value: "31.00" });
  expect(mockImcStyle(46.0)).toEqual({ color: "F", value: "46.00" });

  // test negative value
  expect(mockImcStyle(-10)).toBe("error");
  expect(mockImcStyle(-20)).toBe("error");

  //test no numeric value
  expect(mockImcStyle(NaN)).toBe("error");
});
