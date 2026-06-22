// // pages/redirect/components/RedirectForm.jsx

// function RedirectForm() {
//   return (
//     <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
//       {/* Header */}
//       <div className="px-4 py-3 bg-gray-100 border-b">
//         <h2 className="text-sm font-semibold text-gray-700">
//           🔗 Redirection of Page
//         </h2>
//       </div>

//       {/* Form */}
//       <div className="p-6">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* From URL */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               From URL<span className="text-red-500">*</span>
//             </label>

//             <div className="flex">
//               <span className="px-3 py-2 bg-gray-100 border border-r-0 rounded-l-md text-sm text-gray-600">
//                 https://go4customer.com/
//               </span>

//               <input
//                 type="text"
//                 placeholder="From URL"
//                 className="flex-1 border rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           {/* To URL */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               To URL
//             </label>

//             <div className="flex">
//               <select className="border border-r-0 rounded-l-md px-3 py-2 bg-white focus:outline-none">
//                 <option>http://</option>
//                 <option>https://</option>
//               </select>

//               <input
//                 type="text"
//                 placeholder="To URL"
//                 className="flex-1 border rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <p className="mt-2 text-xs text-gray-500">
//               Leave blank if redirection type = 404
//             </p>
//           </div>

//           {/* Redirect Type */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Redirection Type<span className="text-red-500">*</span>
//             </label>

//             <select className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
//               <option>301</option>
//               <option>302</option>
//               <option>404</option>
//               <option>410</option>
//             </select>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="mt-8 flex gap-3">
//           <button className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//             Save
//           </button>

//           <button className="px-5 py-2 border rounded hover:bg-gray-100">
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RedirectForm;

// pages/redirect/components/RedirectForm.jsx

import { useForm } from "react-hook-form";

function RedirectForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fromUrl: "",
      protocol: "https://",
      toUrl: "",
      redirectType: "301",
    },
  });

  const redirectType = watch("redirectType");

  const onSubmit = (data) => {
    const payload = {
      fromUrl: data.fromUrl,
      toUrl:
        data.redirectType === "404"
          ? ""
          : `${data.protocol}${data.toUrl}`,
      redirectType: data.redirectType,
    };

    console.log(payload);
  };

  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-gray-100 border-b">
        <h2 className="text-sm font-semibold text-gray-700">
          🔗 Redirection of Page
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* From URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              From URL<span className="text-red-500">*</span>
            </label>

            <div className="flex">
              <span className="px-3 py-2 bg-gray-100 border border-r-0 rounded-l-md text-sm text-gray-600">
                https://go4customer.com/
              </span>

              <input
                type="text"
                placeholder="From URL"
                className="flex-1 border rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("fromUrl", {
                  required: "From URL is required",
                })}
              />
            </div>

            {errors.fromUrl && (
              <p className="text-red-500 text-xs mt-1">
                {errors.fromUrl.message}
              </p>
            )}
          </div>

          {/* To URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              To URL
            </label>

            <div className="flex">
              <select
                className="border border-r-0 rounded-l-md px-3 py-2 bg-white focus:outline-none"
                {...register("protocol")}
              >
                <option value="http://">http://</option>
                <option value="https://">https://</option>
              </select>

              <input
                type="text"
                placeholder="To URL"
                className="flex-1 border rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("toUrl", {
                  validate: (value) => {
                    if (
                      redirectType !== "404" &&
                      redirectType !== "410" &&
                      !value
                    ) {
                      return "To URL is required";
                    }
                    return true;
                  },
                })}
              />
            </div>

            {errors.toUrl && (
              <p className="text-red-500 text-xs mt-1">
                {errors.toUrl.message}
              </p>
            )}

            <p className="mt-2 text-xs text-gray-500">
              Leave blank if redirection type = 404
            </p>
          </div>

          {/* Redirect Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Redirection Type<span className="text-red-500">*</span>
            </label>

            <select
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("redirectType", {
                required: "Select a redirection type",
              })}
            >
              <option value="301">301</option>
              <option value="302">302</option>
              <option value="404">404</option>
              <option value="410">410</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-3">
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>

          <button
            type="button"
            onClick={() => reset()}
            className="px-5 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default RedirectForm;