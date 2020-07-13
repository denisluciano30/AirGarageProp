import React, { useRef } from 'react';
import { Alert, Button, View, Text,ScrollView, TouchableOpacity } from 'react-native';
import { Form } from '@unform/mobile';
import Input from '../../../components/Input';
import * as Yup from 'yup';
import getValidationErrors from '../../../utils/getValidationErrors';
import styles from './style2'



export default function AddGaragePage1({navigation}) {
  const formRef = useRef(null);

  async function handleSubmit(data) {
    // console.log(data);rr
    // { email: 'test@example.com', password: '123456' }

    //inicia aqui

    try {
      //basicamente to dizendo que os dados que eu to recebendo para validar estão na forma e um objeto, 
      // e esse objeto está na seguinte forma(shape)
      const schema = Yup.object().shape({
        titulo: Yup.string().required('É obrigatório adicionar um titulo para sua garagem'),
        descricao: Yup.string().required('É obrigatório adicionar uma descrição para sua garagem'),
      })

      await schema.validate(data,{
        // abortEarly: false, //para pegar todos os erros, não só o primeiro
       })



    } catch (error) {

      
      const errors = getValidationErrors(error);

      //como esta setando esse setErros aqui, podemos pegar esse 
      // e exibir ele dentro do input ou alguma outra coisa tipo mudar cor das bordas do formulario
      //formRef.current.setErrors(errors); //para isso aqui funcionar, precisamos que "abortEarly: false"

      

      Alert.alert(
        'Erro ao adicionar garagem',
        error.message
      )
    }

  }
  return (
    <ScrollView style={styles.containerSignUp}>
      <View style={styles.containerTextHeader}>
        <Text style={styles.textHeader}>Informe seus dados para prosseguir no cadastro</Text>
      </View>
      <View >
        <Form
        ref={formRef}
        onSubmit={handleSubmit}
        style={styles.formCadastro}

        >
          <Input name="Comprimento" type="text"  maxLength={49} placeholder="Comprimento"/>
          <Input name="Largura" type="text"  maxLength={49} placeholder="Largura"/>
          <Input name="Altura" type="text"  maxLength={49} placeholder="Altura"/>


          <View style={styles.containerButton}>
            <TouchableOpacity
              title="Sign in"
              style={ styles.btnSubmit}
              onPress={ () => {
                formRef.current.submitForm();
              } }
            >
              <Text style={styles.submitText}>Avançar</Text>
            </TouchableOpacity>
          </View>
        </Form>
      </View>
    </ScrollView>
  );
}
