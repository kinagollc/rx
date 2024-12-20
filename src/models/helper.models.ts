import { Constants } from './constants.models';
import moment from 'moment';

export class Helper {

    static getLocale(): string {
        let sl = window.localStorage.getItem(Constants.KEY_LOCALE);
        return sl && sl.length ? sl : "en";
    }

    static formatTimestampDateTime(timestamp: string, locale: string): string {
        return moment(timestamp).locale(locale).format("DD MMM, HH:mm");
    }

    static formatTimestampDate(timestamp: string, locale: string): string {
        return moment(timestamp).locale(locale).format("DD MMM YYYY");
    }

    //

    static getChatChild(userId: string, myId: string) {
        //example: userId="9" and myId="5" -->> chat child = "5-9"
        let values = [userId, myId];
        values.sort((one, two) => (one > two ? -1 : 1));
        return values[0] + "-" + values[1];
    }

    static formatMillisDateTime(millis: number, locale: string): string {
        //return moment(millis).locale(locale).format("ddd, MMM D, h:mm");
        return moment(millis).locale(locale).format("DD MMM, HH:mm");
    }

    // static formatTimestampDateTime(timestamp: string, locale: string): string {
    //     return moment(timestamp).locale(locale).format("ddd, MMM D, h:mm");
    // }

    static formatMillisDate(millis: number, locale: string): string {
        return moment(millis).locale(locale).format("DD MMM YYYY");
    }

    // static formatTimestampDate(timestamp: string, locale: string): string {
    //     return moment(timestamp).locale(locale).format("DD MMM YYYY");
    // }

    static formatMillisTime(millis: number, locale: string): string {
        return moment(millis).locale(locale).format("HH:mm");
    }

    static formatTimestampTime(timestamp: string, locale: string): string {
        return moment(timestamp).locale(locale).format("HH:mm");
    }

    static getSetting(key: string): string {
        let toReturn = null;
        let settings = JSON.parse(window.localStorage.getItem(Constants.SETTINGS));
        if (settings && settings[key])
            return settings[key];
        else
            return toReturn;
    }
}