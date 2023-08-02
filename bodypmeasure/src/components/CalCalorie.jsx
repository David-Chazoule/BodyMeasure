import React, { useState } from "react";
import food from "../styles/img/food.png";
import { ValidNumber } from "./Regex";

export default function CalCalorie() {
  const [age, setAge] = useState("");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [sexe, setSexe] = useState("");
  const [kal, setKal] = useState("");
  const [method, setMethod] = useState("Mifflin");
  const [fat, setFat] = useState("");
  const [activity, setActivity] = useState("Sedentaire");
  const [showResult, setShowResult] = useState(false);
  const [noValidEnter, setNoValidEnter] = useState("");
  const [errorAge, setErrorAge] = useState("");
  const [errorSize, setErrorSize] = useState("");
  const [errorWeight, setErrorWeight] = useState("");
  const [errorFat, setErrorFat] = useState("");

  const methodHarris = () => {
    if (sexe === "man") {
      const result =
        13.397 * Number(weight) +
        4.799 * Number(size) -
        5.677 * Number(age) +
        88.362;
      activityDay(result);
    }
    if (sexe === "woman") {
      const result =
        9.247 * Number(weight) +
        3.098 * Number(size) -
        4.33 * Number(age) +
        447.593;
      activityDay(result);
    }
  };

  const methodKatch = () => {
    const fatcal = Number(fat) / 100;
    const result = 370 + 21.6 * (1 - fatcal) * 63;
    activityDay(result);
  };

  const MethodMifflin = () => {
    if (sexe === "man") {
      const result =
        10 * Number(weight) + 6.25 * Number(size) - 5 * Number(age) + 5;
      activityDay(result);
    }
    if (sexe === "woman") {
      const result =
        10 * Number(weight) + 6.25 * Number(size) - 5 * Number(age) - 161;
      activityDay(result);
    }
  };

  const calculBMR = () => {
    if (method === "Mifflin") {
      MethodMifflin();
    }

    if (method === "Harris") {
      methodHarris();
    }
    if (method === "Katch") {
      methodKatch();
    }
  };

  const activityDay = (x) => {
    if (activity === "Sedentaire") {
      const coef = x * 1.2;
      return setKal(coef.toFixed(0));
    }
    if (activity === "Lg-actif") {
      const coef = x * 1.375;
      return setKal(coef.toFixed(0));
    }
    if (activity === "Actif") {
      const coef = x * 1.55;
      return setKal(coef.toFixed(0));
    }
    if (activity === "T-actif") {
      const coef = x * 1.725;
      return setKal(coef.toFixed(0));
    }
    if (activity === "Ex-actif") {
      const coef = x * 1.9;
      return setKal(coef.toFixed(0));
    }
  };

  const NumberVerification = () => {
    if (!ValidNumber.test(weight)) {
      setNoValidEnter("*entrée vos données en chiffres");
      setShowResult(false);
      setErrorWeight("error-style");
    } else if (!ValidNumber.test(size)) {
      setNoValidEnter("*entrée vos données en chiffres");
      setShowResult(false);
      setErrorSize("error-style");
    } else if (!ValidNumber.test(age)) {
      setNoValidEnter("*entrée vos données en chiffres");
      setShowResult(false);
      setErrorAge("error-style");
    } else if (method === "Katch" && !ValidNumber.test(fat)) {
      setNoValidEnter("*entrée vos données en chiffres");
      setShowResult(false);
      setErrorFat("error-style");
    } else {
      setNoValidEnter("");
    }
  };

  const handleClick = () => {
    setKal("");
    setSize("");
    setWeight("");
    setAge("");
    setFat("");
    setShowResult(false);
  };

  const handlePost = (e) => {
    e.preventDefault();
    calculBMR();
    setShowResult(!showResult);
  };

  const onOptionChange = (e) => {
    setMethod(e.target.value);
  };

  const onActivityChange = (e) => {
    setActivity(e.target.value);
  };

  return (
    <div className="calcul_kalorie_container">
      <form onSubmit={(e) => NumberVerification(handlePost(e))}>
        <div className="form-container">
          <div className="method-box">
            <p>Methode BMR </p>
            <div>
              <label>
                <input
                  type="radio" 
                  value="Mifflin"
                  id="mifflin"
                  checked={method === "Mifflin"}
                  onChange={onOptionChange}
                />
                <span>Mifflin St jeor</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="Harris"
                  id="harris"
                  checked={method === "Harris"}
                  onChange={onOptionChange}
                />
                <span>Harris-Benedict</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="Katch"
                  id="katch"
                  checked={method === "Katch"}
                  onChange={onOptionChange}
                />
                <span>Katch-McArdle</span>
              </label>
            </div>
          </div>
          <div className="input-container">
            <div className="information-container">
              <div className="sex-box">
                <label>
                  <select
                    value={sexe}
                    required
                    onChange={(e) => setSexe(e.target.value)}
                  >
                    <option value="">Sexe</option>
                    <option value="man">Homme</option>
                    <option value="woman">Femme</option>
                  </select>
                </label>
              </div>
              <div className="age-fat-box">
                <label>
                  <input
                    type="text"
                    placeholder="Votre age"
                    className={noValidEnter ? errorAge : ""}
                    value={age}
                    required
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>

                {method === "Katch" ? (
                  <label>
                    <input
                      type="text"
                      placeholder="% graisse corporelle"
                      className={noValidEnter ? errorFat : ""}
                      value={fat}
                      required
                      onChange={(e) => setFat(e.target.value)}
                    />
                  </label>
                ) : (
                  ""
                )}
              </div>

              <div className="size-weigth-bodyfat">
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
                    placeholder="Votre poid en kilos"
                    className={noValidEnter ? errorWeight : ""}
                    value={weight}
                    required
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </label>
              </div>
            </div>

            <div className="activity-box">
              <label>
                <input
                  type="radio"
                  value="Sedentaire"
                  id="sedentaire"
                  checked={activity === "Sedentaire"}
                  onChange={onActivityChange}
                />
                <span>Sédentaire</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="Lg-actif"
                  id="lg-actif"
                  checked={activity === "Lg-actif"}
                  onChange={onActivityChange}
                />
                <span>Légèrement actif</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="Actif"
                  id="actif"
                  checked={activity === "Actif"}
                  onChange={onActivityChange}
                />
                <span>Actif</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="T-actif"
                  id="t-actif"
                  checked={activity === "T-actif"}
                  onChange={onActivityChange}
                />
                <span>Très actif</span>
              </label>

              <label>
                <input
                  type="radio"
                  value="Ex-actif"
                  id="ex-actif"
                  checked={activity === "Ex-actif"}
                  onChange={onActivityChange}
                />
                <span>extrêment actif</span>
              </label>
            </div>
          </div>
          <div className="error-enter-box">
            <span>{noValidEnter}</span>
          </div>
          <button type="submit">
            {showResult ? (
              <span onClick={handleClick}>
                Re-calculer votre besoin calorique
              </span>
            ) : (
              "Calculer votre besoin calorique"
            )}
          </button>
        </div>
      </form>

      <div className="result_kal">
        {showResult ? (
          showResult && (
            <div className="result-box">
              <div className="result-title">
                <div className="result-title-kal">
                  <h3>Votre besoin journalier en calories </h3>
                  <span>{kal} Calories</span>
                </div>
                <div className="img-box">
                  <img src={food} alt="food" />
                  <p>
                    Pour conserver un poids stable, la dépense calorique
                    quotidienne doit être égale à l'apport calorique quotidien.
                  </p>
                </div>
              </div>

              <div className="advice-box">
                <h3> Comment Perdre du poid?</h3>
                <p>
                  vous souhaitez perdre du poids, il convient de mettre en place
                  un déficit calorique (absorber moins de calories que vous n'en
                  dépensez). On considère qu'il faut induire un déficit
                  énergétique de l'ordre de <span>10 à 15 %</span>du besoin
                  énergétique total. La diminution doit être faite
                  progressivement, par tranche de{" "}
                  <span>50 à 60 kcal par semaine</span>, pour ne pas brusquer
                  l’organisme.
                  <br />
                  Prenez garde aux régimes restrictifs et aux déficits
                  caloriques trop importants qui risquent d'entraîner des
                  carences nutritionnelles, voire des mécanismes d'adaptation
                  contre-productifs. En effet, lorsque le nombre de calories
                  passe sous un certain seuil, l'organisme se protège et fait
                  des réserves.
                </p>
              </div>
            </div>
          )
        ) : (
          <div className="intro-txt">
            <div className="intro">
              <p>
                Vos besoins quotidiens en calories dépendent de votre âge, de
                votre sexe, de votre poids, de votre taille et de votre activité
                physique. Découvrez la formule de calcul qui permet de connaître
                l’apport quotidien en calories recommandé pour maintenir votre
                poids actuel.
              </p>
            </div>
            <div className="methods-txt">
              <div className="method-expl">
                <h3>Methode Mifflin St Jeor</h3>
                <p>
                  Cette méthode de calcul fut introduite en 1990. Elle permet de
                  calculer son métabolisme de base de manière précise.
                </p>
              </div>
              <p></p>

              <div className="method-expl">
                <h3>Methode Harris-Benedict</h3>
                <p>
                  La methode Harris et Benedict de 1919 qui permet de déterminer
                  les besoins caloriques journaliers tant pour les hommes que
                  pour les femmes.
                </p>
              </div>

              <div className="method-expl">
                <h3>Methode Katch-McArdle</h3>
                <p>
                  Cette formule prend en compte la masse maigre de la personne
                  ainsi que la taille.
                </p>
              </div>
            </div>
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
}
