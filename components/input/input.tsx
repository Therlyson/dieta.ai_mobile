import { colors } from "@/constants/colors";
import { Text, View, StyleSheet, TextInput, Platform, StatusBar, Pressable, KeyboardTypeOptions } from "react-native";
import { Controller } from "react-hook-form";


interface InputProps{
    name: string;
    control: any;
    placeholder?: string;
    rules?: object;
    error?: string;
    keyboardType: KeyboardTypeOptions;
}

export function Input({name, control, placeholder, rules, error, keyboardType}: InputProps) {
 return (
   <View style={styles.container}>
        <Controller
            control={control}
            name={name}
            rules={rules}
            
            render={({ field: {onChange, onBlur, value}}) => (
                <TextInput style={styles.input}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType={keyboardType}
                />
            )}
        />

        {error && <Text style={styles.errorText}>{error}</Text> /*renderiza o erro se existir*/}
   </View>
  );
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    input: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 14,
        fontSize: 16
    },
    errorText: {
        color:'red',
        marginTop: 4
    }
})