import React, { useMemo, useState } from "react";
import Chips from "../../../../../shared/components/chips/chips";
import { doGetApiMethod } from "../../../../../api/services/axios-service/axios-service";

const FilterByCategory = () => {
  const [chips, setChips] = useState([]);

  useMemo(async () => {
    const url = "/categories";
    const { data } = await doGetApiMethod(url);
    const mappedChips = mapDataToChip(data);
    setChips(mappedChips);
  }, []);

  const mapDataToChip = (chips) => {
    return chips?.map(chip => {
      return {
        _id: chip._id,
        name: chip.name,
        info: chip.info,
        check: false
      };
    });
  };

  return (
    <React.Fragment>
      {/* header */}
      <div className='px-2 md:px-0 md:w-3/4 md:mx-auto pb-2'>
        <div className='text-lg p-0'>Filter by category</div>
      </div>

      {/* chips list */}
      <div className='px-2 md:px-0 md:w-3/4 md:mx-auto'>
        <Chips
          variant={'unFill'}
          size={'sm'}
          chipsProp={chips}
          setChipsProp={setChips} />
      </div>

    </React.Fragment>
  );
};

export default FilterByCategory;