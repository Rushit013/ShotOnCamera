import {
    SELECTED_LOGO, SHOTON_TAG, SHOTON_DEVICE, SHOTBY, AD_FONT_STYLE, STAMP_POSITION, AD_FONT_COLOR, AD_FONT_SIZE,
    DATE_FONT_TYPE, DATE_FONT_STYLE, DATE_FONT_SIZE, DATE_FONT_COLOR, MARKED_TEXT, IS_LOGO_TOGGLE, FONT_POSITION
} from "../constants/constants";
import { REHYDRATE } from "redux-persist";
import { getBrand } from 'react-native-device-info';

const device_brand = getBrand();
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const initialState = {
    downloadHistory: [
        // {
        //     fileName: "SocialDownloader_01.mp4",
        //     type: "Facebook",
        //     filePath: "Download/SocialDownloader_01.mp4"
        // } 
    ],
    logoHistory: {
        id: 0,
        name: 'mi_a1',
        img: require('../../assets/image/Logo/mi_a1.png')
    },
    shotTagHistory: 'NONE',
    deviceNameHistory: 'DEVICE NAME',
    shotByHistory: { shotbyTag: 'NONE', yourName: 'YOUR NAME' },
    advancedFontstyleHistory: { id: '', title: '' },
    stampPositionHistory: { id: 3, title: 'Bottom Right' },
    advancedFontColorHistory: '#000',
    advancedFontSizeHistory: 7,
    dateFontTypeHistory: { id: '', type: '' },
    dateFontstyleHistory: { id: '', title: '' },
    dateFontSizeHistory: 12,
    dateFontColorHistory: '#000',
    markedTextHistory: capitalizeFirstLetter(device_brand),
    isLogoToggleHistory: true,
    fontPositionHistory: { id: 3, title: 'Bottom Right' },
}

export default function statusReducer(state = { }, action) {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case REHYDRATE: {
            return newState;
        }
        case SELECTED_LOGO: {
            if (newState.logoHistory)
                newState.logoHistory = action.payload;
            else {
                // newState.logoHistory = {};
                newState.logoHistory = action.payload;
            }
            return newState;
        }
        case SHOTON_TAG: {
            if (newState.shotTagHistory)
                newState.shotTagHistory = action.payload;
            else {
                newState.shotTagHistory = initialState.shotTagHistory;
                newState.shotTagHistory = action.payload;
            }
            return newState;
            // newState.shotTagHistory = action.payload;
        }
        case SHOTON_DEVICE: {
            if (newState.deviceNameHistory)
                newState.deviceNameHistory = action.payload;
            else {
                newState.deviceNameHistory = initialState.deviceNameHistory;
                newState.deviceNameHistory = action.payload;
            }
            return newState;
            // newState.deviceNameHistory = action.payload;
        }
        case SHOTBY: {
            if (newState.shotByHistory)
                newState.shotByHistory = action.payload;
            else {
                newState.shotByHistory = initialState.shotByHistory;
                newState.shotByHistory = action.payload;
            }
            return newState;
            // newState.shotByHistory = action.payload;
        }
        case AD_FONT_STYLE: {
            if (newState.advancedFontstyleHistory)
                newState.advancedFontstyleHistory = action.payload;
            else {
                newState.advancedFontstyleHistory = initialState.advancedFontstyleHistory;
                newState.advancedFontstyleHistory = action.payload;
            }
            return newState;
            // newState.advancedFontstyleHistory = action.payload;
        }
        case STAMP_POSITION: {
            if (newState.stampPositionHistory)
                newState.stampPositionHistory = action.payload;
            else {
                newState.stampPositionHistory = initialState.stampPositionHistory;
                newState.stampPositionHistory = action.payload;
            }
            return newState;
            // newState.stampPositionHistory = action.payload;
        }
        case AD_FONT_COLOR: {
            if (newState.advancedFontColorHistory)
                newState.advancedFontColorHistory = action.payload;
            else {
                newState.advancedFontColorHistory = initialState.advancedFontColorHistory;
                newState.advancedFontColorHistory = action.payload;
            }
            return newState;
            // newState.advancedFontColorHistory = action.payload;
        }
        case AD_FONT_SIZE: {
            if (newState.advancedFontSizeHistory)
                newState.advancedFontSizeHistory = action.payload;
            else {
                newState.advancedFontSizeHistory = initialState.advancedFontSizeHistory;
                newState.advancedFontSizeHistory = action.payload;
            }
            return newState;
            // newState.advancedFontSizeHistory = action.payload;
        }
        case DATE_FONT_TYPE: {
            if (newState.dateFontTypeHistory)
                newState.dateFontTypeHistory = action.payload;
            else {
                newState.dateFontTypeHistory = initialState.dateFontTypeHistory;
                newState.dateFontTypeHistory = action.payload;
            }
            return newState;
            // newState.dateFontTypeHistory = action.payload;
        }
        case DATE_FONT_STYLE: {
            if (newState.dateFontstyleHistory)
                newState.dateFontstyleHistory = action.payload;
            else {
                newState.dateFontstyleHistory = initialState.dateFontstyleHistory;
                newState.dateFontstyleHistory = action.payload;
            }
            return newState;
            // newState.dateFontstyleHistory = action.payload;
        }
        case DATE_FONT_SIZE: {
            if (newState.dateFontSizeHistory)
                newState.dateFontSizeHistory = action.payload;
            else {
                newState.dateFontSizeHistory = initialState.dateFontSizeHistory;
                newState.dateFontSizeHistory = action.payload;
            }
            return newState;
            // newState.dateFontSizeHistory = action.payload;
        }
        case DATE_FONT_COLOR: {
            if (newState.dateFontColorHistory)
                newState.dateFontColorHistory = action.payload;
            else {
                newState.dateFontColorHistory = initialState.dateFontColorHistory;
                newState.dateFontColorHistory = action.payload;
            }
            return newState;
            // newState.dateFontColorHistory = action.payload;
        }
        case MARKED_TEXT: {
            if (newState.markedTextHistory)
                newState.markedTextHistory = action.payload;
            else {
                newState.markedTextHistory = initialState.markedTextHistory;
                newState.markedTextHistory = action.payload;
            }
            return newState;
            // newState.dateFontColorHistory = action.payload;
        }
        case MARKED_TEXT: {
            if (newState.markedTextHistory)
                newState.markedTextHistory = action.payload;
            else {
                newState.markedTextHistory = initialState.markedTextHistory;
                newState.markedTextHistory = action.payload;
            }
            return newState;
            // newState.dateFontColorHistory = action.payload;
        }
        case IS_LOGO_TOGGLE: {
            if (newState.isLogoToggleHistory)
                newState.isLogoToggleHistory = action.payload;
            else {
                newState.isLogoToggleHistory = initialState.isLogoToggleHistory;
                newState.isLogoToggleHistory = action.payload;
            }
            return newState;
            // newState.dateFontColorHistory = action.payload;
        }
        case FONT_POSITION: {
            if (newState.fontPositionHistory)
                newState.fontPositionHistory = action.payload;
            else {
                newState.fontPositionHistory = initialState.fontPositionHistory;
                newState.fontPositionHistory = action.payload;
            }
            return newState;
            // newState.stampPositionHistory = action.payload;
        }
        default: return newState;
    }
}