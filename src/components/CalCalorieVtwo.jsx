import React, { useState } from "react";
import food from "../styles/img/food.png";
import { ValidNumber } from "./Regex";
import { calculBMR } from "./utils";

export default function CalCalorie() {
  const [userData, setUserData] = useState({
    age: "",
    size: "",
    weight: "",
    sex: "",
    fat: "",
    kal: "",
    method: "Mifflin",
    activity: "Sedentaire",
  });

  const [error, setError] = useState({
    hasError: false,
    fields: {
      age: false,
      size: false,
      weight: false,
      fat: false,
    },
    message: "",
  });

  const [showResult, setShowResult] = useState(false);

  /*  function that adds a multiplier coefficient according to the physical activity of the user on the result of caloric need */

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
    setUserData((prevState) => ({ ...prevState, kal: coef.toFixed(0) }));
  };

  /* function that checks if the data entered by the user are indeed numbers */

  const NumberVerification = () => {
    const newErrors = { ...error.fields };

    newErrors.age = !ValidNumber.test(userData.age);
    newErrors.size = !ValidNumber.test(userData.size);
    newErrors.weight = !ValidNumber.test(userData.weight);
    newErrors.fat =
      userData.method === "Katch" && !ValidNumber.test(userData.fat);

    setError({
      hasError: Object.values(newErrors).some((field) => field === true),
      fields: newErrors,
      message: "*Veuillez entrer vos données en chiffres.",
    });

    setShowResult(!Object.values(newErrors).some((field) => field === true));
  };

  const handleClick = () => {
    setUserData({
      age: "",
      size: "",
      weight: "",
      sex: "",
      fat: "",
      kal: "",
      method: "Mifflin",
      activity: "Sedentaire",
    });

    setShowResult(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlePost = (e) => {
    e.preventDefault();

    calculBMR(userData, activityDay);
    setShowResult(!showResult);
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
                  name="method"
                  type="radio"
                  value="Mifflin"
                  id="mifflin"
                  checked={userData.method === "Mifflin"}
                  onChange={handleChange}
                />
                <span>Mifflin St jeor</span>
              </label>
              <label>
                <input
                  name="method"
                  type="radio"
                  value="Harris"
                  id="harris"
                  checked={userData.method === "Harris"}
                  onChange={handleChange}
                />
                <span>Harris-Benedict</span>
              </label>
              <label>
                <input
                  name="method"
                  type="radio"
                  value="Katch"
                  id="katch"
                  checked={userData.method === "Katch"}
                  onChange={handleChange}
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
                    name="sex"
                    value={userData.sex}
                    required
                    onChange={handleChange}
                  >
                    <option value="">Sexe</option>
                    <option name="sex" value="man">
                      Homme
                    </option>
                    <option name="sex" value="woman">
                      Femme
                    </option>
                  </select>
                </label>
              </div>
              <div className="age-fat-box">
                <label>
                  <input
                    name="age"
                    type="text"
                    placeholder="Votre age"
                    className={error.fields.age ? "error-style" : ""}
                    value={userData.age}
                    required
                    onChange={handleChange}
                  />
                </label>

                {userData.method === "Katch" ? (
                  <label>
                    <input
                      name="fat"
                      type="text"
                      placeholder="% graisse corporelle"
                      className={error.fields.fat ? "error-style" : ""}
                      value={userData.fat}
                      required
                      onChange={handleChange}
                    />
                  </label>
                ) : (
                  ""
                )}
              </div>

              <div className="size-weigth-bodyfat">
                <label>
                  <input
                    name="size"
                    type="text"
                    placeholder="Votre taille en cm"
                    className={error.fields.size ? "error-style" : ""}
                    value={userData.size}
                    required
                    onChange={handleChange}
                  />
                </label>

                <label>
                  <input
                    name="weight"
                    type="text"
                    placeholder="Votre poid en kilos"
                    className={error.fields.weight ? "error-style" : ""}
                    value={userData.weight}
                    required
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>

            <div className="activity-box">
              <label>
                <input
                  name="activity"
                  type="radio"
                  value="Sedentaire"
                  id="sedentaire"
                  checked={userData.activity === "Sedentaire"}
                  onChange={handleChange}
                />
                <span>Sédentaire</span>
              </label>
              <label>
                <input
                  name="activity"
                  type="radio"
                  value="Lg-actif"
                  id="lg-actif"
                  checked={userData.activity === "Lg-actif"}
                  onChange={handleChange}
                />
                <span>Légèrement actif</span>
              </label>
              <label>
                <input
                  name="activity"
                  type="radio"
                  value="Actif"
                  id="actif"
                  checked={userData.activity === "Actif"}
                  onChange={handleChange}
                />
                <span>Actif</span>
              </label>
              <label>
                <input
                  name="activity"
                  type="radio"
                  value="T-actif"
                  id="t-actif"
                  checked={userData.activity === "T-actif"}
                  onChange={handleChange}
                />
                <span>Très actif</span>
              </label>

              <label>
                <input
                  name="activity"
                  type="radio"
                  value="Ex-actif"
                  id="ex-actif"
                  checked={userData.activity === "Ex-actif"}
                  onChange={handleChange}
                />
                <span>extrêment actif</span>
              </label>
            </div>
          </div>
          <div className="error-enter-box">
            <span>{error.hasError ? error.message : ""}</span>
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
                  <span>{userData.kal} Calories</span>
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
