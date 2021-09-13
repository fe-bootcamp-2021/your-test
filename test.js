// // function median(values) {
// //   if (values.length === 0) return 0;

// //   values.sort((a, b) => {
// //     return a - b;
// //   });

// //   const half = Math.floor(values.length / 2);

// //   if (values.length % 2) return values[half];

// //   return (values[half - 1] + values[half]) / 2.0;
// // }

// // console.log(median([1, 8, 3, 8, 4, 4, 5]));

// // const arr = [1, 8, 3, 8, 4, 4, 5];

// // arr.sort((a, b) => a - b);

// // console.log(arr);

// function mean(arr) {
//   const reducedArr = arr.reduce((a, b) => a + b);
//   return reducedArr / arr.length;
// }

// const arr1 = [
//   [7, 8, 5, 1, 5],
//   [6, 10, 20, 1],
//   [75, 80, 16, 20],
//   [7, 8, 1, 5, 5],
// ];

// function calculation(arr) {
//   const allMean = arr.map((val, index) => {
//     return mean(val);
//   });

//   let result;
//   //   console.log(allMean);
//   allMean.forEach((v, i) => {
//     const arrResult = allMean.filter((a) => {
//       if (a === v) {
//         return true;
//       }
//       return false;
//     });
//     console.log(arrResult);
//   });

//   return result;
// }
// console.log(calculation(arr1));
