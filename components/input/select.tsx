import { colors } from "@/constants/colors";
import { Text, View, StyleSheet, TouchableOpacity, Modal, FlatList} from "react-native";
import { Controller } from "react-hook-form";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

interface OptionsProps{
    value: string;
    label: string | number;
}

interface SelectProps{
    name: string;
    control: any;
    placeholder?: string;
    error?: string;
    options: OptionsProps[];
}

export function Select({name, control, placeholder, error, options}: SelectProps) {
    const [visible, setVisible] = useState(false);

 return (
   <View style={styles.container}>
        <Controller
            control={control}
            name={name}
            
            render={({ field: {onChange, onBlur, value}}) => (
                <>
                    <TouchableOpacity style={styles.select} onPress={() => setVisible(true)}>
                        <Text>
                            {value ? <Text style={styles.label}> {options.find(option => value === option.value)?.label}</Text> : placeholder}  
                        </Text>
                        <Feather name="arrow-down" size={16} color={colors.black} />
                    </TouchableOpacity>
                    
                    <Modal 
                        visible={visible} 
                        animationType="fade" 
                        transparent={true} 
                        onRequestClose={() => setVisible(false)}>

                        <TouchableOpacity 
                            style={styles.modalContainer} 
                            activeOpacity={1} 
                            onPress={() => setVisible(false)}>
                            <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
                                <FlatList
                                    contentContainerStyle={{gap:4}}
                                    data={options}
                                    keyExtractor={(item) => item.value.toString()}
                                    renderItem={({item}) => (
                                        <TouchableOpacity style={styles.option} 
                                            onPress={() => {
                                                onChange(item.value)
                                                setVisible(false)
                                            }}>
                                            <Text style={styles.label}>{item.label}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>

                    </Modal>
                </>
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
    errorText: {
        color:'red',
        marginTop: 4
    },
    select:{
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 16,
        fontSize: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    modalContainer:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center'
    },
    modalContent:{
        backgroundColor: colors.white,
        marginHorizontal: 10,
        padding: 20,
        borderRadius: 8
    },
    option:{
        paddingVertical: 14,
        paddingHorizontal: 8,	
        borderRadius: 4,
        backgroundColor: "rgba(208, 208, 208, 0.4)",
        marginBottom: 4
    },
    label: {
        fontWeight: 'bold',
        fontSize: 15
    }
})