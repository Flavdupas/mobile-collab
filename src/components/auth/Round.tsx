import { StyleSheet, View } from "react-native"

interface RoundProps {
    size:number,
    color:string,
    left?:number,
    right?:number,
    top?:number,
    bottom?:number,
}

const Round:React.FC<RoundProps> = ({size,color,left,right,top,bottom}) => {

    const styles = StyleSheet.create({
        global: {
            borderRadius:50,
            position:'absolute',
        },
        specific: {
            width:size,
            height:size,
            backgroundColor:color,
            left:left,
            right:right,
            top:top,
            bottom:bottom,
        }
    });

    return (
        <View style={[styles.global,styles.specific]}/>
    )
}

export default Round;