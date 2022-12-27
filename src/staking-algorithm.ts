const array = [28, 105, 90, 58];
const array2 = [62, 152, 50, 99];
const array3 = [0, 152, 50, 2];
const array4 = [7.6343, 10, 16];

const delta_stake = 90;
const delta_stake2 = 200;
const delta_stake3 = 5;
const delta_stake4 = 20;

const spreadDelta = (array: any, delta: number) => {
  while (delta > 0) {
    const smallest = Math.min(...array);
    const secondSmallest = Math.min(
      ...array.filter((x: any) => x !== smallest)
    );

    // find how many items have the smallest value
    const smallestCount = array.filter((x: any) => x === smallest).length;

    const difference = secondSmallest - smallest;

    const maxPerItem = Math.floor(delta / smallestCount);

    //   add the difference to all items with the smallest value
    const sorted = array.map((x: any) => {
      if (x === smallest) {
        return x + (difference > maxPerItem ? maxPerItem : difference);
      }
      return x;
    });

    delta -=
      difference > maxPerItem
        ? maxPerItem * smallestCount
        : difference * smallestCount;

    array = sorted;

    console.log("item started");
    console.log(" ");
    console.log("smallestCount", smallestCount);
    console.log("differencePerItem, maxPerItem", difference, maxPerItem);
    console.log("delta", delta);
    console.log("sorted, secondSmallest", sorted, secondSmallest);
    console.log("difference", difference);
    console.log(" ");
    console.log("item ended");
    console.log(" ");
  }
};

console.log(spreadDelta(array4, delta_stake4));
