import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { colors } from "@/constants/colors";

export default function Index() {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/logo.png')}
      />

      <Text style={styles.title}>Dieta
        <Text style={{color: colors.white}}>.IA</Text>
      </Text>

      <Text style={styles.description}>Sua dieta personalizada com inteligência artificial 🍴 </Text>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Gerar dieta</Text> 
      </Pressable>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1, //expande a tela inteira
    justifyContent: 'center', //centro vertical
    alignItems: 'center', //centro horizontal
    paddingLeft: 16,
    paddingRight: 16,
  },

  title:{
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.green,
  },

  description: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
    width: 290,
  },

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
