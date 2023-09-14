import { cva } from 'class-variance-authority';
import React, { useEffect, useState } from 'react';
import { Tooltip as ReactTooltip } from "react-tooltip";
import CheckMark from '../../../assets/icons/checkMark';
import { cn } from '../../../util/functions';

const chipVariants = cva(
  'text-xs rounded-full cursor-pointer transition duration-300 flex items-center',
  {
    variants: {
      variant: {
        default: 'bg-blue-500 border border-blue-700 text-white hover:bg-blue-700',
        unFill: `border border-neutral-200 hover:bg-neutral-200 active:bg-neutral-200`,
        ghost: 'border border-blue-300',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-8 px-2 py-1 rounded-md',
        lg: 'h-11 px-4 py-2 rounded-md'
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default'
    },
  }
);

const Chips = ({ chipsProp, setChipsProp, className, variant, size, defaultColors = true, ...props }) => {
  const [arrSlice1, setArrSlice1] = useState([]);
  const [arrSlice2, setArrSlice2] = useState([]);

  useEffect(() => {
    setArrSlice1(chipsProp.slice(0, 5));
    setArrSlice2(chipsProp.slice(5));
  }, [chipsProp]);

  const handleChecked = (id) => {
    const tempChips = chipsProp.map((chip) => {
      if (chip._id === id)
        return { ...chip, check: !chip.check };
      return chip;
    });

    setChipsProp(tempChips);
  };

  return (
    <div className='flex flex-wrap gap-1'>
      {
        arrSlice1 && arrSlice1.map((chip, i) => {
          return (
            <div key={i}>
              {
                chip.name && (
                  <div onClick={() => handleChecked(chip._id)} data-tooltip-id={`chip-${chip.name}`} className={`${cn(chipVariants({ size, variant, className }))} ${chip.check ? 'bg-neutral-200' : ''}`} {...props}>
                    {chip.check && <span className='mr-1'><CheckMark color='green' /></span>}
                    {chip.name}
                  </div>
                )
              }

              {chip.info &&
                <ReactTooltip
                  id={`chip-${chip.name}`}
                  place="bottom"
                  variant='dark'
                  content={chip.info}
                />}
            </div>
          );
        })
      }
    </div>
  );
};

export default Chips;