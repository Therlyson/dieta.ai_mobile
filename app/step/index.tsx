import { Text, View, Image, StyleSheet, Pressable, ScrollView } from "react-native";
import { colors } from "@/constants/colors";
import { Header } from "@/components/header/header";
import { Input } from "@/components/input/input";
import { useForm } from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { ButtonStyle } from "@/components/button/buttonStyle";
import {Link, router} from "expo-router";
import { useDataStore } from "@/store/data";

const schema = z.object({
    name: z.string().min(1, { message: "O nome é obrigatório" }),
    weight: z.string().min(1, { message: "O peso é obrigatório" }),
    age: z.string().min(1, { message: "A idade é obrigatória" }),
    height: z.string().min(1, { message: "A altura é obrigatória" })
    /*
    weight: z.preprocess((val) => Number(val), z.number().min(1, { message: "O peso é obrigatório" })),
    age: z.preprocess((val) => Number(val), z.number().min(1, { message: "A idade é obrigatória" })),
    height: z.preprocess((val) => Number(val), z.number().min(1, { message: "A altura é obrigatória" }))*/
})
type FormData = z.infer<typeof schema>

const setPageOne = useDataStore((state) => state.setPageOne)

export default function Step() {
    const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    function handleCreate(data: FormData){
        setPageOne({
            name: data.name,
            weight: data.weight,
            age: data.age,
            height: data.height
        })
        
        router.push("/create")
    }

    return (
        <View style={styles.container}>
            <Header step="Passo 1" title="Vamos começar"/>

            <ScrollView style={styles.content}>
                <Text style={styles.label}>Nome:</Text>
                <Input 
                    name="name"
                    control={control}
                    placeholder="Nome completo"
                    error={errors.name?.message}
                    keyboardType="default"/>

                <Text style={styles.label}>Seu peso atual:</Text>
                <Input 
                    name="weight"
                    control={control}
                    placeholder="Ex: 70.5"
                    error={errors.weight?.message}
                    keyboardType="numeric"/>

                <Text style={styles.label}>Altura:</Text>
                <Input 
                    name="height"
                    control={control}
                    placeholder="Ex: 1.70"
                    error={errors.height?.message}
                    keyboardType="numeric"/>

                <Text style={styles.label}>Idade:</Text>
                <Input 
                    name="age"
                    control={control}
                    placeholder="Ex: 25"
                    error={errors.age?.message}
                    keyboardType="numeric"/>

                <ButtonStyle text="Avançar" onPress={handleSubmit(handleCreate)}/> 
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