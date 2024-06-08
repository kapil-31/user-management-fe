export interface DataType {
  key: string;
  name: string;
  email: number;
  createdAt: string;
}
export const tableDataSourceMapper = (arr: any[], mapKeys: string[]) => {
  return arr.map((item) => {
    let obj = {} as any;
    mapKeys.forEach((key) => {
      if (key == "_id") {
        obj["key"] = item[key];
      } else {
        obj[key] = item[key];
      }
    });
    return obj as DataType;
  });
};

export const parseDateToReadable = (date: string | Date) => {
  const timestamp = new Date(date);
  const formattedDate = timestamp.toLocaleString("en-US", {
    weekday: "long", // "Saturday"
    year: "numeric", // "2024"
    month: "long", // "June"
    day: "numeric", // "8"
    hour: "numeric", // "1"
    minute: "numeric", // "51"
    second: "numeric", // "28"
    hour12: true, // "1:51:28 PM"
    timeZoneName: "short", // "GMT"
  });
  return formattedDate.replace(/ GMT[^\s]*/, "");
};
