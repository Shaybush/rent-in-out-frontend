import { cva } from 'class-variance-authority';
import React, { useState } from 'react';
import { Tooltip as ReactTooltip } from "react-tooltip";
import { cn } from '../../../util/functions';
import CheckMark from '../../../assets/icons/checkMark';

const chipVariants = cva(
  'text-xs rounded-full cursor-pointer transition duration-300 flex items-center',
  {
    variants: {
      variant: {
        default: 'bg-blue-500 border border-blue-700 text-white hover:bg-blue-700',
        unFill: `bg-neutral-100 hover:bg-neutral-200`,
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
        chipsProp && chipsProp.map((chip, i) => {
          return (
            <div key={i}>
              {
                chip.name && (
                  <div onClick={() => handleChecked(chip._id)} data-tooltip-id={`chip-${chip.name}`} className={cn(chipVariants({ size, variant, className }))} {...props}>
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