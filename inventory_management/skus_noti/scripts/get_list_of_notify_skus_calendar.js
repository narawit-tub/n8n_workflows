// 1. Get current date data (Important: n8n should reference Timezone Asia/Bangkok in Workflow Settings)
const now = new Date();
const todayDate = now.getDate(); // Get day of month 1-31
const todayDayIndex = now.getDay(); // Get day index 0 (Sunday) to 6 (Saturday)

// Create helper to convert Thai day names to numbers for comparison with todayDayIndex
const dayMapping = {
  อาทิตย์: 0,
  จันทร์: 1,
  อังคาร: 2,
  พุธ: 3,
  พฤหัส: 4, // or พฤหัสบดี depending on actual data
  พฤหัสบดี: 4,
  ศุกร์: 5,
  เสาร์: 6,
};

function getListOfNotifySkus() {
  const rawData = $input.all();

  // Filter data to only rows that need to be notified today
  const filtered = rawData.filter((item) => {
    const row = item.json;
    const schedule = row["รอบการเช็ค"]
      ? row["รอบการเช็ค"].toString().trim()
      : "";

    // Case 1: No check needed
    if (!schedule || schedule === "ไม่ต้องเช็ค") {
      return false;
    }

    // Case 2: Specified as day of week (e.g., "every Monday", "every Saturday")
    // Check if any day name exists in the message
    for (const [dayName, dayIndex] of Object.entries(dayMapping)) {
      if (schedule.includes(dayName)) {
        return dayIndex === todayDayIndex;
      }
    }

    // Case 3: Specified as date of month (e.g., "20" or "1, 15")
    // Split by comma (,) in case there are multiple dates
    const datesToCheck = schedule.split(",").map((d) => parseInt(d.trim()));
    if (datesToCheck.includes(todayDate)) {
      return true;
    }

    return false;
  });

  // Return only the JSON of rows that passed the condition
  return filtered.map((item) => item.json);
}

return getListOfNotifySkus();
