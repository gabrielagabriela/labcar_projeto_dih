
# Projeto LabCar

Primeiro projeto do modulo 2 do curso DevInHouse

## Documentação da API

#### ENDPOINTS DO MOTORISTA

### Criar Motorista 

URL:

```http
POST  http://localhost:3000/drivers
```

Exemplo de envio como JSON: 

```
{
	"name": "Paula Maria",
	"birthDate": "05/08/2000",
	"cpf":"263.097.640-80",
	"licensePlate": "A124345",
	"vehicleModel": "Sedan"
}

```

### Listar Motorista



URL:
```http
GET http://localhost:3000/drivers
```

Exemplo URL usando as queryParams page, limit e name:

```http
GET http://localhost:3000/drivers?page=0&limit=10&name=p
```


### Detalhar Motorista


URL:
```http
GET http://localhost:3000/drivers/cpf/:cpf
```

### Atualizar Motorista

URL:
```http
PUT http://localhost:3000/drivers/update/:cpf
```

Exemplo de envio como JSON:

```
{
	"name": "Paula Maria Ferreira",
	"birthDate": "05/08/2000",
	"cpf":"263.097.640-80",
	"licensePlate": "A124345",
	"vehicleModel": "Sedan"
}
```

### Bloquear/Desbloquear Motorista


URL:
```http
PATCH http://localhost:3000/drivers/:cpf
```

### Deletar Motorista

URL:
```http
DELETE http://localhost:3000/drivers/delete/:cpf
```


#### ENDPOINTS DO PASSAGEIRO

### Criar Passageiro 

URL:

```http
POST http://localhost:3000/passengers
```

Exemplo de envio como JSON:

```
{
	"name": "Pamela Maria",
	"birthDate": "10/02/2000",
	"cpf": "693.637.120-52",
	"address": {
		"state": "Santa Catarina",
		"city": "Florianópolis",
		"district": "Trindade",
		"street": "Rua longe",
		"number": "168",
		"zipCode": "567787345"
	}
}
```

### Listar Passageiros

URL:

```http
GET http://localhost:3000/passengers
```
Exemplo URL usando as queryParams page, limit e name:

```http
GET http://localhost:3000/passengers?page=0&limit=10&name=p
```

### Detalhar Passageiro

URL:

```http
GET http://localhost:3000/passengers/cpf/:cpf
```

### Atualizar Passageiro 

URL:

```http
PUT http://localhost:3000/passengers/update/:cpf
```

Exemplo de envio como JSON:

```
{
	"name": "Pamela Maria Paula",
	"birthDate": "10/02/2000",
	"cpf": "693.637.120-52",
	"address": {
		"state": "Santa Catarina",
		"city": "Florianópolis",
		"district": "Trindade",
		"street": "Rua longe",
		"number": "168",
		"zipCode": "567787345"
	}
}

```

### Deletar Passageiro

URL:

```http
DELETE http://localhost:3000/passengers/delete/:cpf
```

#### ENDPOINTS DE VIAGENS

### Solicitar Viagem

URL:

```http
POST http://localhost:3000/journeys
```
Exemplo de envio como JSON:

```
{
	"passengerCpfId": "693.637.120-52",
	"startAddress": {
		"state": "Santa Catarina",
		"city": "Florianópolis",
		"district": "Centro",
		"street": "Rua Longe",
		"number": "168",
		"zipCode": "567787345"
	},
	"destinyAddress":{
		"state": "Santa Catarina",
		"city": "Florianópolis",
		"district": "Lagoa",
		"street": "Rua Perto",
		"number": "157",
		"zipCode": "879787345"
	}
}

```

### Viagens Próximas do Motorista

URL:

```http
GET http://localhost:3000/journeys/close
```
** Não é necessário enviar body neste endpoint