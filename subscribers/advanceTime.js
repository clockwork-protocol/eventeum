const {setIntervalAsync} = require('set-interval-async/dynamic');
const testHelper = require("./test-helpers/testHelper");

setIntervalAsync(
    async () => { 
        const daysToAdvance = 1;
        console.log(`Advancing time by ${daysToAdvance} days`);
        const newBlock = await testHelper.advanceTimeAndBlock(testHelper.daysToSeconds(1));
    },
    3000
);