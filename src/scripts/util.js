function Util(){};

// Util.prototype.movingAverage = function(consolidateDdata, numberOfPricePoints){
//    return consolidateDdata.map((row, index, total) => {
//     const start = Math.max(0, index - numberOfPricePoints);
//     const end = index; 
//     const subset = total.slice(start, end + 1);

//     const sum = subset.reduce((a, b) => {
//       return a + b.closingPrice;
//     }, 0);

//     return {
//       date: row.date,
//       average: sum / subset.length
//     };
//   });
// };

// Util.prototype.convertUnixTime = function(unixTime){
//     return new Date(unixTime * 1000)
// }





export default Util
