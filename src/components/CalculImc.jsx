import { useState } from "react";

import { ValidNumber } from "./Regex";
import body from "../styles/img/body.png";

export default function CalculImc() {
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [imc, setImc] = useState("");
  const [result, setResult] = useState(false);
  const [colorImc, setColorImc] = useState("");
  const [noValidEnter, setNoValidEnter] = useState("");
  const [errorSize, setErrorSize] = useState("");
  const [errorWeight, setErrorWeight] = useState("");

  /* function to calculate BMI */

  const calculImcs = () => {
    const tailleDecimal = size / 100;
    const result =
      Number(weight) / (Number(tailleDecimal) * Number(tailleDecimal));
    imcStyle(result);
  };

  /* function that checks the given imc and assigns it a color according to its level */

  const imcStyle = (imc) => {
    if (imc < 0 || isNaN(imc)) {
      return "error";
    }

    if (imc === 0 || imc <= 18.4) {
      setColorImc("A");
      return setImc(imc.toFixed(2));
    } else if (imc === 18.5 || imc <= 24.9) {
      setColorImc("B");
      return setImc(imc.toFixed(2));
    } else if (imc === 25 || imc <= 29.9) {
      setColorImc("C");
      return setImc(imc.toFixed(2));
    } else if (imc === 30 || imc <= 34.9) {
      setColorImc("D");
      return setImc(imc.toFixed(2));
    } else if (imc === 35 || imc <= 39.9) {
      setColorImc("E");
      return setImc(imc.toFixed(2));
    } else if (imc > 40) {
      setColorImc("F");
      return setImc(imc.toFixed(2));
    } else {
      return "error";
    }
  };

  /* function that checks if the data entered by the user are indeed numbers */

  const NumberVerification = () => {
    if (!ValidNumber.test(weight)) {
      setNoValidEnter("*entrée vos données en chiffres");
      setResult(false);
      setErrorWeight("error-style");
    } else if (!ValidNumber.test(size)) {
      setNoValidEnter("*entrée vos données en chiffres");
      setResult(false);
      setErrorSize("error-style");
    } else {
      setNoValidEnter("");
    }
  };

  const handleClick = () => {
    setImc("");
    setSize("");
    setWeight("");

    setResult(false);
  };

  const handlePost = (e) => {
    e.preventDefault();

    calculImcs();

    setResult(!result);
  };

  return (
    <div className="calculator_imc_container">
      <form onSubmit={(e) => NumberVerification(handlePost(e))}>
        <div className="form_container">
          <label>
            <input
              type="text"
              placeholder="Votre taille en cm"
              className={noValidEnter ? errorSize : ""}
              value={size}
              required
              onChange={(e) => setSize(e.target.value)}
            />
          </label>

          <label>
            <input
              type="text"
              placeholder="Votre poid"
              className={noValidEnter ? errorWeight : ""}
              value={weight}
              required
              onChange={(e) => setWeight(e.target.value)}
            />
          </label>
        </div>
        <div className="error-enter-box">
          <span className="ageLimit">*Vous devez avoir entre 18 et 65 ans</span>
          <span>{noValidEnter} </span>
        </div>
        <button type="submit">
          {result ? (
            <span onClick={handleClick}>Calculer à nouveau mon IMC </span>
          ) : (
            "Calculer mon IMC"
          )}
        </button>
      </form>

      <div className="result_imc">
        {result ? (
          result && (
            <>
              <div className="result-div">
                <h1>Votre IMC : </h1>
                <span className={colorImc}>{imc}</span>
              </div>
              <div className="summary_table">
                <table>
                  <thead>
                    <tr>
                      <th colspan="2">Indice IMC</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="tdA"> -18,4kg/m² </td>
                      <td>maigreur</td>
                    </tr>
                    <tr>
                      <td className="tdB">entre 18,5 & 24,9kg/m²</td>
                      <td>corpulence "normale"</td>
                    </tr>
                    <tr>
                      <td className="tdC">entre 25 & 29,9kg/m²</td>
                      <td>surpoids</td>
                    </tr>
                    <tr>
                      <td className="tdD">entre 30 & 34,9kg/m²</td>
                      <td>obésité modérée</td>
                    </tr>
                    <tr>
                      <td className="tdE">entre 35 & 39,9 kg/m²</td>
                      <td>obésidté sévère</td>
                    </tr>
                    <tr>
                      <td className="tdF">au-dessus & 40kg/m²</td>
                      <td>obésité morbide</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )
        ) : (
          <>
            <p>
              <span>L’indice de masse corporelle</span> (body mass index ou BMI
              en anglais) est utilisé depuis 1997 par l’Organisation mondiale de
              la santé (OMS), principalement pour évaluer les risques liés au
              surpoids et à l’obésité chez l’adulte de <span>18 à 65 ans</span>.
              Cet indicateur permet de savoir si notre poids est adapté
              proportionnellement à notre taille, ou s’il présente un danger
              potentiel pour notre santé.
            </p>

            <img src={body} alt="body" />
          </>
        )}
      </div>
    </div>
  );
}
