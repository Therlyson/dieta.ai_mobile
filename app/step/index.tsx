import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { colors } from "@/constants/colors";
import { Header } from "@/components/header/header";

export default function Step() {
    return (
        <View>
            <Header step="Passo 1" title="Vamos começar"/>
        </View>
    );
}