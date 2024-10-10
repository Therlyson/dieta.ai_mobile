import { colors } from "@/constants/colors";
import { Text, View, StyleSheet,Pressable,Platform, StatusBar, SafeAreaView, ScrollView,
     Share,ActivityIndicator } from "react-native";
import { useDataStore } from "@/store/data";
import { api } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import { Data } from "@/types/data";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface ResponseData{
    data: Data;
}

export default function Diet(){
    const user = useDataStore((state) => state.user) 

    const {data, isFetching, error} = useQuery({
        queryKey: ["nutrition"],
        queryFn: async () => {
            try{
                if(!user){
                    throw new Error("Filed load nutrition")
                }

                //const response = await api.get<ResponseData>("/teste")

                const response = await api.post<ResponseData>("/create", {
                     name: user.name,
                     weight: user.weight,
                     height: user.height,
                     age: user.age,
                     level: user.level,
                     objective: user.objective,
                     gender: user.gender
                })

                return response.data.data
            }catch(error){
                console.log(error)
                throw new Error("Failed to fetch nutrition data");
            }
        }
    })

    async function handleShare(){
        try{
            if(data && Object.keys(data).length === 0)return;

            const supplements = data?.suplementos.map(item => `- ${item}`).join('\n');

            const foods = data?.refeicoes.map(item => 
            `Nome: ${item.nome}\nHorário: ${item.horario}\nAlimentos:\n${item.alimentos.map(alimento => `  - ${alimento}`).join('\n')}`
            ).join('\n\n');

            const message = `Dieta: ${data?.nome}\nObjetivo: ${data?.objetivo}\n\nRefeições:\n\n${foods}\n\nSuplementos:\n${supplements}`;
      
            await Share.share({
                message: message
            })
        }catch(error){
            console.log(error)
            alert("Falha ao compartilhar dieta")
        }
    }

    if (isFetching) {
        return (
            <View style={styles.loading}>
                <Text style={styles.loadingText}>Estamos gerando sua dieta</Text>
                <Text style={styles.loadingText}>Consultando IA...</Text>
                <ActivityIndicator size="large" color={colors.white} />
            </View>
        );
    }

    if(error){
        return(
            <View style={styles.loading}>
                <Text style={styles.loadingText}>Falha ao gerar dieta</Text>
                <Link href={"/"}>
                    <Text style={styles.loadingText}>Tente novamente</Text>
                </Link>
            </View>
        )
    }

    
    return(
        <View style={styles.container}>
            <SafeAreaView style={styles.containerHeader}>
                <View style={styles.contentHeader}>
                    <Text style={styles.title}>Minha dieta</Text>

                    <Pressable style={styles.buttonShare} onPress={handleShare}>
                        <Text style={styles.buttonShareText}>Compartilhar</Text>
                        <Ionicons name="share-social-outline" size={16} color="#FFF"/>
                    </Pressable>
                </View>
            </SafeAreaView>

            <View style={{paddingLeft:16, paddingRight:16, flex:1}}>
                {data && Object.keys(data).length > 0 && (
                    <>
                        <Text style={styles.name}>{data.nome}</Text>
                        <Text style={styles.objective}><Text style={{fontWeight:"bold"}}>Foco:</Text> {data.objetivo}</Text>
                        <Text style={styles.label}>Refeições</Text>

                        <ScrollView style={{flex:1}}>
                            <View style={styles.foods}>
                                {data.refeicoes.map((refeicao) => (
                                    <View key={refeicao.nome} style={styles.food}>
                                        <View style={styles.foodHeader}>
                                            <Text style={{fontWeight:'bold', fontSize:16}}>{refeicao.nome}</Text>
                                            <Ionicons name="restaurant" size={16} color="#000"/>
                                        </View>

                                        <View style={styles.foodContent}>
                                            <Ionicons name="time-outline" size={16} color="#000"/>
                                            <Text>Horário: {refeicao.horario}</Text>
                                        </View>

                                        <Text style={styles.foodText}>Alimentos</Text>
                                        {refeicao.alimentos.map((alimento) => (
                                            <Text key={alimento}>{alimento}</Text>
                                        ))}
                                    </View>
                                ))}
                            </View>

                            <View style={styles.suplements}>
                                <Text style={{fontWeight:'bold', fontSize:16, marginBottom:4}}>Dica de suplementos:</Text>
                                {data.suplementos.map((suplemento) => (
                                    <Text key={suplemento}>{suplemento}</Text>
                                ))}
                            </View>

                            <Pressable style={styles.buttonDiet} onPress={() => router.replace("/")}>
                                <Text style={styles.buttonDietText}>Gerar nova dieta</Text>
                            </Pressable>
                        </ScrollView>
                    </>
                )}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    loading: {
        flex: 1,
        backgroundColor: colors.background, 
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        position: 'relative',
    },
    loadingText: {
        fontSize: 18,
        color: colors.white, 
        marginBottom: 20, 
        textAlign: 'center',
        fontWeight: '600',
        letterSpacing: 0.8,
        textTransform: 'none',
        opacity: 0.8,
    },
    containerHeader: {
        backgroundColor: colors.white,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        marginBottom: 14,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 34 : 34
    },
    contentHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 18,
        paddingRight: 16,
        alignItems: 'center',
        paddingBottom: 30
    },
    title:{
        fontSize:30,
        fontWeight: 'bold',
        color: colors.background,
        marginTop: 8
    },
    buttonShare:{
        backgroundColor: colors.blue,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 7,
        marginTop: 6,
        borderRadius: 6,
        gap: 6
    },
    buttonShareText:{
        color: colors.white,
        fontSize: 15,
        fontWeight: '500'
    },
    
    name:{
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.white,
        marginTop: 10
    },
    objective:{
        fontSize: 18,
        color: colors.white,
        marginTop: 4,
        marginBottom: 24
    },
    label:{
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
    foods:{
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: 16,
        marginTop: 10,
        marginLeft: 4,
        marginRight: 4,
        gap: 8
    },
    food:{
        backgroundColor: 'rgba(208,208,208,0.4)',
        padding: 8,
        borderRadius: 4	
    },
    foodHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    foodContent:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        gap: 6
    },
    foodText:{
        fontSize: 16,
        marginTop: 15,
        marginBottom: 8
    },
    suplements: {
        marginTop: 12,
        backgroundColor: 'rgba(211, 211, 211, 1)', 
        marginBottom: 14,
        padding: 14,
        borderRadius: 8,
        borderWidth: 2, 
        borderColor: colors.blue, 
    },
    buttonDiet: {
        paddingVertical: 12, 
        backgroundColor: colors.blue,
        borderRadius: 8, 
        alignItems: 'center',
        justifyContent: 'center', 
        marginTop: 10, 
        marginBottom: 16,
    },
    buttonDietText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold', 
        textTransform: 'uppercase'
    }
});