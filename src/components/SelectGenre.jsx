import React from "react";
import { useDispatch } from "react-redux";
import { fetchDataByGenre } from "../store/netflixSlice";

export default function SelectGenre({ genres, type }) {
  const dispatch = useDispatch();
  return (
    <select
      className="flex ml-12 cursor-pointer text-xl bg-[#333333] text-white rounded-sm px-4 py-2"
      onChange={(e) => {
        dispatch(
          fetchDataByGenre({
            genres,
            genre: e.target.value,
            type,
          })
        );
      }}
    >
      {genres.map((genre) => {
        return (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        );
      })}
    </select>
  );
}

// const Select = styled.select`
//   margin-left: 5rem;
//   cursor: pointer;
//   font-size: 1.4rem;
//   background-color: rgba(0, 0, 0, 0.4);
//   color: white;
// `;
