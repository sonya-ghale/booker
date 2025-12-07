'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { TbMountain, TbPool } from 'react-icons/tb';
import { GiBoatFishing, GiCaveEntrance, GiForest, GiForestCamp, GiWaterMill  } from 'react-icons/gi';
import { MdOutlineDirectionsBoat, MdOutlineGamepad, MdOutlineVilla } from 'react-icons/md'; 
import CategoryBox from "../CategoryBox";

import Container from '../Container';


export const categories = [
  {
    label: 'Nature',
    icon: GiForest,
    description: 'This property is close to the Nature!',
  },
  {
    label: 'Watermills',
    icon: GiWaterMill,
    description: 'This property is has watermills!',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property is modern but i am not i am raciest!'
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is in the countryside!'
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'This is property has a beautiful pool!'
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is near a lake!'
  },
  {
    label: 'Rafting',
    icon: MdOutlineDirectionsBoat,
    description: 'This room head gives rafting activies!'
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'Here you can camp according to your desire!'
  },
  {
    label: 'Caves',
    icon: GiCaveEntrance,
    description: 'This property is in a spooky cave!'
  },
  {
    label: 'Gaming',
    icon: MdOutlineGamepad,
    description: 'This property is has online Gaming',
  },  
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}
 
export default Categories;