import { message } from "antd";

export const notifySuccess = (t: string) => message.success(t);
export const notifyError = (t: string) => message.error(t);
export const notifyInfo = (t: string) => message.info(t);