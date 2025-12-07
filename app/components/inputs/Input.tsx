// 'use client';

// import { 
//   FieldErrors, 
//   FieldValues, 
//   UseFormRegister 
// } from "react-hook-form";
// // import { BiDollar } from "react-icons/bi";

// interface InputProps {
//   id: string;
//   label: string;
//   type?: string;
//   disabled?: boolean;
//   formatPrice?: boolean;
//   required?: boolean;
//   register: UseFormRegister<FieldValues>,
//   errors: FieldErrors
// }

// const Input: React.FC<InputProps> = ({
//   id,
//   label,
//   type = "text", 
//   disabled, 
//   formatPrice,
//   register,
//   required,
//   errors,
// }) => {
//   return (
//     <div className="relative w-full">
//       {formatPrice && (
//         // <BiDollar
//         //   size={24}  
//         //   className="absolute // text-neutral-700 top-5 left-2"
//         // />
//         <span
//           className="absolute left-0 font-semibold text-neutral-700 top-5 "
//         >
//           NPR
//         </span>
//       )}
//       <input
//         id={id}
//         disabled={disabled}
//         {...register(id, { required })}
//         placeholder=" " //it should be empty space for nice animation wow learining new things
//         type={type}
//         className={`
//           peer
//           w-full
//           p-4
//           pt-6 
//           font-light 
//           bg-white 
//           border-2
//           rounded-md
//           outline-none
//           transition
//           disabled:opacity-70
//           disabled:cursor-not-allowed
//           ${formatPrice ? 'pl-9' : 'pl-4'}
//           ${errors[id] ? 'border-yellow-500' : 'border-neutral-300'}
//           ${errors[id] ? 'focus:border-yellow-500' : 'focus:border-black'}
//         `}
//       />
      
//       <label 
//         className={`
//           absolute 
//           text-md
//           duration-150 
//           transform 
//           -translate-y-3 
//           top-5 
//           z-10 
//           origin-[0] 
//           ${formatPrice ? 'left-9' : 'left-4'}
//           peer-placeholder-shown:scale-100 
//           peer-placeholder-shown:translate-y-0 
//           peer-focus:scale-75
//           peer-focus:-translate-y-4
//           ${errors[id] ? 'text-yellow-500' : 'text-zinc-400'}
//         `}
//       >
//         {label}
//       </label>
//     </div>
//    );
// }
 
// export default Input;

'use client';

import { 
  FieldErrors, 
  FieldValues, 
  UseFormRegister 
} from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors,
  validation?: object // Add this prop for custom validation rules
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text", 
  disabled, 
  formatPrice,
  register,
  required,
  errors,
  validation // New validation prop
}) => {
  return (
    <div className="relative w-full">
      {formatPrice && (
        <span className="absolute left-0 font-semibold text-neutral-700 top-5 ">
          NPR
        </span>
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required, ...validation })} // Apply validation rules here
        placeholder=" " 
        type={type}
        className={`
          peer
          w-full
          p-4
          pt-6 
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-yellow-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-yellow-500' : 'focus:border-black'}
        `}
      />
      
      <label 
        className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-3 
          top-5 
          z-10 
          origin-[0] 
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-yellow-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>

      {/* Display error message if any */}
      {errors[id] && (
        <span className="text-sm text-red-600">
          {errors[id]?.message as string}
        </span>
      )}
    </div>
  );
}

export default Input;
