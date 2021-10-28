## Vue Form Bootstrap Validation

A biblioteca foi criada pensando na integracao com o bootstrap, mas ela pode ser utilizada como quiser. A maneira como foi feita, me ajuda muito nos projetos, então abaixo, vou explicar utilizar.


```
yarn add v-validator
ou 
npm install v-validator
```

### Importar as ações @blur, @input, @change
```js
import { validateForm, onActions, Validator } from "v-validator";
export default {
  data: () => ({
    form:{
      email:  new Validator(["required", "email"]),
      password:  new Validator(["required"]),
      cpf:  new Validator(["required", "cpf"]),
    },
  }),
  methods: {
      ...onActions // Aqui vai trazer os métodos onBlur, onInput, onChange e então serão validados na ação do usuário
  }
}
```
### Para chamar as acoes, apenas modifique o seu component

```vue
<b-form-group class="label" label="Email" label-for="input-email">
    <b-form-input
    id="input-email"
    type="text"
    placeholder="Digite o seu email"
    :state="form.email.isValid"
    @blur="onBlur(form.email)"
    @input="onInput(form.email)"
    @change="onChange(form.email)"
    v-model="form.email.value"
    />
    <b-form-invalid-feedback :state="form.email.isValid">
    {{ form.email.messageError }}
    </b-form-invalid-feedback>
</b-form-group>
```
### Validando o formulario

```vue
<template>
    <b-form-group class="label" label="Email" label-for="input-email">
        <b-form-input
        id="input-email"
        type="text"
        placeholder="Digite o seu email"
        :state="form.email.isValid"
        v-model="form.email.value"
        />
        <b-form-invalid-feedback :state="form.email.isValid">
        {{ form.email.messageError }}
        </b-form-invalid-feedback>
    </b-form-group>
</template>
```
```js
import { validateForm, onActions, Validator } from "v-validator";
export default {
  data: () => ({
    form:{
      email:  new Validator(["required", "email"]),
      password:  new Validator(["required"]),
      cpf:  new Validator(["required", "cpf"]),
    },
  }),
  methods: {
      ...onActions // Aqui vai trazer os métodos onBlur, onInput, onChange
      handleSubmit(){
          validateForm(this.form) // ou
          validateForm(this.form, false) // Para apenas validar, sem o alterar o estado dos campos
      }
  }
}
```


<table style="width: 100%;">
	<tr>
		<th colspan="2">
			<h3>Tipos de validacao</h3>
		</th>
	<tr>
	<tr>
		<td style="width: 20%; vertical-align: top;">
            <p>required</p>
            <p>cep</p>
            <p>email</p>
            <p>phone</p>
            <p>cpf</p>
            <p>cnpj</p>
            <p>min</p>
            <p>max</p>
		</td>
		<td style="width: 100%; vertical-align: top;">
            <p>Ex: const field = new Validator(["required"]);</p>
            <p>Ex: const field = new Validator(["cep"]);</p>
            <p>Ex: const field = new Validator(["email"]);</p>
            <p>Ex: const field = new Validator(["phone"]);</p>
            <p>Ex: const field = new Validator(["cpf"]);</p>
            <p>Ex: const field = new Validator(["cnpj"]);</p>
            <p>Ex: const field = new Validator(["min|10"]);</p>
            <p>Ex: const field = new Validator(["max|20"]);</p>
            <p>Ex: const field = new Validator(["validateDateBr"]);</p>
		</td>
    </tr>
</table>
