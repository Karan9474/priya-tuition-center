import { useState } from "react";
export default function SlideBlock({ data, layout = "text" }) {
  
  
  if (layout === "number") {
    return (
      <div className="flex h-full flex-wrap items-center justify-center gap-3 sm:gap-4">
        {Array.isArray(data) &&
          data.map((num, i) => (
            <div
              key={`${num}-${i}`}
              className="grid h-16 w-16 place-items-center rounded-xl border border-cyan-700/20 bg-cyan-50 text-2xl font-extrabold text-cyan-900 shadow-sm sm:h-20 sm:w-20 sm:text-3xl"
            >
              {num}
            </div>
          ))}
      </div>
    );
  }

if (layout === "expand") {
  const { number, expanded, showAnswer } = data;

  // ==========================
  // 🎯 DYNAMIC SIZE LOGIC
  // ==========================
  const totalParts = expanded.length;

  let fontSizeClass = "";

  if (totalParts <= 2) fontSizeClass = "text-[clamp(3rem,10vw,7rem)]";
  else if (totalParts <= 4) fontSizeClass = "text-[clamp(2.5rem,8vw,6rem)]";
  else if (totalParts <= 6) fontSizeClass = "text-[clamp(2rem,6vw,5rem)]";
  else fontSizeClass = "text-[clamp(1.5rem,5vw,4rem)]";

  return (
    <div className="flex h-full w-full items-center justify-center">
      
      <div
        className={`flex flex-wrap items-center justify-center gap-4 font-bold text-cyan-900 ${fontSizeClass}`}
      >
        
        {/* NUMBER */}
        <span>{number}</span>

        {/* EQUAL */}
        <span>=</span>

        {/* ANSWER */}
        <span className="flex flex-wrap items-center gap-2">
          {showAnswer
            ? expanded.map((val, i) => (
                <span key={i}>
                  {val}
                  {i !== expanded.length - 1 && " + "}
                </span>
              ))
            : "?"}
        </span>

      </div>

    </div>
  );
}
 
  if (layout === "grid") {
    if (!Array.isArray(data)) return null;

    return (
      <div className="h-full overflow-auto p-1">
        <div className="grid h-full grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {data.map((img, i) => (
            <div
              key={`${img}-${i}`}
              className="grid aspect-square place-items-center rounded-xl border border-slate-200 bg-slate-50/80"
            >
              <img src={img} alt="visual" className="h-[78%] w-[78%] object-contain" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (layout === "row") {
    return (
      <div className="flex h-full w-full items-center justify-center overflow-x-auto">
        <div className="flex gap-3 px-2 py-1">
          {Array.isArray(data) &&
            data.map((img, i) => (
              <div
                key={`${img}-${i}`}
                className="grid h-20 w-20 flex-shrink-0 place-items-center rounded-xl border border-slate-200 bg-slate-50 sm:h-24 sm:w-24"
              >
                <img src={img} alt="row item" className="h-[76%] w-[76%] object-contain" />
              </div>
            ))}
        </div>
      </div>
    );
  }

if (layout === "single") {
  return (
    <div className="grid h-full w-full place-items-center p-2">
      <div className="grid h-full w-full place-items-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
        
        {/* DEBUG LOG */}
        {console.log("IMAGE DATA:", data)}

        <img
          src={data}
          alt="single visual"
          className="max-h-[60%] max-w-[60%] object-contain p-4"
          
          onError={(e) => {
            console.log("IMAGE FAILED:", data);

            // fallback image (put this file in public folder)
            e.target.src = "/fallback.png";
          }}
        />

      </div>
    </div>
  );
}




// if (layout === "word-visual") {
//   const [imgError, setImgError] = useState(false);

//   return (
//     <div className="flex h-full w-full">

//       {/* LEFT SIDE → IMAGE (dominates) */}
//       <div className="flex-1 flex items-center justify-center bg-slate-100 overflow-hidden">
        
//         {!imgError && data.image ? (
//           <img
//             src={data.image}
//             alt={data.word}
//             className="max-h-full max-w-full object-contain"
//             onError={() => setImgError(true)}
//           />
//         ) : (
//           <span className="text-[8rem]">
//             {data.emoji || "❓"}
//           </span>
//         )}

//       </div>

//       {/* RIGHT SIDE → CONTENT */}
//       <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-6">
        
//         {/* WORD */}
//         <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-cyan-900">
//           {data.word}
//         </h1>

//         {/* MEANING */}
//         <p className="text-lg text-slate-700 max-w-md">
//           {data.meaning}
//         </p>

//       </div>

//     </div>
//   );
// }


if (layout === "word-visual") {
  return (
    <div className="flex h-full w-full">

      {/* LEFT → IMAGE ONLY */}
      <div className="flex-1 flex items-center justify-center bg-slate-100 overflow-hidden">
        <img
          src={data.image}
          alt={data.word}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* RIGHT → CONTENT */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-6">
        
        <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-cyan-900">
          {data.word}
        </h1>

        <p className="text-lg text-slate-700 max-w-md">
          {data.meaning}
        </p>

      </div>

    </div>
  );
}

  return (
    <div className="grid h-full w-full place-items-center">
      <span className="px-2 text-center text-[clamp(3.2rem,18vw,11rem)] font-black leading-none tracking-tight text-cyan-900">
        {data}
      </span>
    </div>
  );
}
