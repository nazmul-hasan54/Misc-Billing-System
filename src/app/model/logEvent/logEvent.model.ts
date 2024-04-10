export interface LogEventModel {
    id: number | null;
    message: string | null;
    messageTemplate: string | null;
    level: string | null;
    timeStamp: string | null;
    exception: string | null;
    properties: string | null;
    logEvent: string | null;
}