import dayjs from "dayjs"

export const getCurrentTimestamp = (): number => {
  return dayjs().valueOf();
}

export const formatDate = (date: Date, format: string = "YYYY-MM-DD"): string => {
  return dayjs(date).format(format);
}

export const transformTimestampToDate = (timestamp: number): Date => {
  return dayjs(timestamp).toDate();
}