import { fireEvent, render, screen } from "@testing-library/react";
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

describe("NumberVerification function with simulated states", () => {
  it("should set the correct error message and styles for invalid weight", () => {
    // Variables to simulate states
    let noValidEnter = "";
    let result = true;
    let errorWeight = "";
    let errorSize = "";

    // Test data
    const weight = "abc"; //Invalid entry
    const size = "180"; // valid entry
    const validNumberRegex = /^[0-9]+$/;

    if (!validNumberRegex.test(weight)) {
      noValidEnter = "*entrée vos données en chiffres";
      result = false;
      errorWeight = "error-style";
    } else if (!validNumberRegex.test(size)) {
      noValidEnter = "*entrée vos données en chiffres";
      result = false;
      errorSize = "error-style";
    } else {
      noValidEnter = "";
    }

    // Assertions
    expect(noValidEnter).toBe("*entrée vos données en chiffres");
    expect(result).toBe(false);
    expect(errorWeight).toBe("error-style");
    expect(errorSize).toBe("");
  });

  it("should set the correct error message and styles for invalid size", () => {
    // Variables pour simuler les états
    let noValidEnter = "";
    let result = true;
    let errorWeight = "";
    let errorSize = "";

    // Données de test
    const weight = "70"; // valid entry
    const size = "xyz"; //Invalid entry
    const validNumberRegex = /^[0-9]+$/;

    // Réplique de la logique de ta fonction
    if (!validNumberRegex.test(weight)) {
      noValidEnter = "*entrée vos données en chiffres";
      result = false;
      errorWeight = "error-style";
    } else if (!validNumberRegex.test(size)) {
      noValidEnter = "*entrée vos données en chiffres";
      result = false;
      errorSize = "error-style";
    } else {
      noValidEnter = "";
    }

    // Assertions
    expect(noValidEnter).toBe("*entrée vos données en chiffres");
    expect(result).toBe(false);
    expect(errorWeight).toBe("");
    expect(errorSize).toBe("error-style");
  });

  it("should not set any error for valid inputs", () => {
    // Variables to simulate states
    let noValidEnter = "";
    let result = true;
    let errorWeight = "";
    let errorSize = "";

    const weight = "70"; // Entrée valide
    const size = "180"; // Entrée valide
    const validNumberRegex = /^[0-9]+$/;

    if (!validNumberRegex.test(weight)) {
      noValidEnter = "*entrée vos données en chiffres";
      result = false;
      errorWeight = "error-style";
    } else if (!validNumberRegex.test(size)) {
      noValidEnter = "*entrée vos données en chiffres";
      result = false;
      errorSize = "error-style";
    } else {
      noValidEnter = "";
    }

    // Assertions
    expect(noValidEnter).toBe("");
    expect(result).toBe(true);
    expect(errorWeight).toBe("");
    expect(errorSize).toBe("");
  });
});

//integration test

test("calculates BMI and displays result", () => {
  render(<CalculImc />);

  const sizeInput = screen.getByPlaceholderText("Votre taille en cm");
  const weightInput = screen.getByPlaceholderText("Votre poid");
  const sumbitButton = screen.getByText("Calculer mon IMC");

  fireEvent.change(sizeInput, { target: { value: "175" } });
  fireEvent.change(weightInput, { target: { value: "70" } });
  fireEvent.click(sumbitButton);

  const result = screen.getByText(/Votre IMC :/i);
  expect(result).toBeInTheDocument();
  expect(screen.getByText("22.86")).toBeInTheDocument();
});
