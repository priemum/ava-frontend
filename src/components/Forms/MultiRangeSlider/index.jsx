import React, { useCallback, useEffect, useState, useRef } from "react";
import "./MultiRangeSlider.css";
import { numberWithComma } from "../../../helpers/numberComma";
import { useSelector } from "react-redux";
import {
  selectCurrentCurrency,
  selectCurrentUnit,
} from "../../../redux/websiteSettings.slice";

const MultiRangeSlider = ({
  min,
  max,
  minVal,
  setMinVal,
  maxVal,
  setMaxVal,
  textColor,
  unit,
  price,
}) => {
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);
  const currentCurrency = useSelector(selectCurrentCurrency);
  const currentUnit = useSelector(selectCurrentUnit);
  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  return (
    <div className="flex items-center justify-center relative">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb z-30"
        style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="thumb z-40"
      />

      <div className="relative w-[200px]">
        <div className="absolute rounded-sm h-[5px] z-10 bg-[#ced4da] w-full" />
        <div
          ref={range}
          className="absolute rounded-sm h-[5px] bg-secondary z-20"
        />
        <div
          className={`absolute ${
            textColor ?? "text-primary"
          } text-tiny mt-5 left-[6px]`}
        >
          {price
            ? numberWithComma(minVal * currentCurrency.conversionRate)
            : unit
            ? numberWithComma(minVal * currentUnit.conversionRate)
            : minVal}
        </div>
        <div
          className={`absolute ${
            textColor ?? "text-primary"
          } text-tiny mt-5 -right-1`}
        >
          {price
            ? numberWithComma(maxVal * currentCurrency.conversionRate)
            : unit
            ? numberWithComma(maxVal * currentUnit.conversionRate)
            : maxVal}
        </div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
