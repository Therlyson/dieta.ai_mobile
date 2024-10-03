import { Text, View, StyleSheet, SafeAreaView, Platform, StatusBar, Pressable } from "react-native";
import { colors } from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

interface HeaderProps{
    step: string,
    title: string
}

export function Header({step, title}: HeaderProps) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.row}>
                    <Pressable onPress={ () => router.back() /*volta uma pagina*/}> 
                        <Feather name="arrow-left" size={24} color={"#000"}/>
                    </Pressable>

                    <Text style={styles.text}>{step} <Feather name="loader" size={16} color={"#000"}/>
                    </Text>
                </View>

                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        marginBottom: 14,
        /*se for android pega a barrinha de cima onde fica notificações e soma com 34 para ficar
        espaçamento ideal, se não apenas soma 34 para IOS*/
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 34 : 34
    },
    content: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 34,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 9
    },
    text: {
        fontSize: 16
    },
    title:{
        fontSize:30,
        fontWeight: 'bold',
        color: colors.background,
        marginTop: 8
    }
});