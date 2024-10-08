import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import { colors } from "@/constants/colors";
import { Header } from "@/components/header/header";
import { useForm } from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { ButtonStyle } from "@/components/button/buttonStyle";
import { Select } from "@/components/input/select";

const schema = z.object({
    level: z.string().min(1, { message: "Selecione seu level" }),
    objective: z.string().min(1, { message: "O objetivo é obrigatório" }),
    gender: z.string().min(1, { message: "O sexo é obrigatório" }),
})
type FormData = z.infer<typeof schema>

const genderOptions = [
    {label: "Masculino", value: "masculino"},
    {label: "Feminino", value: "feminino"}
]

export default function Create(){
    const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    return(
        <View style={styles.container}>
             <Header step="Passo 2" title="Finalizando dieta"/>

             <ScrollView style={styles.content}>
                <Text style={styles.label}>Sexo:</Text>
                <Select 
                    name="gender"
                    control={control}
                    placeholder="Selecione seu sexo..."
                    error={errors.gender?.message}
                    options={genderOptions}/>
             </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    content:{
        paddingLeft: 24,
        paddingRight: 16
    },
    label:{
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold',
        marginBottom:7,
        marginTop: 8
    },
});