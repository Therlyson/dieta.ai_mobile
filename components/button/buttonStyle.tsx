import { Text, Pressable, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

interface ButtonProps {
    text: string;
    onPress?: () => void;
}

export function ButtonStyle({ text, onPress }: ButtonProps) {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: colors.blue,
      height: 45,
      borderRadius: 8,
      width: '100%',	
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30
    },
  
    buttonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: 'bold'
    }
});	