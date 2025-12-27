const state = Object.freeze({
    READY_TO_BE_NOTIFIED: 'Ready to be notified',
    NOTIFIED: 'Notified',
});

function getListOfNotifySkus() {
  const rawData = $input.all();
  const jsonOnlyData = rawData.map((row) => {
    return row.json;
  });
    
  // find the next Cycle after the 'notified' ones
    const lastNotifiedSkusCycle = jsonOnlyData.find((row) => row.Flag === state.NOTIFIED)?.Cycle;
    console.log("lastNotifiedSkusCycle", lastNotifiedSkusCycle)
    const nextNotifyCycle = lastNotifiedSkusCycle + 1;
    const filtered = jsonOnlyData.filter((row) => row.Cycle === nextNotifyCycle && row.Flag === state.READY_TO_BE_NOTIFIED);
    
  return filtered;
}


return getListOfNotifySkus()
