// import { useEffect, useState } from "react";
// import type { AxiosPromise } from "axios";

// interface MovieResult {
//   backdrop_path: string;
//   id: number;
//   original_title: string;
//   overview: string;
//   poster_path: string;
// }

// interface MovieRowProps {
//   title: string;
//   fetchFn: () => AxiosPromise<{ results: MovieResult[] }>;
// }

// const MovieRow = ({ title, fetchFn }: MovieRowProps) => {
//   const [movies, setMovies] = useState<MovieResult[]>([]);

//   useEffect(() => {
//     fetchFn().then((res) => setMovies(res.data.results));
//   }, [movies, setMovies, fetchFn]);

//   return (
//     <div className="mb-8">
//       <h2 className="text-xl font-bold px-4 mb-2">{title}</h2>
//       <div className="flex gap-4 overflow-x-auto p-4 w-full scroll-hidden">
//         {movies.map((item, index) => (
//           <div
//             key={index}
//             className="min-w-[240px] max-w-[240px] bg-base-100 shadow-xl rounded-2xl flex flex-col overflow-hidden"
//           >
//             <figure className="w-full h-[360px]">
//               <img
//                 src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
//                 alt={item.original_title}
//                 className="w-full h-full object-cover"
//               />
//             </figure>
//             <div className="p-4 flex flex-col justify-between flex-1">
//               <h2 className="font-bold text-md mb-1 line-clamp-2">
//                 {item.original_title}
//               </h2>
//               <p className="text-sm text-gray-600 line-clamp-3">
//                 {item.overview}
//               </p>
//               <div className="mt-3">
//                 <button className="btn btn-primary btn-sm w-full">
//                   Buy Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MovieRow;
