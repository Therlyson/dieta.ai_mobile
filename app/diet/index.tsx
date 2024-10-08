import { colors } from "@/constants/colors";
import { Text, View, StyleSheet } from "react-native";
import { useDataStore } from "@/store/data";
import { api } from "@/service/api";
import { useQuery } from "@tanstack/react-query";

export default function Diet(){
    const user = useDataStore((state) => state.user)
    console.log(user)
    return(
        <View style={styles.container}>
            <Text>Diet</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
});