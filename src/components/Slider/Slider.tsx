import React, { useCallback } from "react";
import Slider from "react-slider";
import debounce from "lodash.debounce";
import { setSliderValue } from "../../store/filtersSlices";

import "./slider.scss";
import { useDispatch } from "react-redux";


export type SliderProps = {
  minimum: number;
  maximum: number;
  title?: string;
  value: number[];
};

const SliderFilter: React.FC<SliderProps> = ({
  minimum,
  maximum,
  title,
  value,
}) => {
  const dispatch = useDispatch();

  const onUpdateValues = useCallback(
    debounce((newValues) => {
      dispatch(setSliderValue(newValues));
    }, 300),
    []
  );

  const handleSliderChange = (newValues: number[]) => {
    onUpdateValues(newValues);
  };

  return (
    <div className="filter">
      <div className="filter__title">{title}</div>
      <div className="filter__range">
        {value[0]} - {value[1]}
      </div>
      <Slider
        className="filter__slider"
        onChange={handleSliderChange}
        value={value}
        min={minimum}
        max={maximum}
      />
    </div>
  );
};

export default SliderFilter;