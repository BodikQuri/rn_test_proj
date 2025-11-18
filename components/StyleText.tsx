import { COLORS } from "@/consts/ui"
import { StyleSheet, Text, TextProps } from "react-native"

type StyleTextProps = TextProps

export const StyledText : React.FC<StyleTextProps> = ({style, ...props}) => {
    return <Text style={[styles.base, style]} {...props}/>
}

const styles = StyleSheet.create({
    base: {
        color: COLORS.text,
    }
})