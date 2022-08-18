import { useWindowDimensions } from "react-native"


function updateWindowSize(){
    const window = useWindowDimensions();
    values.WINDOW_WIDTH = window.width;
    values.WINDOW_HEIGHT = window.height;
}

export default values = {
    update: updateWindowSize,
    WINDOW_WIDTH: 0,
    WINDOW_HEIGHT: 0
}