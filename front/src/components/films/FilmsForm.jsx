import React from "react";
import { useForm } from "react-hook-form";
import "./Films.css";
import { createUserFilms } from "../../api/library/UsersApi";
import { useGlobalUserContext } from "../context/UserContext";

function FilmsForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { userData, refreshUserData } = useGlobalUserContext();

  let UppercaseFirst = (str) => {
    let newStr = str.charAt(0).toUpperCase() + str.slice(1);
    return newStr;
  };

  function onSubmit(data) {
    const newObj = {
      category: data.category,
      date: data.date,
      name: UppercaseFirst(data.name),
    };
    createUserFilms(userData._id, newObj).then(() => {
      refreshUserData(userData._id);
    });
    reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className="rounded-0"
            type="date"
            name="date"
            id="date-inp"
            min="2000-01-01"
            max="2099-01-01"
            defaultValue={new Date().toISOString().slice(0, 10)}
            {...register("date")}
          />
        </div>
        <div>
          <input
            className="rounded-0 input-custom "
            placeholder="Filmo pavadinimas"
            type="text"
            name="name"
            id="name"
            {...register("name", {
              maxLength: 50,
              minLength: 2,
              required: true,
              pattern:
                // /^[a-ząčęėįšųūž|A-ZĄČĘĖĮŠŲŪŽ]+(?: [a-ząčęėįšųūž|A-ZĄČĘĖĮŠŲŪŽ]+)*$/,
                /^[a-ząčęėįšųūž|A-ZĄČĘĖĮŠŲŪŽ]+(?: [a-ząčęėįšųūž|A-ZĄČĘĖĮŠŲŪŽ]+)*$/,
            })}
          />
        </div>
        {errors.name && (
          <p className="fs-4 text-danger fw-light text-center">
            Būtinas laukelis, tik raidės, 2-50 simbolių.
          </p>
        )}
        <div>
          <select
            className=" input-custom rounded-0"
            name="category"
            id="category"
            {...register("category", { required: true })}
          >
            <option value="Kita">Kita</option>
            <option value="Drama">Drama</option>
            <option value="Romantinis">Romantinis</option>
            <option value="Veiksmo">Veiksmo</option>
            <option value="Mindfuck">Mindfuck</option>
            <option value="Vaikų">Vaikų</option>
            <option value="Kita">Kita</option>
          </select>
        </div>
        <button type="submit">Pridėti filmą</button>
      </form>
    </>
  );
}

export default FilmsForm;
