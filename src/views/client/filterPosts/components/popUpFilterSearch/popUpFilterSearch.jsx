import React from 'react';
import PopUPModel from '../../../../../shared/UI/popup/popUpModel';
import Filters from "../../../../../assets/icons/filters";
import RangePrice from '../rangePrice';
import FilterByCategory from '../filterByCategory/filterByCategory';
import { onPostSearchToggle } from '../../../../../redux/features/toggleSlice';

const PopUpFilterSearch = () => {
  return (
    <PopUPModel className={'py-4'} action={onPostSearchToggle} >
      {/* filters header */}
      <div className="filters-header flex justify-center items-center">
        <span className='pr-2'>
          <Filters color='#93C5FD' width='30' height='30' />
        </span>
        <div className='text-2xl'>Filters</div>
      </div>
      {/* split header from body */}
      <hr className="h-px mt-3 mb-4 w-3/4 mx-auto bg-gray-200 border-0" />

      {/* filters body */}
      <div className="filters-body px-3">
        <RangePrice />
        <FilterByCategory />
        <div>free search</div>
      </div>
    </PopUPModel >
  );
};

export default PopUpFilterSearch;