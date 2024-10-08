import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import { colors } from "@/constants/colors";
import { Header } from "@/components/header/header";
import { useForm } from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { ButtonStyle } from "@/components/button/buttonStyle";
import { Select } from "@/components/input/select";
import { useDataStore } from "@/store/data";
import { router } from "expo-router";

const schema = z.object({
    level: z.string().min(1, { message: "Selecione seu level" }),
    objective: z.string().min(1, { message: "O objetivo é obrigatório" }),
    gender: z.string().min(1, { message: "O sexo é obrigatório" }),
})
type FormData = z.infer<typeof schema>

const setPageTwo = useDataStore((state) => state.setPageTwo)

export default function Create(){
    const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const genderOptions = [
        {label: "Masculino", value: "masculino"},
        {label: "Feminino", value: "feminino"}
    ]

    const levelOptions = [
        { label: 'Sedentário (pouco ou nenhuma atividade física)', value: 'Sedentário' },
        { label: 'Levemente ativo (exercícios 1 a 3 vezes na semana)', value: 'Levemente ativo (exercícios 1 a 3 vezes na semana)' },
        { label: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)', value: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)' },
        { label: 'Altamente ativo (exercícios 5 a 7 dia por semana)', value: 'Altamente ativo (exercícios 5 a 7 dia por semana)' },
    ]
    
    const objectiveOptions = [
        { label: 'Emagrecer', value: 'emagrecer' },
        { label: 'Hipertrofia', value: 'Hipertrofia' },
        { label: 'Hipertrofia + Definição', value: 'Hipertrofia e Definição' },
        { label: 'Definição', value: 'Definição' },
    ]

    function handleCreate(data: FormData){
        setPageTwo({
            level: data.level,
            objective: data.objective,
            gender: data.gender
        })
        router.push("/diet")
    }

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

                <Text style={styles.label}>Nível de atividade física:</Text>
                <Select 
                    name="level"
                    control={control}
                    placeholder="Selecione seu nível..."
                    error={errors.level?.message}
                    options={levelOptions}/>

                <Text style={styles.label}>Objetivo:</Text>
                <Select 
                    name="objective"
                    control={control}
                    placeholder="Selecione seu objetivo..."
                    error={errors.objective?.message}
                    options={objectiveOptions}/>

                <ButtonStyle text="Gerar dieta" onPress={handleSubmit(handleCreate)}/> 
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
        marginTop: 14
    },
});