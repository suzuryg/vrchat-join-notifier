/**
 * app が外部から受け取るパラメータ
 */
 export interface AppParameterObject {
    interval?: string;
    specificNames?: string[];
    specificExec?: string;
    isToast?: boolean;
    isXSOverlay?: boolean;
    xsoverlayVolume?: string;
    xsoverlayOpacity?: string;
    xsoverlayTimeout?: string;
}

/**
 * app 内部の設定管理
 */
export interface AppConfig {
    interval: string;
    specificNames: string[];
    specificExec: string;
    isToast: boolean;
    isXSOverlay: boolean;
    xsoverlayVolume: string;
    xsoverlayOpacity: string;
    xsoverlayTimeout: string;
}
