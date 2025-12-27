const sku_name_col = "ผู้ค้า/สินค้า";
const sku_category_col = "กลุ่ม";
const sku_id = "รหัส";

function convertToLineMessage() {
  const input = $input.all().map((row) => row.json);
  //.sort((a, b) => a.last_nom.localeCompare(b.last_nom));
  const sortedInput = input.sort((a, b) =>
    a[sku_category_col].localeCompare(b[sku_category_col])
  );

  const list = sortedInput.map((row) => {
    return `\nกลุ่ม: ${row[sku_category_col]} - สินค้า: ${row[sku_name_col]} รหัส: ${row[sku_id]}`;
  });

  let message = `รายการที่ต้องเช็คในวันนี้`;

  list.forEach((row) => {
    message = message.concat(row);
  });

  return [{ json: { output: message } }];
}

return convertToLineMessage();
